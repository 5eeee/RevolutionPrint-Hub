#!/bin/bash
echo "Starting RevolutionPrint Hub server..."
echo "====================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python is not installed or not in PATH"
    exit 1
fi

echo "Using Python command: $PYTHON_CMD"
echo "Starting server on http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

cd /workspace/src
$PYTHON_CMD -m http.server 8000