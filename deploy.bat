@echo off
echo.
echo =================================================================
echo Vietnamese Finance Education Website - GitHub Pages Deployment
echo =================================================================
echo.

echo Step 1: Authenticating with GitHub...
gh auth login

echo.
echo Step 2: Creating repository and pushing code...
gh repo create vietnamese-finance-education --public --description "Vietnamese Finance Education Website for couples aged 28-35" --source=. --remote=origin --push

echo.
echo Step 3: Getting repository info...
for /f "tokens=*" %%i in ('gh api user --jq .login') do set USERNAME=%%i

echo.
echo =================================================================
echo SUCCESS! Your website is being deployed!
echo =================================================================
echo Repository: https://github.com/%USERNAME%/vietnamese-finance-education
echo Website URL: https://%USERNAME%.github.io/vietnamese-finance-education
echo.
echo Deployment takes 5-10 minutes. Check status in the Actions tab.
echo Your Vietnamese Finance Education website will be live soon!
echo.

start https://github.com/%USERNAME%/vietnamese-finance-education

pause