# GitHub Actions Deployment Guide

This guide explains how to set up automatic deployment for StyloTech to the main branch using GitHub Actions.

## ✅ Setup Steps

### 1. **Add GitHub Secrets**

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SERVER_HOST` | Your server's IP or domain | `192.168.0.113` or `deploy.example.com` |
| `SERVER_USER` | SSH username | `vedx` |
| `SERVER_SSH_KEY` | SSH private key | (your private key content) |
| `DOCKER_USERNAME` | Docker Hub username (optional) | `yourusername` |
| `DOCKER_PASSWORD` | Docker Hub password (optional) | (your docker password/token) |

### 2. **Generate SSH Key (if you don't have one)**

On your server:
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy
```

Copy the entire content of `~/.ssh/github_deploy` and add it as `SERVER_SSH_KEY` secret in GitHub.

### 3. **Ensure Docker & Docker Compose are installed on server**

```bash
# Check if Docker is installed
docker --version
docker compose version

# If not, install:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker vedx  # Add user to docker group
```

### 4. **Ensure Nginx is installed (if using Nginx)**

```bash
sudo apt-get update
sudo apt-get install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5. **Copy Nginx Configuration**

```bash
# Copy nginx configuration to server
sudo cp nginx.conf /etc/nginx/sites-available/stylotech

# Enable the site
sudo ln -s /etc/nginx/sites-available/stylotech /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## 🚀 How the Deployment Works

### Trigger
- Deployment is triggered automatically when you **push to the `main` branch**

### Workflow Steps

1. **Checkout Code**
   - GitHub Actions checks out your code from the main branch

2. **Docker Setup**
   - Sets up Docker Buildx for building images
   - Logs into Docker Hub (if using)

3. **Deploy via SSH**
   - Connects to your server via SSH
   - Pulls latest code from main branch
   - Runs `docker compose pull`
   - Stops old containers with `docker compose down`
   - Builds and starts new containers with `docker compose up -d --build`
   - Waits 5 seconds for services to start
   - Displays container status and logs

4. **Configure Nginx**
   - Checks if Nginx config exists
   - Creates/updates Nginx configuration
   - Tests the configuration with `sudo nginx -t`
   - Reloads Nginx with `sudo systemctl reload nginx`

5. **Health Check**
   - Performs up to 10 health checks (with 5-second intervals)
   - Verifies the application is responding at `http://127.0.0.1:8000/`
   - Fails if application doesn't respond after 50 seconds

6. **Notifications**
   - Shows success or failure message with timestamp and server details
   - On failure, displays Docker logs for debugging

## 📋 Deployment Flow Diagram

```
Developer pushes to main
         ↓
GitHub Actions triggered
         ↓
SSH connect to server
         ↓
Pull code from git
         ↓
docker compose down (old)
         ↓
docker compose up -d (new)
         ↓
Configure Nginx
         ↓
Health checks
         ↓
✅ Success / ❌ Failure
```

## 🔧 Manual Deployment (without GitHub Actions)

If you need to deploy manually:

```bash
cd /home/vedx/code/StyloTech_WWW-main

# Pull latest code
git pull origin main

# Pull Docker images
docker compose pull

# Rebuild and restart
docker compose down
docker compose up -d --build

# Check status
docker compose ps
docker compose logs --tail 20

# Reload Nginx
sudo systemctl reload nginx
```

## 📊 View Deployment Status

In GitHub:
1. Go to your repository
2. Click on "Actions" tab
3. Click on your latest workflow run
4. View logs of each step

## 🐛 Troubleshooting

### SSH Connection Failed
- Verify `SERVER_HOST`, `SERVER_USER`, and `SERVER_SSH_KEY` are correct
- Test SSH manually: `ssh -i your_key vedx@192.168.0.113`

### Docker Compose Command Not Found
- Ensure `docker compose` is installed (not `docker-compose`)
- Check: `docker compose version`

### Nginx Configuration Error
- Check manually: `sudo nginx -t`
- View errors: `sudo journalctl -u nginx -n 50`

### Application Health Check Fails
- Check Docker logs: `docker compose logs --tail 50`
- Verify port 8000 is open: `netstat -tlnp | grep 8000`

### Static Files Still 404
- Ensure WhiteNoise is installed: check `requirements.txt`
- Restart containers: `docker compose restart`

## 🔐 Security Best Practices

1. **Use SSH keys instead of passwords**
2. **Restrict SSH key permissions**: `chmod 600 ~/.ssh/github_deploy`
3. **Use a dedicated deploy user** (optional)
4. **Enable branch protection** on main branch
5. **Use HTTPS/SSL** for production (add SSL cert to Nginx)
6. **Store secrets securely** in GitHub Secrets (not in code)

## 📝 Notes

- Deployment takes approximately 1-2 minutes
- Check GitHub Actions logs if deployment fails
- Nginx auto-configuration uses `localhost:8000` as upstream
- Database migrations are not run automatically (add step if needed)
- Static files are served by WhiteNoise middleware in the app
- Logs are captured and displayed for debugging
