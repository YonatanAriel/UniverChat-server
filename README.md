# UniverChat — Multilingual Real-Time Chat Server

This repository implements the backend server for UniverChat, a real-time chat application that supports per-user language preferences and automatic translations using LibreTranslate.

## What this project provides

- Real-time messaging with Socket.IO
- Per-user preferred language settings
- Automatic translation of messages to each user's preferred language
- Translation caching in the database
- REST APIs and Socket.IO events for integration with a frontend client
- A Docker-compose setup for a local LibreTranslate instance

## Technologies

This project is built with the following technologies and libraries:

- Node.js and TypeScript
- Express for the REST API
- Socket.IO for real-time messaging
- better-sqlite3 for persistent storage (SQLite)
- LibreTranslate (self-hostable via Docker) for translations
- Docker and docker-compose for local translation service
- multer for file uploads (user photos)
- bcrypt / crypto utilities for password handling and auth helpers
- Cloudinary upload helper (optional) for photo storage

## Quick Setup

1. Copy the example env and edit as needed (do NOT commit secrets):

```powershell
cp .env.example .env
# edit .env locally with your own values
```

2. Start LibreTranslate (optional for local testing):

```powershell
cd libreTranslate
docker-compose up -d
```

3. Install and run the server:

```powershell
npm install
npm run dev
```

4. Run the translation test script (optional):

```powershell
npx ts-node test-translation.ts
```

## Important Files

- `src/Constants.ts` — supported languages and translation service URL
- `src/BL/services/translationServices/translationQueue.ts` — translation job queue and LibreTranslate integration
- `src/BL/services/socketServices/socket.service.ts` — Socket.IO event handlers and broadcasting logic
- `src/BL/services/messages.service.ts` — message storage and translation helpers
- `src/BL/services/users.service.ts` — user management and language preference logic
- `src/DL/controllers/message-translations.controller.ts` — CRUD for message translations
- `src/DL/models/*` — DB model schemas and table creation functions

## API Capabilities (summary)

The server exposes REST endpoints for user management, language preference updates, and translation retrieval. The frontend should call the appropriate APIs to:

- Create and authenticate users
- Update and fetch a user's preferred language
- Retrieve saved translations for messages when needed

(Exact endpoint paths are documented in `BACKEND_TO_FRONTEND_GUIDE.md` and `FRONTEND_INTEGRATION_GUIDE.md`.)

## Socket.IO Integration

- Clients should connect with Socket.IO and use the `send message` event to post messages.
- When joining a room, providing the user's ID will allow the server to return a pre-translated chat history tailored to the user's language preference.
- The server emits translation-related events so the frontend can show translation status and display translated text when it arrives.

## Translation Service

LibreTranslate is used for language detection and translation. The translation service URL is configurable via environment variables (see `.env.example`) — do not store secrets in the repository.

## Notes for Frontend Developers

- Fetch supported languages from the backend to populate language selectors.
- Persist the user's language preference via the backend API; do not store sensitive tokens in client-side code.
- Listen for both original and translated message events; show a clear UI state while translations are in progress.

## Notes for Contributors

- This project uses TypeScript and `better-sqlite3` for persistent storage
- Translations are cached in `message_translations` table to avoid repeated API calls
- The `TranslationQueue` processes jobs in batches to optimize rate limits and throughput

## License

MIT

---

If you need a `categories.txt` file for the front-matter validation, create `/categories.txt` with allowed categories (e.g., `chat`,`backend`,`translation`).
