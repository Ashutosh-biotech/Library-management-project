# Docker Setup for Library Management System

## 🐳 Docker Configuration Complete

The Library Management System is now fully containerized with Docker and Docker Compose.

## 📦 Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| Frontend | library-frontend | 3000 | React app with Nginx |
| Backend | library-backend | 8080 | Spring Boot API |
| Database | library-mongodb | 27017 | MongoDB database |

## 🚀 Quick Start

```bash
# Start all services
./run-docker.sh

# Or manually
docker-compose up --build -d
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **MongoDB**: localhost:27017

## 🔧 Docker Commands

```bash
# View running containers
docker ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Rebuild and start
docker-compose up --build
```

## 📁 Docker Files

- `backend/Dockerfile` - Spring Boot containerization
- `frontend/Dockerfile` - React multi-stage build with Nginx
- `docker-compose.yml` - Service orchestration
- `run-docker.sh` - Easy startup script

## ✅ Features

- **Multi-stage builds** for optimized images
- **Persistent MongoDB data** with Docker volumes
- **Network isolation** with custom Docker network
- **Environment variables** for configuration
- **Production-ready** Nginx serving for React app

## 🛠️ Troubleshooting

If services fail to start:
1. Check logs: `docker-compose logs`
2. Rebuild: `docker-compose up --build`
3. Clean restart: `docker-compose down && docker-compose up --build`