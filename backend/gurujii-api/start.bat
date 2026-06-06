@echo off
echo ========================================
echo Starting Gurujii API Server
echo ========================================
echo.

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    py -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.

REM Install dependencies
echo Installing dependencies...
pip install -q -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu
echo.

REM Create directories
if not exist static\audio mkdir static\audio

REM Start the server
echo ========================================
echo Gurujii API Server Starting...
echo Server will be available at: http://localhost:5000
echo ========================================
echo.
echo Note: First run will download AI models (~2GB)
echo This may take 10-15 minutes...
echo.

py app.py

pause
