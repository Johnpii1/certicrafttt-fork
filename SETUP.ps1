Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Setting up CertiCraft System..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
cd backend
npm install
cd ..
Write-Host "✅ Backend dependencies installed." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
cd frontend
npm install
cd ..
Write-Host "✅ Frontend dependencies installed." -ForegroundColor Green
Write-Host ""

Write-Host "🗄️ Setting up Database..." -ForegroundColor Yellow
cd backend
Write-Host "Creating Database 'certificate_system' if not exists..." -ForegroundColor White
node create-db.js
Write-Host "Running Database Migrations..." -ForegroundColor White
npm run migrate
cd ..
Write-Host "✅ Database setup complete." -ForegroundColor Green
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "You can now run '.\START.ps1' to start the servers." -ForegroundColor White
Write-Host "==================================" -ForegroundColor Cyan
