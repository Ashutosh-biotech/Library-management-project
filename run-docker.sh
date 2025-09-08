#!/bin/bash

echo "🚀 Starting Library Management System with Docker..."

# Build and start all services
docker-compose up --build -d

echo "✅ Services started successfully!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8080"
echo "   MongoDB:  localhost:27017"
echo ""
echo "🔧 Useful commands:"
echo "   View logs:     docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart:       docker-compose restart"