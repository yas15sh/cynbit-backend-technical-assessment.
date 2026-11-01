# Cynbit Backend Assessment — Reference Implementation

An independent Express + Prisma API demonstrating server-side validation, public endpoint rate limiting, baseline security headers, consistent responses and database persistence.

> This is an illustrative reference implementation for the assessment. It is not Cynbit source code, does not connect to Cynbit systems, and does not claim Cynbit uses this exact stack.

## Requirements
- Node.js 20+
- PostgreSQL
- npm

## Setup
```bash
npm install
cp .env.example .env
# Set DATABASE_URL to your local PostgreSQL database
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
API: http://localhost:4000

## Endpoints
- `GET /health`
- `POST /api/v1/contact`

Example POST body:
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "company": "Example Systems",
  "industry": "Software",
  "message": "I would like to discuss a software project."
}
```
Success returns HTTP 201. Invalid input returns HTTP 400 with `VALIDATION_ERROR`.

## Tests
```bash
npm test
```
Tests cover the Zod input schema; they do not test a live database or full HTTP integration.

## Design decisions
- Zod validates at the trust boundary.
- Helmet supplies baseline HTTP security headers; configure CSP for the real frontend.
- express-rate-limit adds basic public endpoint abuse protection.
- Prisma provides typed data access and schema migrations.
- Central error handling avoids exposing stack traces to API clients.
- Production email notifications should be queued after durable inquiry persistence.

## Production hardening still required
- Durable queue/outbox, retries, idempotency and dead-letter handling.
- Authentication, MFA and server-side authorization for admin routes.
- CSRF protection where cookie sessions are used.
- Shared rate-limit store and deliberate trusted-proxy configuration.
- Structured logging, correlation IDs, redaction, metrics and alerts.
- Secrets manager, database least privilege, backups and restore testing.
- Retention/deletion workflow and privacy/consent records.
- Integration tests against an isolated test database.

Only passive, authorized review was performed. Do not run this code against Cynbit infrastructure or test its endpoints without explicit written authorization.
