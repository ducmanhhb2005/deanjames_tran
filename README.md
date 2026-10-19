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
- Upcoming album: `Liquid Reset`, with Panic Room and I Thought I Knew You linked on Spotify
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
- Young Universe: `http://localhost:5173/albums/young-universe`
- Song lyrics and audio: `http://localhost:5173/albums/young-universe/tracks/that-61s`
- Liquid Reset: `http://localhost:5173/albums/liquid-reset`
- API: `http://localhost:4000/api/artist`
- Health: `http://localhost:4000/health`

## Deploy

See [`DEPLOY.md`](./DEPLOY.md).

The home page `/` opens Liquid Reset by default. Young Universe remains available at `/albums/young-universe`. The album links also work without the API using local fallback data. Unknown album paths show an album-not-found page.

Liquid Reset is marked as unreleased and lists Panic Room and I Thought I Knew You with the supplied Spotify links. Its album data is shared by the API and frontend in `shared/liquidReset.mjs`.

The Liquid Reset page uses the supplied photographs in `assets/Liquid Reset` for a blue-hour and warm-gold visual theme, with an album artwork section, inline Spotify players, and a visual diary with an accessible image viewer. Web copies are in `client/public/images/liquid-reset`; the original photographs are preserved. Styles are scoped to Liquid Reset, including its direct song pages.

## Liquid Reset lyrics and audio

`lyrics_liquid_reset.md` supplies lyrics for all four Liquid Reset songs and YouTube audio for Panic Room and I Thought I Knew You. Waving at the ship and The Porch Light are marked as unreleased, use the supplied shoreline photograph, and show lyrics without streaming controls. Audio URLs are optional for this album's unreleased songs. The frontend and API use `createLiquidResetAlbum` in `shared/liquidReset.mjs` with the common parser in `shared/lyricSheet.mjs`. Rebuild the frontend and restart the API after editing a lyric sheet.

Click a song image, title, or **Listen & lyrics** / **Read lyrics** to open its own page with song artwork, verse/chorus navigation, text size controls, and previous/next links. Songs with audio include a YouTube player. Direct song paths end in `panic-room`, `i-thought-i-knew-you`, `waving-at-the-ship`, or `the-porch-light` under `/albums/liquid-reset/tracks/`.

## Young Universe lyrics and audio

`lyrics.md` is the source for all 14 song titles, YouTube audio URLs, and lyrics. Keep each numbered song heading followed by its YouTube URL, then lyrics with bracketed section labels such as `[Verse 1]` and `[Chorus]`. Both the frontend and API read this file through `shared/youngUniverse.mjs`; no separate copies of the lyrics need updating. Rebuild the frontend and restart the API after edits.

Click a song title or **Listen & lyrics** to open its listening room. Each song has a direct URL, YouTube player, section navigation, text size controls, and previous/next song links. These pages also work when the API is offline or still serves older audio links.
