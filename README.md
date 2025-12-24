# PRPO Chat Frontend (Angular 17)

Angular 17 shell for the PRPO chat microservices project. This is frontend-only and keeps business logic out for now; all `.ts` files only handle navigation between pages.

## Quick start

```bash
npm install
npm start
# http://localhost:4200
```

## Routes & pages

- `/auth` — login/register placeholder (wire to User service later).
- `/chats` — DMs and group chats hub with “create group” UX.
- `/users` — directory + detail placeholder.
- `/search` — search stub across messages/users/servers/media.
- `/media` — uploads/files placeholder.
- `/notifications` — STOMP notification stream placeholder.
- `/presence` — online/offline activity placeholder.

## Structure

- `src/app/core/layout/shell` — layout shell with nav and router outlet.
- `src/app/features/*` — standalone pages (auth, chats, users, search, media, notifications, presence).
- `src/styles/_theme.scss` — small design token set reused by all pages.
- `src/environments/` — Angular environment files (ready for later config).

## Backend wiring (later)

- Keep using `HttpClient` returning `Observable<T>`; avoid Promises/async-await.
- Add feature facades/services alongside each page to hold streams (e.g., `messages$`, `loading$`, `error$`) when backend endpoints are ready.
- Configure per-microservice base URLs (User, Server, Message, Media, Presence, Search, Notification; encryption excluded) in an environment file or runtime config loader before calling APIs.
- Add STOMP/WebSocket client for the Notification service and subscribe per user/chat.

## OpenAPI DTO generation plan

1) Place specs under `openapi/` (e.g., `openapi/user-service.yaml`, `openapi/server-service.yaml`, `openapi/message-service.yaml`, `openapi/media-service.yaml`, `openapi/presence-service.yaml`, `openapi/search-service.yaml`, `openapi/notification-service.yaml`).
2) Generate Angular-friendly clients/types (example for User service):

```bash
npx @openapitools/openapi-generator-cli generate ^
  -g typescript-angular ^
  -i openapi/user-service.yaml ^
  -o src/app/api/generated/user ^
  --additional-properties=ngVersion=17,providedInRoot=true,modelPropertyNaming=original
```

3) Repeat per service and expose the DTO barrels you want to import from `src/app/api/generated/`.
4) Import DTOs into your future feature services/facades (e.g., `UserDto` for user list streams, `MessageDto` for chat streams).

## Next steps

- Add route guards to block anything until `/auth` succeeds.
- Introduce feature facades (Observables) and API services that consume generated DTOs.
- Add interceptor placeholders (auth headers, logging, error handling).
- Swap static placeholders for real data and hook up STOMP notifications.
