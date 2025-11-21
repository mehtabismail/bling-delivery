# 🚀 Quick Start - Socket Location Tracking

## Step 1: Install Dependencies

```bash
npm install socket.io-client
```

## Step 2: Configure app.json

Add location permissions:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We need your location to track deliveries.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "We need your location in background to track deliveries.",
        "UIBackgroundModes": ["location"]
      }
    },
    "android": {
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ]
    }
  }
}
```

## Step 3: That's It! 🎉

The system is already integrated. When a rider toggles "Go Live" in the Account screen:

- ✅ Socket connects to `BASE_URL/rider`
- ✅ Location tracking starts automatically
- ✅ Location updates emit to backend via `location:update` event
- ✅ Works across all screens
- ✅ Continues in background

## Testing

1. Open the app
2. Go to Account tab
3. Toggle "Go Live" ON
4. Grant location permissions
5. Check console logs for connection status
6. Move around (>10 meters) to trigger location updates

## Console Output (Success)

```
[MenuList] Go Live toggled: true
[Service] Go Live activated
[Socket] Connecting to: http://localhost:3000/rider
[Location] Starting location tracking...
[Socket] Connected successfully
[Location] Tracking started successfully
[Location] Update sent: {latitude: ..., longitude: ..., timestamp: ...}
[Socket] Location emitted: {latitude: ..., longitude: ..., timestamp: ...}
```

## What Gets Sent to Backend

```json
{
  "event": "location:update",
  "data": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timestamp": "2025-11-12T10:30:45.123Z"
  }
}
```

## Optimization Features

- ⚡ Only sends updates when rider moves >10 meters
- ⏱️ Minimum 5 seconds between updates
- 📦 Queues locations if temporarily offline
- 🔋 Battery optimized
- 📱 Works in background

## Need Help?

See `SOCKET_LOCATION_SETUP.md` for detailed documentation.
