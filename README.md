# EventifyNow 🎉

> Modern event management platform built with Angular 20 and Firebase

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup Firebase credentials
copy .env.example .env
# Edit .env with your Firebase credentials from Firebase Console

# 3. Run the app
npm start
```

Visit `http://localhost:4200`

## Features

✨ **Event Discovery** - Browse and search public events  
🎯 **Smart Filtering** - Search by name, tags, and date  
📝 **Event Management** - Create, edit, and manage your events  
🔐 **Secure Auth** - Firebase authentication with role-based access  
📱 **Responsive** - Works on all devices  

## Tech Stack

- Angular 20 (Standalone Components)
- Firebase (Firestore + Auth)
- TypeScript 5.9
- CSS with custom design system

## Project Structure

```
src/app/
├── core/          # Models, services, guards
├── features/      # Pages (home, events, auth)
└── shared/        # Reusable components & pipes
```

## Available Commands

```bash
npm start          # Start dev server
npm run build      # Build for production
npm run set-env    # Regenerate environment files from .env
npm run format     # Format code with Prettier
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/) → Project Settings
3. Add credentials to `.env` file
4. Run `npm start`

**Note:** `.env` is gitignored - never commit it!

## Documentation

- `docs/ARCHITECTURE.md` - System architecture overview
- `docs/FILE_STRUCTURE.md` - Detailed file organization

## License

Private project - All rights reserved
