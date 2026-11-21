# 6b6t_hack Website

A static responsive website for the 6b6t_hack client.

## Files
- `index.html` — website structure
- `styles.css` — responsive styling
- `script.js` — server status and player lookup
- `assets/favicon.svg` — site icon

## Run locally
Open `index.html` in a modern browser. The live status panel needs an internet connection.

## Publish with GitHub Pages
1. Create a GitHub repository for the website (or use a separate `gh-pages` branch).
2. Upload all files and folders from this ZIP. Keep `index.html` at the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the branch containing these files and choose `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site.

## Data notes
- Server online count uses the public `api.mcstatus.io` Java server status endpoint for `6b6t.org`. If that service is unavailable, the page shows an unavailable state and links to the official 6b6t status page.
- Player lookup opens the 6b6t stats profile route for the entered username. The website does not estimate or invent a player's join date or playtime. If the official site changes its profile URL structure, update the `profileUrl` line in `script.js`.
- The JAR download points to the GitHub release URL supplied by the site owner. This website does not independently verify the JAR's safety or compatibility.

## Project identity
This is an unofficial community project and is not affiliated with or endorsed by 6b6t.
