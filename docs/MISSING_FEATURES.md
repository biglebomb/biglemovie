# Implementation Guide for Missing Features

This document provides an overview for features that are partially implemented or not yet implemented.

---

## Partially Implemented Features

### Unit Tests for Components

**Status:** Partially Implemented

**What's Done:**
- Testing framework: Vitest + React Testing Library
- Tests exist for: `useFormField`, `validation`, `MovieCard`

**What's Missing:**
- Tests for page components (`AuthPage`, `HomePage`, `MovieDetailsPage`, `FavoritesPage`)
- Tests for UI components (`AppHeader`, `TextField`, `ErrorState`)
- Integration tests for user flows

**Action Plan:**
- Add test files for each page component
- Add test files for UI components
- Add integration tests for auth and favorites flows

---

## Not Implemented Features

### Firebase Firestore Integration

**Status:** Not Implemented

**What's Needed:**
- Firebase project setup
- Install Firebase SDK
- Replace localStorage auth with Firebase Auth
- Implement real social login (Google, Facebook, Apple)
- Migrate favorites to Firestore
- Create Firestore security rules
- Data migration from localStorage

---

### Firebase Analytics

**Status:** Not Implemented

**What's Needed:**
- Enable Analytics in Firebase Console
- Track auth events (sign up, login, logout)
- Track movie events (view, search, add/remove favorite)
- Track page views
- Set user properties

**Note:** Requires Firebase setup from feature Firebase Firestore Integration first.

---

### Hosted Documentation

**Status:** Not Implemented

**What's Needed:**
- Choose hosting platform (Docusaurus, VitePress, GitHub Pages, or GitBook)
- Migrate existing markdown docs
- Deploy documentation site
- Update README with documentation link

**Files to migrate:**
- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `TECHNICAL_PROPOSAL.md`

---

### Electron.js Desktop Application

**Status:** Not Implemented

**What's Needed:**
- Install Electron and electron-builder
- Create Electron main process
- Create preload script
- Update Vite config for Electron
- Configure electron-builder for Windows/Mac/Linux builds
- Test on all platforms
- Set up code signing and distribution

---
