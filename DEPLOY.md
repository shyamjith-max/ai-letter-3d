## Deploying to Vercel
1. Push this repo to GitHub.
2. Import the repo in Vercel (vercel.com) and deploy (Framework: Next.js).
3. Set environment variables if you later integrate TTS or video APIs.

Note: Tailwind is referenced in CSS, but not installed. If you want Tailwind utility classes, run:
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
and follow Tailwind setup.

