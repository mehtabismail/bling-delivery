# 🔐 Socket Authentication Update

## ✅ Authentication Added

Your backend requires authentication for socket connections. I've updated the system to automatically include the authentication token from Redux store.

---

## 🔧 Changes Made

### 1. **Updated `useSocket.ts`**

- Added `authToken` parameter to socket options
- Sends token in two ways for maximum compatibility:
  - **Socket.io auth**: `auth: { token: authToken }`
  - **HTTP Headers**: `Authorization: Bearer ${authToken}`

```typescript
// Socket connects with authentication
const { emitLocation, isConnected } = useSocket({
  enabled: isGoLive,
  authToken, // ✅ Auth token automatically included
  onConnect: handleSocketConnect,
  onDisconnect: handleSocketDisconnect,
  onError: handleSocketError,
});
```

### 2. **Updated `SocketLocationService.tsx`**

- Gets auth token from Redux store automatically
- Passes token to socket connection
- No manual intervention needed

```typescript
// Token is pulled from Redux automatically
const authToken = useSelector((state: RootState) => state.auth.token);
```

---

## 🎯 How It Works

### Authentication Flow:

```
User Logs In
     ↓
Token saved in Redux store (state.auth.token)
     ↓
User toggles "Go Live" ON
     ↓
SocketLocationService reads token from Redux
     ↓
Token passed to useSocket hook
     ↓
Socket connects with authentication:
  - auth: { token: "your-token" }
  - Authorization: Bearer your-token
     ↓
Backend validates token
     ↓
✅ Connection successful!
```

---

## 📝 Expected Logs Now

When you toggle Go Live ON, you should see:

```
[MenuList] Go Live toggled: true
[Service] Go Live activated
[Socket] Connecting to: http://localhost:3000/rider
[Socket] Authenticating with token          ← ✅ New log
[Location] Starting location tracking...
[Socket] Connected successfully             ← ✅ No more auth errors
[Service] Socket connected - rider is now live
[Location] Background permission: granted
[Location] Tracking started successfully
[Location] Update sent: {latitude: ..., longitude: ..., timestamp: ...}
[Socket] Location emitted: {latitude: ..., longitude: ..., timestamp: ...}
```

---

## ⚠️ Troubleshooting

### If you still see "Authentication required":

#### 1. **Check if user is logged in**

```typescript
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const authToken = useSelector((state: RootState) => state.auth.token);
console.log("Auth Token:", authToken); // Should not be null
```

#### 2. **Verify token format**

Your backend might expect a specific token format. Check your backend code to see if it expects:

- `Bearer ${token}`
- Just the token
- A specific auth object structure

#### 3. **Check backend socket authentication**

Your backend should be handling authentication like this:

```javascript
// Example: Node.js/Socket.io backend
io.of("/rider").use((socket, next) => {
  const token =
    socket.handshake.auth.token ||
    socket.handshake.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new Error("Authentication required"));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
});

io.of("/rider").on("connection", (socket) => {
  console.log("Authenticated rider connected:", socket.userId);

  socket.on("location:update", (data) => {
    // Handle location update
  });
});
```

---

## 🔍 Debugging

### Check if token is being sent:

Add this to your backend to see what's being received:

```javascript
io.of("/rider").use((socket, next) => {
  console.log("Auth attempt:", {
    auth: socket.handshake.auth,
    headers: socket.handshake.headers.authorization,
  });
  next();
});
```

### Check token in app:

Add a console log to verify token exists:

```typescript
// In SocketLocationService.tsx
const authToken = useSelector((state: RootState) => state.auth.token);
console.log("[Service] Auth Token Available:", !!authToken);
console.log("[Service] Token Length:", authToken?.length);
```

---

## 🎁 Bonus: Manual Authentication

If you need to pass authentication differently, you can customize it:

```typescript
// In useSocket.ts, line 72-82
if (authToken) {
  socketOptions.auth = {
    token: authToken,
    // Add any other auth fields your backend needs
    userId: userId,
    role: "rider",
  };
  socketOptions.extraHeaders = {
    Authorization: `Bearer ${authToken}`,
    // Add any other headers
  };
}
```

---

## ✅ What's Protected

The authentication ensures:

- ✅ Only logged-in riders can connect
- ✅ Location updates are tied to authenticated users
- ✅ Backend can track which rider is sending updates
- ✅ Prevents unauthorized location spoofing

---

## 🚀 Ready to Test

1. **Ensure user is logged in** (token in Redux store)
2. **Toggle Go Live ON**
3. **Check console** - should see "Authenticating with token"
4. **Verify connection** - should see "Connected successfully"
5. **No more auth errors!** ✅

---

## 📞 Still Having Issues?

If authentication still fails:

1. Verify user is logged in and token exists in Redux
2. Check if token is expired
3. Verify backend authentication middleware
4. Check if backend expects different auth format
5. Review backend logs to see what's being received

---

**Status**: ✅ Authentication Implemented
**Version**: 1.1.0
**Last Updated**: November 2025
