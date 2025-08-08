# Transport - Typed Event Emitter for Actions

A minimal, strongly-typed event system using a `LinkedList`-based listener registry.  
Perfect for handling internal communication between services, modules, or UI logic.

---

## 📦 Features

- ✅ Type-safe actions via `SendActionMap`
- ✅ `addListener` and `removeListener` for multiple callbacks
- ✅ `once` for one-time listeners
- ✅ Minimal and fast `LinkedList`-based storage
- ✅ Clean integration via module augmentation

---

## 🧠 Concept

At its core, the `Transport` class allows you to **send messages** (with optional payloads) and **register listeners** for specific actions. All listeners are scoped to typed keys defined in `SendActionMap`.

---

## 🚀 Getting Started

### 1. Install

```bash
npm install wi-functions-emitter
```

### 2. Extend the SendActionMap interface

To register your valid action names, extend the SendActionMap in your app:
```typescript
// types/transport.d.ts or any global file
import "wi-functions-emitter";

declare module "wi-functions-emitter" {
  interface SendActionMap {
    UPDATE_ADDRESS: true;
    INSERT_ADDRESS: true;
    INSERT_PAYMENT: true;
    INSERT_PAYMENT_CATEGORY: true;
    INSERT_USER: true;
    CHECK_SESSION: true;
    ACTION_LOGIN: true;
    UPDATE_PAYMENT: true;
  }
}
```

TypeScript will enforce only those keys as valid listenerName or action.


## ✨ Usage

### 1. Initialize

```typescript
import { Transport } from 'wi-functions-emitter';

const transport = new Transport();
```

### 2. Add a Listener
```typescript
transport.addListener("INSERT_USER", ({ action, payload }) => {
  console.log("User inserted:", payload);
});
```

### 3. Send a Message
```typescript
transport.sendMessage({
  action: "INSERT_USER",
  payload: {
    id: 123,
    name: "Alice"
  }
});
```

### 4. One-Time Listener

The listener will be removed after the first call:

```typescript
transport.once("ACTION_LOGIN", ({ action, payload }) => {
  console.log("Login event handled:", payload);
});
```

### 5. Remove a Listener
```typescript
function onSessionCheck({ action }: { action: string }) {
  console.log("Checking session...");
}

transport.addListener("CHECK_SESSION", onSessionCheck);
transport.removeListener("CHECK_SESSION", onSessionCheck);
```

## 📚 API Reference

| Method                                                                 | Description                                             |
|------------------------------------------------------------------------|---------------------------------------------------------|
| `addListener<T>(action: ISendAction, callback: ICallbackFn<T>)`       | Adds a new listener for the given action.              |
| `removeListener<T>(action: ISendAction, callback: ICallbackFn<T>)`    | Removes a specific listener.                           |
| `once<T>(action: ISendAction, callback: ICallbackFn<T>)`              | Adds a listener that auto-removes after one call.      |
| `sendMessage<T>(data: ICallbackFnArguments<T>)`                       | Triggers all callbacks associated with the given action. |

## 🧪 Testing

```typescript
npm run test
```