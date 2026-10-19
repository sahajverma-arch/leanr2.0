# Leanr

A health and wellness app: personal diet plans, live yoga and HIIT classes, PT sessions booked by slot, and an AI coach that checks your form through the camera.

## What's in this repo

| Path | What it is |
| --- | --- |
| `mobile/` | The app itself: Expo SDK 58, React Native, TypeScript and expo-router, for Android and iOS. |
| `leanr-design-preview.html` | A clickable design prototype of every screen. |
| `leanr-ai-coach-live.html` | A browser demo of AI Coach pose tracking (MediaPipe). It needs camera access, so serve it from localhost. |

## Run the app

```bash
cd mobile
npm install
npx expo start --android
```

This opens the app in Expo Go on an Android emulator or phone. Camera form tracking will need a development build (`npx expo run:android`).

## Run the design demos

```bash
python -m http.server 5173
```

Then open http://localhost:5173/leanr-ai-coach-live.html in Chrome or Edge.
