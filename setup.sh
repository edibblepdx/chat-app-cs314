#!/bin/bash

echo "Beginning Setup..."
npm run build

cd frontend
echo "Setting up the frontend environment variables..."
echo "PORT=3000" >> .env
echo "REACT_APP_CLIENT_ID=633524845603-7a67ggo47goj58blo8f5hfllkjoeb5ot.apps.googleusercontent.com" >> .env

cd ../backend/gateway

cd ../chat-service
echo "Setting up the chat-service environment variables..."
echo "PORT=8001" >> .env
echo "MONGO_URI=mongodb+srv://user0:b84m2PEGyN@cluster0.eoodq0j.mongodb.net/chat-service?retryWrites=true&w=majority&appName=Cluster0" >> .env
echo "JWT_SECRET=654321751984654" >> .env


cd ../user-service
echo "Setting up the user-service environment variables..."
echo "PORT=8002" >> .env
echo "MONGO_URI=mongodb+srv://user0:b84m2PEGyN@cluster0.eoodq0j.mongodb.net/user-service?retryWrites=true&w=majority&appName=Cluster0" >> .env
echo "JWT_SECRET=654321751984654" >> .env
echo "REDIRECT_URL=http://127.0.0.1:3000" >> .env
echo "MESSAGE_BROKER_URL=amqps://nupmjrzh:IGZLe-21XrenW3DZ8qF8trsi_6DJeIyL@woodpecker.rmq.cloudamqp.com/nupmjrzh" >> .env