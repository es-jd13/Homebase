# Homebase

Turns an **iPad mini 3** into an Apple HomeView–style smart display with a speaker-base look.
Plain HTML/CSS/JS (ES5, no build step) so it runs on iOS 12 Safari and on GitHub Pages.

## Deploy on GitHub Pages
1. Create a repo (e.g. `homebase`) and push these files to the root of `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Open `https://<you>.github.io/homebase/` on the iPad.

All paths are relative, so it works under a project subpath or a user site.

## On the iPad
- Safari → Share → **Add to Home Screen**, then launch from the icon (full screen).
- Settings → Display & Brightness → Auto-Lock → **Never**; keep it plugged in.
- Optional kiosk: triple-click Home to start Guided Access.

## Home Screen, lock screen, wallpaper
- Tiles open the **real installed apps** through their URL schemes (`spotify://`, `music://`, `youtube://`, …). Tap **Edit** (or long-press a tile) to add, remove, rename, recolor and reorder apps, or add a **Custom** app with any scheme or web link. Swipe for more pages.
- Each tile can use your own icon image. Apple's iOS icon artwork and other brands' logos are not bundled.
- Some apps use unusual schemes or don't allow opening this way; use Custom with the right link.
- Settings → **Wallpaper** and **Lock screen wallpaper** (presets or your own photo). Homebase starts on the lock screen (swipe up) and re-locks after 2 idle minutes.

## Now Playing (shows what's playing in other apps)
Web pages on iOS can't read the system Now Playing, so Homebase reads it from the service itself. Open **Music → Set up**:
- **Spotify** – create a free app at developer.spotify.com/dashboard, add your site URL (e.g. `https://you.github.io/homebase/`) as a Redirect URI, paste the Client ID, tap Connect. Uses PKCE, so no secret or server. Play/pause/skip needs Spotify Premium.
- **Last.fm** – username + API key; works with Apple Music and most apps that scrobble. Display only.
If the login bounces between Safari and the Home Screen app, connect in whichever one you'll use for Homebase (they don't share storage on iOS 12).

## Notes
- Icons are original glass-style artwork (Apple's own app icons are copyrighted). Smart-home tiles are simulated; a web page can't control real HomeKit devices.
- Not affiliated with Apple.
