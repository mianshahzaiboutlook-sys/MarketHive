# Pny_Project

MarketHive — a small MERN-style (Node/Express + React) e-commerce demo project.

This repository contains two main folders:

* `pnyserver/` — Express backend (MongoDB + Mongoose). Contains API routes, controllers, models, and AWS SES email integration.
* `pnyclient/` — React frontend (Vite + Tailwind). Contains UI, components, pages, and client API calls.

## Repository Structure

```
Pny_Project/
├─ pnyclient/        # React frontend (Vite + Tailwind)
├─ pnyserver/        # Express backend (Node.js + Mongoose)
└─ .gitignore
```

## Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* MongoDB instance (Atlas or local)

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

* `PORT` — server port (default 8080)
* `JWT_SECRET` — authentication JWT secret
* `DB_CONNECTION_STRING` — MongoDB connection URI
* `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION` — for AWS SES email
* `SENDER_EMAIL` — sender address for outgoing emails

Reminder: `.env` is included in `.gitignore` to avoid committing secrets. If you ever accidentally committed secrets, rotate them immediately.

## Install & Run

### 1. Clone the repository

```sh
git clone https://github.com/mianshahzaiboutlook-sys/MarketHive.git
```

### 2. Install dependencies

#### Backend (pnyserver)

```sh
cd MarketHive/pnyserver
npm install
```

#### Frontend (pnyclient)

```sh
cd ../pnyclient
npm install
```

### 3. Seed the database (add test users and products)

```sh
cd ../pnyserver
node seeder.js
```

This will create:

* `admin@example.com` `Admin@123` (Admin Account)
* `user@example.com` `User@123` (Normal User)
* Dummy products for testing

### 4. Start both frontend & backend together

```sh
cd ../
cd MarketHive
./.sh
```

✔ **Backend:** `http://localhost:8080`
✔ **Frontend:** `http://localhost:5173` (Vite)

## Notes on Uploaded Images

* The backend serves uploaded product images from `http://localhost:8080/uploads/<filename>`.
* The frontend (`ProductCard`, `Carousel`) converts server-stored filenames into full URLs. Ensure the backend is running and the `uploads` folder contains the images.

## Security / Secrets

If `pnyserver/.env` was ever pushed to a remote, consider the secrets compromised and rotate them immediately (MongoDB user/password, AWS keys, JWT secret). Removing a file from git history does not prevent earlier clones from containing the file.

## Contributing

* Make changes on feature branches, open pull requests, and avoid committing `.env`.
* If you accidentally committed secrets, create a backup branch and clean history (tools: `git filter-repo` or `git filter-branch`), then rotate secrets.

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
# Pny_Project

MarketHive — a small MERN-style (Node/Express + React) e-commerce demo project.

This repository contains two main folders:

* `pnyserver/` — Express backend (MongoDB + Mongoose). Contains API routes, controllers, models, and AWS SES email integration.
* `pnyclient/` — React frontend (Vite + Tailwind). Contains UI, components, pages, and client API calls.

## Repository Structure

```
Pny_Project/
├─ pnyclient/        # React frontend (Vite + Tailwind)
├─ pnyserver/        # Express backend (Node.js + Mongoose)
└─ .gitignore
```

## Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* MongoDB instance (Atlas or local)

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

* `PORT` — server port (default 8080)
* `JWT_SECRET` — authentication JWT secret
* `DB_CONNECTION_STRING` — MongoDB connection URI
* `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION` — for AWS SES email
* `SENDER_EMAIL` — sender address for outgoing emails

Reminder: `.env` is included in `.gitignore` to avoid committing secrets. If you ever accidentally committed secrets, rotate them immediately.

## Install & Run

### 1. Clone the repository

```sh
git clone https://github.com/mianshahzaiboutlook-sys/MarketHive.git
```

### 2. Install dependencies

#### Backend (pnyserver)

```sh
cd MarketHive/pnyserver
npm install
```

#### Frontend (pnyclient)

```sh
cd ../pnyclient
npm install
```

### 3. Seed the database (add test users and products)

```sh
cd ../pnyserver
node seeder.js
```

This will create:

* `admin@example.com` (Admin Account)
* `user@example.com` (Normal User)
* Dummy products for testing

### 4. Start both frontend & backend together

```sh
cd ../
cd MarketHive
./.sh
```

✔ **Backend:** `http://localhost:8080`
✔ **Frontend:** `http://localhost:5173` (Vite)

## Notes on Uploaded Images

* The backend serves uploaded product images from `http://localhost:8080/uploads/<filename>`.
* The frontend (`ProductCard`, `Carousel`) converts server-stored filenames into full URLs. Ensure the backend is running and the `uploads` folder contains the images.

## Security / Secrets

If `pnyserver/.env` was ever pushed to a remote, consider the secrets compromised and rotate them immediately (MongoDB user/password, AWS keys, JWT secret). Removing a file from git history does not prevent earlier clones from containing the file.

## Contributing

* Make changes on feature branches, open pull requests, and avoid committing `.env`.
* If you accidentally committed secrets, create a backup branch and clean history (tools: `git filter-repo` or `git filter-branch`), then rotate secrets.

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
