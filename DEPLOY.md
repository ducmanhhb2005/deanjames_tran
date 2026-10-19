# Deploy: Vercel frontend + Render backend, no database

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial no-db deploy"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## 2. Deploy backend on Render

Create a new **Web Service** and connect your GitHub repo.

Settings:

```txt
Root Directory: (leave empty; use the repository root)
Runtime: Node
Build Command: npm ci --omit=dev --workspace server
Start Command: npm start --workspace server
```

For an existing service, clear the previous `server` Root Directory before deploying these changes. The API reads `lyrics.md`, `lyrics_liquid_reset.md`, and `shared/` from the repository root. Render excludes files outside a configured service root; see [Render monorepo support](https://render.com/docs/monorepo-support).

Environment variables:

```txt
NODE_ENV=production
CLIENT_ORIGIN=http://localhost:5173
```

After the backend deploys, test:

```txt
https://<your-render-service>.onrender.com/health
https://<your-render-service>.onrender.com/api/artist
```

## 3. Deploy frontend on Vercel

Import the same GitHub repo into Vercel.

Settings:

```txt
Framework Preset: Vite
Root Directory: client
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Keep `client/vercel.json` in the frontend project. Its rewrite serves the app when opening or refreshing `/albums/young-universe` and `/albums/liquid-reset` directly.

It also rewrites `/albums/:albumId/tracks/:trackId` for individual song pages. Keep both root lyric sheets (`lyrics.md` and `lyrics_liquid_reset.md`) and the `shared/` directory in the repository: both the frontend build and backend load the album content from them. The site root `/` opens Liquid Reset.

In Vercel project settings, enable **Include source files outside of the Root Directory in the Build Step** under **Root Directory**, so the frontend can import these shared files. See [Vercel monorepo FAQ](https://vercel.com/docs/monorepos/monorepo-faq).

Environment variable:

```txt
VITE_API_URL=https://<your-render-service>.onrender.com/api
```

## 4. Update CORS on Render

After Vercel gives you a URL like:

```txt
https://your-project.vercel.app
```

Go back to Render backend and set:

```txt
CLIENT_ORIGIN=https://your-project.vercel.app
```

Then redeploy or restart the backend.

If you later add a custom domain, use comma-separated origins:

```txt
CLIENT_ORIGIN=https://your-project.vercel.app,https://your-domain.com
```
