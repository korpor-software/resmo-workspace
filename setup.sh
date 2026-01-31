#!/bin/bash
# ============================================
# Resmo Workspace Setup Script (Mac/Linux)
# ============================================
# This script clones all app repositories into the apps/ folder
# Run: chmod +x setup.sh && ./setup.sh

set -e

# Configuration - Change these to match your setup
GIT_HOST="${GIT_HOST:-github.com}"
GIT_ORG="${GIT_ORG:-your-org}"  # Change this to your GitHub organization/username
USE_HTTPS="${USE_HTTPS:-false}"

# Repository configuration
declare -A REPOS=(
    ["resmo-admin"]="admin"
    ["resmo-backend"]="backend"
    ["resmo-company"]="company"
    ["resmo-superadmin"]="superadmin"
    ["resmo-conseiller"]="conseiller"
)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Helper functions
step() { echo -e "\n${CYAN}>> $1${NC}"; }
success() { echo -e "   ${GREEN}[OK]${NC} $1"; }
warning() { echo -e "   ${YELLOW}[SKIP]${NC} $1"; }
error() { echo -e "   ${RED}[ERROR]${NC} $1"; }

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPS_DIR="$SCRIPT_DIR/apps"

# Header
echo ""
echo -e "${MAGENTA}============================================${NC}"
echo -e "${MAGENTA}       Resmo Workspace Setup${NC}"
echo -e "${MAGENTA}============================================${NC}"

# Check prerequisites
step "Checking prerequisites..."

if ! command -v git &> /dev/null; then
    error "Git is not installed. Please install Git first."
    exit 1
fi
success "Git is installed"

if ! command -v bun &> /dev/null; then
    echo -e "   ${YELLOW}[WARN]${NC} Bun is not installed. Install from: https://bun.sh"
else
    success "Bun is installed"
fi

# Create apps directory
step "Creating apps directory..."

if [ ! -d "$APPS_DIR" ]; then
    mkdir -p "$APPS_DIR"
    success "Created apps/ directory"
else
    success "apps/ directory already exists"
fi

# Clone repositories
step "Cloning repositories..."

for repo in "${!REPOS[@]}"; do
    folder="${REPOS[$repo]}"
    repo_path="$APPS_DIR/$folder"
    
    if [ -d "$repo_path" ]; then
        warning "$folder already exists, skipping..."
        continue
    fi
    
    # Build clone URL
    if [ "$USE_HTTPS" = "true" ]; then
        clone_url="https://$GIT_HOST/$GIT_ORG/$repo.git"
    else
        clone_url="git@$GIT_HOST:$GIT_ORG/$repo.git"
    fi
    
    echo -e "   Cloning $repo..."
    
    if git clone "$clone_url" "$repo_path" 2>/dev/null; then
        success "Cloned $repo -> apps/$folder"
    else
        error "Failed to clone $repo"
    fi
done

# Setup environment file
step "Setting up environment..."

if [ ! -f "$SCRIPT_DIR/.env" ]; then
    if [ -f "$SCRIPT_DIR/.env.example" ]; then
        cp "$SCRIPT_DIR/.env.example" "$SCRIPT_DIR/.env"
        success "Created .env from .env.example"
        echo -e "   ${YELLOW}[ACTION]${NC} Edit .env and add your secrets!"
    else
        warning ".env.example not found, skipping .env creation"
    fi
else
    success ".env already exists"
fi

# Install dependencies
step "Installing dependencies..."

if command -v bun &> /dev/null; then
    echo "   Running bun install..."
    cd "$SCRIPT_DIR"
    if bun install; then
        success "Dependencies installed"
    else
        error "Failed to install dependencies"
    fi
else
    warning "Bun not installed, skipping dependency installation"
fi

# Done
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}       Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  1. Edit .env with your secrets"
echo "  2. Run: bun run dev"
echo ""
