# Resmo Workspace

Monorepo workspace for the Resmo Real Estate Management Platform.

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) v1.1.0+

## Quick Start

```bash
# 1. Clone workspace
git clone git@github.com:korpor-software/resmo-workspace.git Resmo
cd Resmo

# 2. Run setup
node setup.js

# 3. Configure secrets
# Edit .env with your values

# 4. Start development
bun run dev
```

### Setup Options

```bash
node setup.js              # SSH (default)
node setup.js --https      # HTTPS
```

Or use platform-specific scripts:
- **Windows:** `.\setup.ps1`
- **Mac/Linux:** `./setup.sh`

## Project Structure

```
Resmo/
├── .env              # Shared secrets (gitignored)
├── .env.example      # Template
├── package.json      # Workspace scripts
├── setup.js          # Cross-platform setup
└── apps/             # Repositories (gitignored)
    ├── admin/        # Port 5173
    ├── backend/      # Port 3000
    ├── company/      # Port 5174
    ├── superadmin/   # Port 5175
    └── conseiller/   # Port 5176
```

## Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps |
| `bun run dev:backend` | Backend only |
| `bun run dev:admin` | Admin only |
| `bun run dev:company` | Company only |
| `bun run dev:superadmin` | Superadmin only |
| `bun run dev:conseiller` | Conseiller only |
| `bun run build` | Build all |
| `bun run lint` | Lint all |

## Working with Apps

Each app in `apps/` is a separate Git repo:

```bash
cd apps/backend
git pull origin main
# make changes
git commit -m "message"
git push
```

## Troubleshooting

**Clone fails:** Check SSH keys (`ssh -T git@github.com`) or use `--https`

**Port in use:** 
```bash
# Windows
netstat -ano | findstr :3000
# Mac/Linux  
lsof -i :3000
```

**Bun not found:** Install from https://bun.sh
