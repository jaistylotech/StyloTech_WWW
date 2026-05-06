#!/bin/bash
# Quick Setup Script for GitHub Actions Deployment
# This script helps verify your server is ready for automated deployment

echo "🔍 StyloTech Deployment Setup Checker"
echo "====================================="
echo ""

# Check Docker
echo "1️⃣  Checking Docker..."
if command -v docker &> /dev/null; then
    echo "   ✅ Docker is installed"
    docker --version
else
    echo "   ❌ Docker NOT installed"
    echo "   Run: curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh"
fi
echo ""

# Check Docker Compose
echo "2️⃣  Checking Docker Compose..."
if docker compose version &> /dev/null; then
    echo "   ✅ Docker Compose is installed"
    docker compose version
else
    echo "   ❌ Docker Compose NOT installed"
    echo "   Usually comes with Docker Desktop or: sudo apt install docker-compose"
fi
echo ""

# Check Nginx
echo "3️⃣  Checking Nginx..."
if command -v nginx &> /dev/null; then
    echo "   ✅ Nginx is installed"
    nginx -v
    if sudo systemctl is-active --quiet nginx; then
        echo "   ✅ Nginx is running"
    else
        echo "   ⚠️  Nginx is installed but not running"
        echo "   Run: sudo systemctl start nginx"
    fi
else
    echo "   ❌ Nginx NOT installed"
    echo "   Run: sudo apt-get install nginx -y"
fi
echo ""

# Check SSH
echo "4️⃣  Checking SSH..."
if [ -d ~/.ssh ]; then
    echo "   ✅ SSH directory exists"
    if [ -f ~/.ssh/authorized_keys ]; then
        echo "   ✅ authorized_keys file exists"
        echo "   Keys: $(wc -l < ~/.ssh/authorized_keys)"
    else
        echo "   ⚠️  authorized_keys file NOT found"
    fi
else
    echo "   ❌ SSH directory NOT found"
fi
echo ""

# Check Git
echo "5️⃣  Checking Git..."
if command -v git &> /dev/null; then
    echo "   ✅ Git is installed"
    git --version
    echo "   Current repo: $(git remote get-url origin 2>/dev/null || echo 'Not a git repo')"
else
    echo "   ❌ Git NOT installed"
    echo "   Run: sudo apt-get install git -y"
fi
echo ""

# Check Ports
echo "6️⃣  Checking Ports..."
if netstat -tlnp 2>/dev/null | grep -q ":8000 "; then
    echo "   ✅ Port 8000 (Django) is open"
else
    echo "   ⚠️  Port 8000 (Django) may not be accessible"
fi

if netstat -tlnp 2>/dev/null | grep -q ":80 "; then
    echo "   ✅ Port 80 (HTTP) is open"
else
    echo "   ⚠️  Port 80 (HTTP) may not be open"
fi
echo ""

# Check Project Directory
echo "7️⃣  Checking Project Directory..."
if [ -d ~/code/StyloTech_WWW-main ]; then
    echo "   ✅ Project directory exists"
    echo "   Location: ~/code/StyloTech_WWW-main"
    if [ -f ~/code/StyloTech_WWW-main/docker-compose.yml ]; then
        echo "   ✅ docker-compose.yml found"
    else
        echo "   ❌ docker-compose.yml NOT found"
    fi
    if [ -f ~/code/StyloTech_WWW-main/Dockerfile ]; then
        echo "   ✅ Dockerfile found"
    else
        echo "   ❌ Dockerfile NOT found"
    fi
else
    echo "   ❌ Project directory NOT found"
    echo "   Expected: ~/code/StyloTech_WWW-main"
fi
echo ""

# Summary
echo "📋 Setup Checklist:"
echo "===================="
echo ""
echo "Before GitHub Actions deployment, ensure:"
echo ""
echo "1. ✅ Add GitHub Secrets in your repository:"
echo "   - SERVER_HOST: Your server IP/domain"
echo "   - SERVER_USER: SSH username (usually 'vedx')"
echo "   - SERVER_SSH_KEY: Your private SSH key"
echo "   - DOCKER_USERNAME: (optional) Docker Hub username"
echo "   - DOCKER_PASSWORD: (optional) Docker Hub password"
echo ""
echo "2. ✅ SSH key is set up on the server:"
echo "   $ cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys"
echo ""
echo "3. ✅ Nginx configuration is in place:"
echo "   $ sudo cp nginx.conf /etc/nginx/sites-available/stylotech"
echo "   $ sudo ln -s /etc/nginx/sites-available/stylotech /etc/nginx/sites-enabled/"
echo "   $ sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "4. ✅ Docker and Docker Compose are working:"
echo "   $ docker --version && docker compose version"
echo ""
echo "5. ✅ All GitHub Actions secrets are configured"
echo ""
echo "6. ✅ Project is committed to git and pushed to main:"
echo "   $ git add . && git commit -m 'Add deployment' && git push origin main"
echo ""
echo "✅ Once ready, push to main branch to trigger automatic deployment!"
echo ""
