#!/bin/bash

function sigint_handler()
{
    echo "Stopping..."
    for pid in "${pids[@]}"; do
        kill -SIGINT $pid
    done
    exit
}

declare -a pids=()

trap sigint_handler SIGINT

echo "Starting..."

cd frontend
echo "Starting frontend in background..."
npm start &

cd ../backend/gateway
echo "Starting gateway in background..."
npm start &

cd ../chat-service
echo "Starting chat service in background..."
npm start &

cd ../user-service
echo "Starting user service in background..."
npm start &

sleep 5
echo "All services started."
echo "Press Ctrl+C to stop."

wait
