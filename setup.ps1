# ============================================
# Resmo Workspace Setup Script (Windows)
# ============================================
# This script clones all app repositories into the apps/ folder
# Run: .\setup.ps1

param(
    [string]$GitHost = "github.com",
    [string]$GitOrg = "your-org",  # Change this to your GitHub organization/username
    [switch]$UseHTTPS = $false
)

$ErrorActionPreference = "Stop"

# Repository configuration
$repos = @(
    @{ name = "resmo-admin"; folder = "admin" },
    @{ name = "resmo-backend"; folder = "backend" },
    @{ name = "resmo-company"; folder = "company" },
    @{ name = "resmo-superadmin"; folder = "superadmin" },
    @{ name = "resmo-conseiller"; folder = "conseiller" }
)

# Colors for output
function Write-Step { param($msg) Write-Host "`n>> $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "   [OK] $msg" -ForegroundColor Green }
function Write-Warning { param($msg) Write-Host "   [SKIP] $msg" -ForegroundColor Yellow }
function Write-Error { param($msg) Write-Host "   [ERROR] $msg" -ForegroundColor Red }

# Header
Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "       Resmo Workspace Setup" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta

# Check prerequisites
Write-Step "Checking prerequisites..."

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed. Please install Git first."
    exit 1
}
Write-Success "Git is installed"

if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "   [WARN] Bun is not installed. Install from: https://bun.sh" -ForegroundColor Yellow
}
else {
    Write-Success "Bun is installed"
}

# Create apps directory
Write-Step "Creating apps directory..."
$appsDir = Join-Path $PSScriptRoot "apps"

if (-not (Test-Path $appsDir)) {
    New-Item -ItemType Directory -Path $appsDir | Out-Null
    Write-Success "Created apps/ directory"
}
else {
    Write-Success "apps/ directory already exists"
}

# Clone repositories
Write-Step "Cloning repositories..."

foreach ($repo in $repos) {
    $repoPath = Join-Path $appsDir $repo.folder
    
    if (Test-Path $repoPath) {
        Write-Warning "$($repo.folder) already exists, skipping..."
        continue
    }
    
    # Build clone URL
    if ($UseHTTPS) {
        $cloneUrl = "https://$GitHost/$GitOrg/$($repo.name).git"
    }
    else {
        $cloneUrl = "git@${GitHost}:$GitOrg/$($repo.name).git"
    }
    
    Write-Host "   Cloning $($repo.name)..." -ForegroundColor Gray
    
    try {
        git clone $cloneUrl $repoPath 2>&1 | Out-Null
        Write-Success "Cloned $($repo.name) -> apps/$($repo.folder)"
    }
    catch {
        Write-Error "Failed to clone $($repo.name): $_"
    }
}

# Setup environment file
Write-Step "Setting up environment..."

$envExample = Join-Path $PSScriptRoot ".env.example"
$envFile = Join-Path $PSScriptRoot ".env"

if (-not (Test-Path $envFile)) {
    if (Test-Path $envExample) {
        Copy-Item $envExample $envFile
        Write-Success "Created .env from .env.example"
        Write-Host "   [ACTION] Edit .env and add your secrets!" -ForegroundColor Yellow
    }
    else {
        Write-Warning ".env.example not found, skipping .env creation"
    }
}
else {
    Write-Success ".env already exists"
}

# Install dependencies
Write-Step "Installing dependencies..."

if (Get-Command bun -ErrorAction SilentlyContinue) {
    Write-Host "   Running bun install..." -ForegroundColor Gray
    Push-Location $PSScriptRoot
    try {
        bun install
        Write-Success "Dependencies installed"
    }
    catch {
        Write-Error "Failed to install dependencies: $_"
    }
    finally {
        Pop-Location
    }
}
else {
    Write-Warning "Bun not installed, skipping dependency installation"
}

# Done
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "       Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Edit .env with your secrets"
Write-Host "  2. Run: bun run dev"
Write-Host ""
