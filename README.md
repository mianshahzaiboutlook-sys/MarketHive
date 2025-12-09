# Pny_Project

MarketHive — a small MERN-style (Node/Express + React) e-commerce demo project.

This repository contains two main folders:

- `pnyserver/` — Express backend (MongoDB + Mongoose). Contains API routes, controllers, models, and AWS SES email integration.
- `pnyclient/` — React frontend (Vite + Tailwind). Contains UI, components, pages, and client API calls.

## Repository Structure

```
Pny_Project/
├─ pnyclient/        # React frontend (Vite + Tailwind)
├─ pnyserver/        # Express backend (Node.js + Mongoose)
└─ .gitignore
```

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (Atlas or local)

## Environment

The server expects environment variables. A template exists at `pnyserver/.env.example`.

Create a local `.env` for the server (do NOT commit this file):

PowerShell example:

```powershell
Copy-Item pnyserver\.env.example pnyserver\.env
# Then edit pnyserver/.env and fill in your secrets
notepad pnyserver\.env
```

Important variables in `pnyserver/.env` (from `.env.example`):
- `PORT` — server port (default 8080)
- `JWT_SECRET` — authentication JWT secret
- `DB_CONNECTION_STRING` — MongoDB connection URI
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION` — for AWS SES email
- `SENDER_EMAIL` — sender address for outgoing emails

Reminder: `.env` is included in `.gitignore` to avoid committing secrets. If you ever accidentally committed secrets, rotate them immediately.

## Install & Run

Start the backend:

```powershell
cd 'C:\Users\OTS\Desktop\Pny_Project\pnyserver'
npm install
npm run dev   # or npm start (depending on package.json scripts)
```

Start the frontend:

```powershell
cd 'C:\Users\OTS\Desktop\Pny_Project\pnyclient'
npm install
npm run dev
```

The frontend expects the backend API to be available at `http://localhost:8080` by default. If you change the server port or host, update the client API base URLs in `pnyclient/src/config/apis.js`.

## Notes on Uploaded Images

- The backend serves uploaded product images from `http://localhost:8080/uploads/<filename>`.
- The frontend (`ProductCard`, `Carousel`) converts server-stored filenames into full URLs (e.g. `http://localhost:8080/uploads/<file>`). Ensure the backend is running and the `uploads` folder is accessible.

## Security / Secrets

If `pnyserver/.env` was ever pushed to a remote, consider the secrets compromised and rotate them immediately (MongoDB user/password, AWS keys, JWT secret). Removing a file from git history does not prevent earlier clones from containing the file.

If you need help removing `.env` from history, see `Contributing -> Git history cleanup` below.

## Contributing

- Make changes on feature branches, open pull requests, and avoid committing `.env`.
- If you accidentally committed secrets, create a backup branch and clean history (tools: `git filter-repo` or `git filter-branch`), then rotate secrets.

## Git history cleanup (overview)

Steps to remove a tracked file from history locally (do not run without understanding):

```powershell
# create a backup branch first
git branch backup-before-env-clean

# remove the file from all commits, then clean refs and gc
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch pnyserver/.env" --prune-empty --tag-name-filter cat -- --all
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# verify results, then (with caution) force-push to remote
# git push --force --all
# git push --force --tags
```

Warning: rewriting public history will require all collaborators to re-clone or reset their local repositories.

## License

This project is provided as-is for learning and demo purposes. Add a license file if you plan to open-source.

---
If you want, I can:
- Add a short project description for your README homepage
- Add badges (build, license) or CI steps
- Remove the committed `.env` from history (I can continue the todo list steps but will stop before pushing)
