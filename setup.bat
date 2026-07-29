@echo off
echo ==================================
echo Setting up CertiCraft System...
echo ==================================
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
cd ..
echo Backend dependencies installed.
echo.

echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..
echo Frontend dependencies installed.
echo.

echo Setting up Database...
cd backend
echo Creating Database 'certificate_system' if not exists...
node create-db.js
echo Running Database Migrations...
call npm run migrate
cd ..
echo Database setup complete.
echo.

echo ==================================
echo Setup Complete!
echo You can now run START.ps1 to start the servers.
echo ==================================
pause
