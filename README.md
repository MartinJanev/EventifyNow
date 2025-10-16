# EventifyNow - Event Management System

A modern event management platform built with Angular 20 and Firebase, featuring real-time event discovery, creation, and management capabilities.

## 🚀 Tech Stack

- **Frontend**: Angular 20.3 (Standalone Components)
- **Backend**: Firebase (Firestore + Authentication)
- **Styling**: CSS (ready for Angular Material)
- **Language**: TypeScript 5.9

## 📋 Features

### Core Functionality
- ✅ Public event browsing and discovery
- ✅ Event search with debounced text input (300ms)
- ✅ Tag-based filtering
- ✅ Pagination (12 events per page, max 120)
- ✅ Detailed event views with resolver
- ✅ CRUD operations for authenticated users
- ✅ Event favorites/RSVP tracking
- ✅ Role-based access control (admin vs. user)
- ✅ Optimistic UI updates with rollback
- ✅ Toast notifications for user feedback
- ✅ Responsive design (mobile-friendly)

### Security Features
- Client-side auth guards (AuthRequiredGuard, AuthOptionalGuard)
- Event ownership validation
- TODO: Server-side Firestore security rules (see `docs/SECURITY_RULES_CHECKLIST.md`)

## 📁 Project Structure

```
src/app/
├── core/
│   ├── models/           # TypeScript interfaces (Event, User)
│   ├── services/         # Data services (Events, Auth, Toast)
│   ├── guards/           # Route guards and resolvers
│   └── util/             # Helpers (Firestore mappers, pagination, config)
├── shared/
│   ├── components/       # Reusable UI (loading, empty-state, tag-chip)
│   └── pipes/            # Custom pipes (date-range)
├── features/
│   ├── home/             # Landing page
│   └── events/
│       ├── pages/        # List, Details, Edit pages
│       ├── components/   # Event card, form
│       └── events.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── docs/
    ├── ARCHITECTURE.md
    ├── SECURITY_RULES_CHECKLIST.md
    └── llm.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore and Authentication enabled
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd event-management-system
   npm install
   ```

2. **Firebase Configuration:**
   - Your Firebase config is already in `src/environments/environment.ts`
   - Ensure Firestore and Email/Password Auth are enabled in Firebase Console

3. **Development Server:**
   ```bash
   npm start
   # or
   ng serve
   ```
   Navigate to `http://localhost:4200`

4. **Build for Production:**
   ```bash
   ng build --configuration production
   ```

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Tests are included for:
- EventsDataService (Firestore operations)
- AuthRequiredGuard (route protection)
- DateRangePipe (date formatting)

## 📊 Configuration & Rate Limits

All configurable constants are in `src/app/core/util/config.ts`:

| Constant | Value | Purpose |
|----------|-------|---------|
| `EVENTS_PAGE_SIZE` | 12 | Events per page |
| `SEARCH_DEBOUNCE_MS` | 300 | Search input delay (ms) |
| `MAX_QUERY_RESULTS` | 120 | Client-side query cap |
| `RETRY_READS` | 2 | Firestore read retry attempts |
| `MAX_CONCURRENT_WRITES` | 1 | Serialize writes to avoid conflicts |

## 🔥 Firebase Setup

### Current Status
⚠️ **DEV MODE** - Permissive rules enabled for development

### Firestore Collections

#### `events`
```typescript
{
  id: string;              // Auto-generated
  title: string;
  title_lc: string;        // Lowercase for search
  description: string;
  startAt: Timestamp;
  endAt: Timestamp;
  location: string;
  createdBy: string;       // UID
  tags: string[];
  capacity?: number;
  rsvpCount?: number;      // Denormalized
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `users/{uid}/stars/{eventId}`
```typescript
{
  eventId: string;
  starredAt: Timestamp;
}
```

### Required Indexes

Create these composite indexes in Firebase Console before production:

1. **Search + Sort**: `title_lc` (ASC), `createdAt` (DESC)
2. **Tag Filter**: `tags` (ARRAY_CONTAINS), `createdAt` (DESC)
3. **User Events**: `createdBy` (ASC), `updatedAt` (DESC)

## 🚦 Run & Verify Checklist

### Local Development

- [ ] `ng serve` starts without errors
- [ ] Navigate to `http://localhost:4200`
- [ ] Home page loads with hero section
- [ ] `/events` shows event list (or empty state)
- [ ] Search input debounces (type fast, waits 300ms)
- [ ] Tag filters work
- [ ] Click event card → details page loads
- [ ] Sign in required for "Create Event"
- [ ] Create event form validates required fields
- [ ] Event creation succeeds with toast notification
- [ ] Event edit/delete works for owner
- [ ] Star/favorite toggles correctly
- [ ] No console errors or warnings

### Firebase Console Checks

- [ ] Firestore: Check `events` collection populates
- [ ] Firestore: Check `users/{uid}/stars` subcollection
- [ ] Authentication: Verify user creation
- [ ] Usage tab: Monitor read/write counts

## 📝 Code Quality Standards

See `docs/llm.md` for full guidelines:

- **Files**: Max 200 LOC
- **Functions**: Max 100 LOC
- **DRY**: Extract shared logic to `core/` or `shared/`
- **JSDoc**: Required for all public methods
- **Tests**: Required for services, guards, pipes
- **TypeScript**: Strict mode, no `any` types

## 🔒 Security Checklist (Pre-Production)

⚠️ **MUST DO before deploying to production:**

1. **Firestore Rules**: Replace dev rules with production rules in `docs/SECURITY_RULES_CHECKLIST.md`
2. **Indexes**: Create all composite indexes listed above
3. **Auth**: Enable email verification, password strength requirements
4. **Cloud Functions**: Implement RSVP counter sync (see checklist)
5. **Search**: Replace naive text search with Algolia/Typesense
6. **Monitoring**: Enable Firebase Performance Monitoring
7. **Legal**: Add Terms of Service, Privacy Policy

See `docs/SECURITY_RULES_CHECKLIST.md` for complete pre-production checklist.

## 📚 Documentation

- **Architecture**: `docs/ARCHITECTURE.md` - System design, data flow, module boundaries
- **Security**: `docs/SECURITY_RULES_CHECKLIST.md` - Pre-production security checklist
- **Coding Standards**: `docs/llm.md` - Code quality guidelines, rate limits, patterns

## 🎯 Deferred Optimizations (TODOs)

Marked with `// TODO:` in code:

- Full-text search (Algolia integration)
- Firestore offline persistence
- Cloud Functions for RSVP counters
- Multi-tag filtering
- Image upload & optimization
- Real-time event updates (Firestore snapshots)
- Virtual scrolling for long lists
- Service worker (PWA)

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
ng cache clean
```

### Firestore Permission Denied

Check Firebase Console → Firestore → Rules. Ensure dev rules are active:
```javascript
allow read, write: if true; // DEV ONLY
```

### Search Not Working

Create the `title_lc` composite index in Firebase Console (link appears in browser console when you first search).

## 📄 License

This project is for educational purposes.

## 👥 Contributing

1. Follow code standards in `docs/llm.md`
2. Keep functions under 100 LOC, files under 200 LOC
3. Add JSDoc to all public methods
4. Include unit tests for new services/guards/pipes
5. Run `ng test` before committing

---

**Built with ❤️ using Angular 20 and Firebase**

