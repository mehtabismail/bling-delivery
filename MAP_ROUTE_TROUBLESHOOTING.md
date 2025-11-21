# Map Route Troubleshooting Guide

## Step-by-Step Debugging Process

### Step 1: Check Console Logs

Run the app and navigate to a delivery screen. You should see these logs:

```
=== DIRECTIONS DEBUG ===
Segment: TO_VENDOR (or TO_WAREHOUSE, TO_CUSTOMER)
From Location: { lat: XX.XXXX, lng: XX.XXXX, label: "..." }
To Location: { lat: XX.XXXX, lng: XX.XXXX, label: "...", address: "..." }
Has Polyline: true/false
Polyline length: XXXX
=======================

=== ROUTE CALCULATION ===
Current Location: { latitude: XX.XXXX, longitude: XX.XXXX }
Pickup (blingCenter): { latitude: XX.XXXX, longitude: XX.XXXX }
Drop (buyer): { latitude: XX.XXXX, longitude: XX.XXXX }
Has Backend Polyline: true/false
Backend fromLat/Lng: XX.XXXX XX.XXXX
Backend toLat/Lng: XX.XXXX XX.XXXX
Has Google API Key: true/false
========================
```

### Step 2: Diagnose the Issue

#### Issue A: Coordinates show San Francisco (37.xxxx, -122.xxxx)

**Problem**: Backend is not sending real coordinates
**Solution**: Backend must populate these fields in the directions API response:

- `fromLatitude`
- `fromLongitude`
- `toLatitude`
- `toLongitude`

Check your backend database - ensure vendor/warehouse/customer locations have lat/lng stored.

#### Issue B: "Has Google API Key: false"

**Problem**: Google Maps API key not configured
**Solution**:

1. Get a Google Maps API key from Google Cloud Console
2. Enable "Directions API" in Google Cloud
3. Add to `app.json`:

```json
{
  "expo": {
    "extra": {
      "GOOGLE_MAPS_API_KEY": "YOUR_KEY_HERE"
    }
  }
}
```

4. Restart Metro: `npx expo start --clear`

#### Issue C: "Google API Status: REQUEST_DENIED" or "OVER_QUERY_LIMIT"

**Problem**: API key issues
**Solutions**:

- Check if Directions API is enabled in Google Cloud Console
- Check if billing is enabled
- Check if API key has proper restrictions (remove restrictions for testing)
- Check usage limits/quotas

#### Issue D: "Google API Status: ZERO_RESULTS"

**Problem**: Invalid coordinates or impossible route
**Solutions**:

- Verify coordinates are in valid range:
  - Latitude: -90 to 90
  - Longitude: -180 to 180
- Check if coordinates are in an accessible location (not ocean/restricted area)

#### Issue E: "Network request failed" (Android only)

**Problem**: Android blocking HTTP requests
**Solutions**:

1. Add to `app.json`:

```json
{
  "expo": {
    "android": {
      "usesCleartextTraffic": true
    }
  }
}
```

2. For production, use HTTPS for backend
3. Ensure device is on same network as dev server

### Step 3: Verify Backend Response

Use curl or Postman to test the directions endpoint:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://YOUR_BACKEND/api/me/shipments/SHIPMENT_ID/directions
```

Expected response for TO_VENDOR segment:

```json
{
  "data": {
    "id": "...",
    "segment": "TO_VENDOR",
    "fromLatitude": 24.7136, // Must not be null
    "fromLongitude": 46.6753, // Must not be null
    "toLatitude": 24.7743, // Vendor location - Must not be null
    "toLongitude": 46.7386, // Vendor location - Must not be null
    "fromLabel": "Current Location",
    "toLabel": "Vendor Name",
    "toAddress": "Vendor Address",
    "polyline": "optional_encoded_polyline_string"
  }
}
```

### Step 4: Common Fixes

#### Fix 1: Backend returns null coordinates

**Backend Action Required**:

```sql
-- Ensure vendors have coordinates
UPDATE vendors SET latitude = XX.XXXX, longitude = XX.XXXX WHERE id = '...';

