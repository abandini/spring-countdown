#!/bin/bash
# Spring Countdown - Environment Initialization Script
# Run this at the start of each development session

set -e

echo "🌸 Spring Countdown - Environment Check"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check Wrangler
if command -v wrangler &> /dev/null; then
    WRANGLER_VERSION=$(wrangler --version 2>/dev/null | head -1)
    echo -e "${GREEN}✓${NC} Wrangler: $WRANGLER_VERSION"
else
    echo -e "${YELLOW}!${NC} Wrangler not found globally, checking local..."
    if [ -f "node_modules/.bin/wrangler" ]; then
        echo -e "${GREEN}✓${NC} Wrangler available via npx"
    else
        echo -e "${YELLOW}!${NC} Will install wrangler with npm install"
    fi
fi

# Check if package.json exists
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"

    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo ""
        echo "📦 Installing dependencies..."
        npm install
    else
        echo -e "${GREEN}✓${NC} node_modules exists"
    fi
else
    echo -e "${YELLOW}!${NC} package.json not found - project not yet scaffolded"
fi

# Check wrangler.toml
if [ -f "wrangler.toml" ]; then
    echo -e "${GREEN}✓${NC} wrangler.toml found"
else
    echo -e "${YELLOW}!${NC} wrangler.toml not found - Cloudflare config needed"
fi

# Check for tracking files
echo ""
echo "📋 Project Tracking Files:"
if [ -f "feature-list.json" ]; then
    TOTAL=$(cat feature-list.json | grep -o '"total":' | wc -l)
    PASSING=$(cat feature-list.json | grep -c '"passes": true' 2>/dev/null || echo "0")
    FAILING=$(cat feature-list.json | grep -c '"passes": false' 2>/dev/null || echo "0")
    echo -e "${GREEN}✓${NC} feature-list.json (${PASSING} passing / ${FAILING} failing)"
else
    echo -e "${RED}✗${NC} feature-list.json missing!"
fi

if [ -f "claude-progress.txt" ]; then
    echo -e "${GREEN}✓${NC} claude-progress.txt"
else
    echo -e "${RED}✗${NC} claude-progress.txt missing!"
fi

# Git status
echo ""
echo "📂 Git Status:"
if [ -d ".git" ]; then
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
    echo -e "${GREEN}✓${NC} Git repo on branch: $BRANCH"
    if [ "$CHANGES" -gt 0 ]; then
        echo -e "${YELLOW}!${NC} $CHANGES uncommitted changes"
    else
        echo -e "${GREEN}✓${NC} Working tree clean"
    fi
else
    echo -e "${YELLOW}!${NC} Not a git repository"
fi

echo ""
echo "========================================"
echo "🌞 Ready to bring on the sunshine!"
echo ""
