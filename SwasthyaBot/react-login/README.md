# React Login (Demo)

This is a minimal Vite + React demo app with a single login page.

Features
- Accessible form with labels and aria-live error messaging
- Client-side validation
- Mock authentication (accepts user@example.com / password123)
- Remember-me that stores email in localStorage

Getting started
1. cd into the project

```powershell
cd "c:/Users/Joanna Stephen/SwasthyaBot/react-login"
```

2. Install dependencies and run dev server

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Notes
- This is a front-end demo. Replace the mock auth in `src/Login.jsx` with a real API call to integrate with your backend.

Quick zero-install demo

If you don't want to install Node/npm you can open the demo directly in your browser:

1. Open `react-login/index.html` in your browser (double-click the file).
2. The page uses an in-browser mock auth. Use the demo credentials:
	- Email: `user@example.com`
	- Password: `password123`

This demo loads React from a CDN and compiles the JSX in the browser (Babel). It's meant for quick testing and is not production-ready.
