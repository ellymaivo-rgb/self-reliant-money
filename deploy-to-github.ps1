#!/usr/bin/env pwsh
# GitHub Pages Deployment Script for Vietnamese Finance Education Website

Write-Host "🚀 Vietnamese Finance Education Website - GitHub Pages Deployment" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "index.html")) {
    Write-Host "❌ Error: index.html not found. Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Git repository not initialized. Please run 'git init' first." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check if GitHub CLI is available
try {
    $ghVersion = gh --version
    Write-Host "✅ GitHub CLI found: $($ghVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "   Run: winget install --id GitHub.cli" -ForegroundColor Yellow
    exit 1
}

# Check authentication status
try {
    $authStatus = gh auth status 2>&1
    if ($authStatus -match "Logged in") {
        Write-Host "✅ GitHub authentication verified" -ForegroundColor Green
    } else {
        Write-Host "❌ Not authenticated with GitHub" -ForegroundColor Red
        Write-Host "🔐 Starting GitHub authentication..." -ForegroundColor Yellow
        gh auth login
    }
} catch {
    Write-Host "🔐 Starting GitHub authentication..." -ForegroundColor Yellow
    gh auth login
}

# Repository settings
$repoName = "vietnamese-finance-education"
$description = "Vietnamese Finance Education Website for couples aged 28-35 - Safe wealth building strategies"

Write-Host "📦 Creating GitHub repository: $repoName" -ForegroundColor Yellow

# Create repository
try {
    gh repo create $repoName --public --description $description --source=. --remote=origin --push
    Write-Host "✅ Repository created successfully!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Repository might already exist. Trying to add remote..." -ForegroundColor Yellow
    try {
        git remote add origin "https://github.com/$(gh api user --jq .login)/$repoName.git"
        git branch -M main
        git push -u origin main
        Write-Host "✅ Code pushed to existing repository!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to push to repository. Error: $_" -ForegroundColor Red
        exit 1
    }
}

# Enable GitHub Pages
Write-Host "🌐 Enabling GitHub Pages..." -ForegroundColor Yellow
try {
    gh api repos/:owner/$repoName/pages -f source="{"branch":"main","path":"/"}" --method POST
    Write-Host "✅ GitHub Pages enabled!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  GitHub Pages might already be enabled or needs manual setup" -ForegroundColor Yellow
}

# Get repository info
$username = gh api user --jq .login
$repoUrl = "https://github.com/$username/$repoName"
$siteUrl = "https://$username.github.io/$repoName"

Write-Host ""
Write-Host "🎉 SUCCESS! Your Vietnamese Finance Education website is being deployed!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host "📍 Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host "🌐 Website URL: $siteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  Deployment usually takes 5-10 minutes for the first time." -ForegroundColor Yellow
Write-Host "📊 Check deployment status: $repoUrl/actions" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎯 Your website is now live and ready to help Vietnamese couples build wealth!" -ForegroundColor Green
Write-Host ""

# Open URLs in browser
$openBrowser = Read-Host "🌐 Would you like to open the repository and website in your browser? (y/n)"
if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
    Start-Process $repoUrl
    Write-Host "⏳ Waiting 10 seconds before opening website (to allow initial deployment)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    Start-Process $siteUrl
}

Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Magenta
Write-Host "   1. Share your website URL with Vietnamese couples" -ForegroundColor White
Write-Host "   2. Monitor usage in GitHub repository insights" -ForegroundColor White
Write-Host "   3. Add Google Analytics for detailed tracking" -ForegroundColor White
Write-Host "   4. Collect feedback and improve content" -ForegroundColor White
Write-Host ""
Write-Host "✨ Happy teaching financial literacy! ✨" -ForegroundColor Green