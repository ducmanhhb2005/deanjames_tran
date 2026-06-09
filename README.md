# Deanjames Tran Cosmic Web — No DB Deploy

A full-stack cosmic artist website for Deanjames Tran.

Tech stack:

- React + Vite frontend
- Node.js + Express API
- Static API data in the backend, no database required
- Deploy frontend on Vercel and backend on Render

Artist data included:

- Spotify artist profile
- YouTube channel: `https://www.youtube.com/@manhuc9459`
- Album: `Young Universe`
- 14 tracks with Spotify/YouTube links
- Cosmic visual UI using the provided Young Universe cover image

## Run locally

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run setup
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api/artist`
- Health: `http://localhost:4000/health`

## Deploy

See [`DEPLOY.md`](./DEPLOY.md).
