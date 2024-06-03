#!/bin/bash

echo "Starting..."

cd frontend
echo "Installing frontend dependencies..."
npm install

cd ../backend/gateway
echo "Installing gateway dependencies..."
npm install

cd ../chat-service
echo "Installing chat-service dependencies..."
npm install

cd ../user-service
echo "Installing user-service dependencies..."
npm install