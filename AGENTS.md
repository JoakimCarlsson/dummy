# dummy

A tiny Node HTTP service used to test agent skills. No dependencies.

## Commands

- Run: `npm start` (port from `PORT`, default 3000)
- Test: `npm test`
- Single test file: `node --test server.test.js`

## Conventions

- ES modules, no build step.
- Every route needs a test in `server.test.js`.
- Keep the service dependency-free.
