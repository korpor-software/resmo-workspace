# Resmo Workspace

Monorepo workspace for the Resmo Real Estate Management Platform.

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (v1.1.0 or higher)

## Quick Start

### 1. Clone this workspace

```bash
git clone git@github.com:your-org/resmo-workspace.git Resmo
cd Resmo
```

### 2. Run the setup script

**Windows (PowerShell):**
```powershell
# First time: allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run setup (change your-org to your GitHub organization)
.\setup.ps1 -GitOrg "your-org"

# Or use HTTPS instead of SSH
.\setup.ps1 -GitOrg "your-org" -UseHTTPS
```

**Mac/Linux:**
```bash
# Make executable
chmod +x setup.sh

# Run setup (edit GIT_ORG in the script or export it)
export GIT_ORG="your-org"
./setup.sh

# Or use HTTPS
USE_HTTPS=true ./setup.sh
```

### 3. Configure environment

```bash
# Edit .env with your secrets (created from .env.example)
code .env  # or your preferred editor
```

### 4. Start development

```bash
# Install dependencies (if not done by setup script)
bun install

# Start all apps
bun run dev

# Or start individual apps
bun run dev:backend     # API server (port 3000)
bun run dev:admin       # Admin panel (port 5173)
bun run dev:company     # Company portal (port 5174)
bun run dev:superadmin  # Super admin (port 5175)
bun run dev:conseiller  # Conseiller app (port 5176)
```

## Project Structure

```
Resmo/
├── .env                 # Shared environment variables (gitignored)
├── .env.example         # Template for .env
├── package.json         # Workspace scripts
├── bunfig.toml          # Bun configuration
├── setup.ps1            # Windows setup script
├── setup.sh             # Mac/Linux setup script
└── apps/                # Application repositories (gitignored)
    ├── admin/           # Admin panel (React + Vite)
    ├── backend/         # API server (Bun + Hono)
    ├── company/         # Company portal (React + Vite)
    ├── superadmin/      # Super admin panel (React + Vite)
    └── conseiller/      # Conseiller app (React + Vite)
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun install` | Install all dependencies |
| `bun run dev` | Start all apps in parallel |
| `bun run dev:backend` | Start backend only |
| `bun run dev:admin` | Start admin only |
| `bun run dev:company` | Start company only |
| `bun run dev:superadmin` | Start superadmin only |
| `bun run dev:conseiller` | Start conseiller only |
| `bun run build` | Build all apps |
| `bun run lint` | Lint all apps |
| `bun run clean` | Remove all node_modules |

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 3000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT tokens |
| `SMTP_*` | Email configuration |
| `VITE_API_URL` | Backend API URL for frontends |

## Working with Individual Apps

Each app in `apps/` is a separate Git repository. To work on a specific app:

```bash
cd apps/backend
git status
git pull origin main
# ... make changes ...
git add .
git commit -m "Your changes"
git push origin main
```

## Troubleshooting

### Setup script fails to clone

1. Check your SSH keys are configured: `ssh -T git@github.com`
2. Or use HTTPS: `.\setup.ps1 -UseHTTPS` / `USE_HTTPS=true ./setup.sh`

### Port already in use

Check which process is using the port:
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

### Bun not found

Install Bun from https://bun.sh:
```bash
# Mac/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

## License

Private - All rights reserved.