-- Ensure warehouses have coordinates
UPDATE warehouses SET latitude = XX.XXXX, longitude = XX.XXXX WHERE id = '...';

-- Ensure customers have coordinates
UPDATE customers SET latitude = XX.XXXX, longitude = XX.XXXX WHERE id = '...';
```

#### Fix 2: Straight line instead of road route

**Root Cause**: Google Directions API is not being called successfully
**Check**:

1. Google API key is valid
2. Directions API is enabled
3. Billing is enabled
4. No CORS/network issues
5. Coordinates are valid

#### Fix 3: Route goes to wrong location

**Root Cause**: Using default fallback coordinates
**Fix**: Ensure backend sends proper `toLatitude`/`toLongitude` for each segment:

- TO_VENDOR: vendor's lat/lng
- TO_WAREHOUSE: warehouse's lat/lng
- TO_CUSTOMER: customer's lat/lng

### Step 5: Test Checklist

- [ ] Open delivery screen
- [ ] Check console for "DIRECTIONS DEBUG" log
- [ ] Verify all lat/lng values are NOT 37.xxxx, -122.xxxx (San Francisco defaults)
- [ ] Verify "Has Google API Key: true"
- [ ] Check "ROUTE CALCULATION" log
- [ ] Verify "Google API Status: OK" or "Got polyline from backend coords"
- [ ] Check map shows blue route line following roads
- [ ] Verify marker is at correct location (vendor/warehouse/customer)

### Step 6: Network Testing (Android)

If route works on iOS but not Android:

```bash
# Check if device can reach Google API
adb shell ping maps.googleapis.com

# Check if device can reach backend
adb shell ping YOUR_BACKEND_IP

# Enable USB reverse proxy (for localhost backend)
adb reverse tcp:3000 tcp:3000
```

### Step 7: Quick Test with Hardcoded Coordinates

For immediate testing, temporarily hardcode known coordinates in `delivery.tsx`:

```typescript
// TEMPORARY TEST ONLY
useEffect(() => {
  if (directions?.data && !directions.data.toLatitude) {
    console.log("⚠️ Using test coordinates - REMOVE IN PRODUCTION");
    // Riyadh coordinates for testing
    directions.data.toLatitude = 24.7136;
    directions.data.toLongitude = 46.6753;
  }
}, [directions]);
```

If this shows a proper route, the issue is definitely backend coordinates.

### Step 8: Validate Solution

Once fixed, you should see:

1. ✅ Blue polyline following actual roads
2. ✅ Marker at correct location (vendor/warehouse/customer based on segment)
3. ✅ Route updates when location changes
4. ✅ Different routes for different segments (TO_VENDOR, TO_WAREHOUSE, TO_CUSTOMER)

## Common Error Messages

| Error                                | Meaning                                       | Solution                        |
| ------------------------------------ | --------------------------------------------- | ------------------------------- |
| "Google Maps API Key not configured" | No API key in app config                      | Add to app.json extra config    |
| "REQUEST_DENIED"                     | API key invalid or Directions API not enabled | Check Google Cloud Console      |
| "ZERO_RESULTS"                       | Invalid coordinates or no route               | Verify lat/lng values           |
| "OVER_QUERY_LIMIT"                   | Exceeded API quota                            | Check billing/quotas in GCP     |
| "Network request failed"             | Can't reach Google API                        | Check network/cleartext config  |
| Route to San Francisco               | Using default fallback coords                 | Backend not sending real coords |
| Straight line route                  | Google API call failed                        | Check logs for reason           |

## Support

If issues persist after following all steps:

1. Share complete console logs from both "DIRECTIONS DEBUG" and "ROUTE CALCULATION"
2. Share backend API response for directions endpoint
3. Confirm Google API key status in Cloud Console
4. Specify device type (iOS/Android) and connection type (Wi-Fi/USB/Tunnel)
