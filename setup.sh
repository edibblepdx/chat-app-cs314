#!/bin/bash

echo "Beginning Setup..."
npm run build

cd frontend
echo "Setting up the frontend environment variables..."
echo "PORT=3000" >> .env
echo "REACT_APP_CLIENT_ID=" >> .env

cd ../backend/gateway

cd ../chat-service
echo "Setting up the chat-service environment variables..."
echo "PORT=8001" >> .env
echo "MONGO_URI=" >> .env
echo "JWT_SECRET=" >> .env


cd ../user-service
echo "Setting up the user-service environment variables..."
echo "PORT=8002" >> .env
echo "MONGO_URI=" >> .env
echo "JWT_SECRET=" >> .env
echo "REDIRECT_URL=" >> .env
echo "MESSAGE_BROKER_URL=" >> .env
