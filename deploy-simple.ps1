# GitHub Pages Deployment Script for Vietnamese Finance Education Website

Write-Host "🚀 Vietnamese Finance Education Website - GitHub Pages Deployment" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Repository settings
$repoName = "vietnamese-finance-education"
$description = "Vietnamese Finance Education Website for couples aged 28-35 - Safe wealth building strategies"

Write-Host "📋 Step 1: Authenticating with GitHub..." -ForegroundColor Yellow
gh auth login

Write-Host "📦 Step 2: Creating GitHub repository..." -ForegroundColor Yellow
gh repo create $repoName --public --description $description --source=. --remote=origin --push

Write-Host "🌐 Step 3: Enabling GitHub Pages..." -ForegroundColor Yellow
# GitHub Pages will be enabled automatically with the workflow file we created

# Get repository info
$username = gh api user --jq .login
$repoUrl = "https://github.com/$username/$repoName"
$siteUrl = "https://$username.github.io/$repoName"

Write-Host ""
Write-Host "🎉 SUCCESS! Your website is being deployed!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host "📍 Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host "🌐 Website URL: $siteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  Deployment takes 5-10 minutes. Check status at: $repoUrl/actions" -ForegroundColor Yellow
Write-Host "🎯 Your Vietnamese Finance Education website will be live soon!" -ForegroundColor Green

# Open browser
Start-Process $repoUrl