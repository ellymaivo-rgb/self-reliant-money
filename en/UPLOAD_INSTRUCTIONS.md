Upload instructions for GitHub web UI

If you prefer not to use git from the terminal, follow these steps to publish the English pages on GitHub Pages:

1) Go to the repository page on GitHub: https://github.com/ellymaivo-rgb/self-reliant-money
2) Make sure you are on the `main` branch (top-left branch selector).
3) Click "Add file" -> "Upload files".
4) Open the `en/` folder on your computer, select all files and folders inside it, then drag-and-drop into the GitHub upload area.
   - If your browser won't accept a folder drag, select all files inside the folder and drag them.
5) In "Commit changes" choose "Commit directly to the main branch" and set a short commit message, e.g. `Add English pages (en/)`.
6) Click "Commit changes".

Notes:
- I have already updated the English HTML files in this copy so that they reference `/styles/main.css` and `/scripts/main.js` (absolute paths). That ensures the site will load the existing CSS and JS on the site after you upload.
- If you also see a file `.github/workflows/deploy-pages.yml` in your local copy, upload it too so GitHub Actions can deploy Pages automatically (not strictly required if you only use default Pages settings).

After you commit, wait ~30–90 seconds and then open:
https://ellymaivo-rgb.github.io/self-reliant-money/en/

If you still see a 404 after a minute, go to the repository "Actions" tab and look for a Pages/build job; if it failed paste the log or a screenshot here and I'll read it and tell you the fix.

When you finish the upload, reply "done" and I'll verify the site and test language toggling.