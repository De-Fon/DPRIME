Place De Fon's image here as `defon.jpg` (lowercase) so the Team grid will render it automatically.

Steps:

1. Download the attached image from the chat and save it as `defon.jpg`.
2. Move or copy it into this folder:

   mkdir -p public/images/team
   mv /path/to/defon.jpg public/images/team/defon.jpg

3. Restart the dev server if it's running:

   npm run dev

Notes:
- Preferred size: square (256×256 or 512×512) for best cropping.
- If using a remote image URL instead, add its host under `images.domains` (or `remotePatterns`) in `next.config.js`.

If you want, reply with the image file upload and I'll write it into this folder for you.