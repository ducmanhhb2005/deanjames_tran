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
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

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
