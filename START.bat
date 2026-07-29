@echo off
echo ==================================
echo Certificate Generation System
echo ==================================
echo.
echo Starting Backend...
start cmd /k "cd backend && npm run dev"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Application Starting in separate windows!
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:5173
echo.
echo 📝 Next Steps:
echo   1. Open http://localhost:5173 in your browser
echo   2. Register as an organizer
echo   3. Create an event
echo   4. Upload sample_participants.csv
echo   5. Generate certificates!
echo.
echo Close the new terminal windows to stop the servers.
pause
