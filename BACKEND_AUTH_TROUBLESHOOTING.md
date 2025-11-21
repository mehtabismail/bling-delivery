# 🔧 Backend Authentication Troubleshooting

## 🔍 Current Issue

Socket connects briefly but backend immediately disconnects with "Authentication required". This means the backend is receiving the connection but rejecting the authentication.

---

## 📝 Check These First

### 1. **Is User Logged In?**

Make sure the user is logged in and has a token in Redux:

```typescript
// Check in any component
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const token = useSelector((state: RootState) => state.auth.token);
console.log("User Token:", token); // Should NOT be null
```

### 2. **Check Token in Backend Logs**

Add this to your backend **before** authentication check:

```javascript
// Backend: Node.js/Socket.io
io.of("/rider").use((socket, next) => {
  console.log("🔍 Auth Debug:");
  console.log("  - Auth object:", socket.handshake.auth);
  console.log("  - Headers:", socket.handshake.headers.authorization);
  console.log("  - Token from auth:", socket.handshake.auth.token);

  // Your validation code here...
  next();
});
```

---

## 🎯 Common Backend Auth Patterns

### **Option 1: Token in auth object (Socket.io native)**

```javascript
io.of("/rider").use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});
```

### **Option 2: Token in Authorization header**

```javascript
io.of("/rider").use((socket, next) => {
  const authHeader = socket.handshake.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});
```

### **Option 3: Try both (Recommended)**

```javascript
io.of("/rider").use((socket, next) => {
  // Try auth object first, then header
  const token =
    socket.handshake.auth.token ||
    socket.handshake.headers.authorization?.replace("Bearer ", "");

  console.log("Token received:", token ? "YES" : "NO");

  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    console.log("✅ Authenticated user:", decoded.userId);
    next();
  } catch (error) {
    console.error("❌ Token validation failed:", error.message);
    next(new Error("Invalid token"));
  }
});
```

---

## 🔧 Frontend Sends Token In Two Ways

Your app sends the token in **both formats**:

1. **Socket.io auth object**: `socket.handshake.auth.token`
2. **HTTP Authorization header**: `socket.handshake.headers.authorization`

Check your backend logs to see which one it's receiving.

---

## 🚨 Possible Issues

### Issue 1: Token is NULL

**Symptoms:**

```
[Socket] ⚠️ No auth token provided - connection will fail!
```

**Solution:**

- User needs to log in first
- Check if login is saving token to Redux correctly
- Verify `state.auth.token` is populated

---

### Issue 2: Token Format Mismatch

**Symptoms:**

- Token exists in app
- Backend still rejects it

**Check:**
Does your backend expect:

- Just the token? `"eyJhbGc..."`
- Bearer prefix? `"Bearer eyJhbGc..."`
- Different format?

**Frontend sends:**

- `auth.token`: Raw token (no Bearer prefix)
- `Authorization` header: `"Bearer <token>"`

---

### Issue 3: Token Expired

**Symptoms:**

- Worked before, now fails
- Backend logs "Token expired"

**Solution:**

- Refresh the token
- Re-login to get new token

---

### Issue 4: Wrong Secret Key

**Symptoms:**

- Backend logs "Invalid signature"
- JWT verification fails

**Solution:**

- Make sure backend uses correct JWT secret
- Token must be signed with same secret backend validates with

---

## 🧪 Quick Test

### Test 1: Check if token exists

Add to `SocketLocationService.tsx`:

```typescript
const authToken = useSelector((state: RootState) => state.auth.token);

useEffect(() => {
  console.log("🔑 AUTH DEBUG:");
  console.log("  Token exists:", !!authToken);
  console.log("  Token:", authToken);
}, [authToken]);
```

### Test 2: Bypass auth temporarily (TESTING ONLY!)

To verify socket connection works without auth:

```javascript
// Backend - TESTING ONLY
io.of("/rider").use((socket, next) => {
  console.log("⚠️ BYPASSING AUTH FOR TESTING");
  socket.userId = "test-user";
  next(); // Allow all connections
});
```

If this works, the issue is definitely authentication format.

---

## 📋 Checklist

- [ ] User is logged in (token exists in Redux)
- [ ] Backend logs show what token format is received
- [ ] Backend JWT secret is correct
- [ ] Token is not expired
- [ ] Backend auth middleware is reading token correctly
- [ ] Backend error logs show specific validation failure

---

## 🎯 Expected Backend Logs (Success)

```
🔍 Auth Debug:
  - Auth object: { token: 'eyJhbGc...' }
  - Headers: Bearer eyJhbGc...
  - Token from auth: eyJhbGc...
✅ Authenticated user: 12345
Rider connected: socket-id-here
```

---

## 💡 Most Likely Issues

1. **Token is null** (70% of cases)

   - User not logged in
   - Token not saved to Redux

2. **Backend format mismatch** (20% of cases)

   - Backend expecting different format
   - Not reading `socket.handshake.auth.token`

3. **Token expired** (10% of cases)
   - Need to refresh/re-login

---

## 🆘 If Still Stuck

Share these logs:

1. Frontend token check logs
2. Backend auth middleware logs
3. Backend JWT verification error

This will show exactly where the auth is failing!
