
# AI Letter 3D — Ready-to-upload Next.js project

This is a single-page Next.js project (pages router) that contains a 3D interactive intro built with React Three Fiber and Framer Motion.

What is included:
- 3D intro text and three 3D cards (Birthday, Love, Marriage)
- A stylized 3D "girl" avatar built from primitives (spheres/cylinders) animated to push the intro text
- Language selection and actor selection overlays in 3D space
- Placeholder avatar head images in `public/images/` (stylized AI-inspired faces)
- Clear instructions to run locally and deploy to Vercel/Netlify

Important:
- This project uses **stylized**, fictional avatars — NOT real celebrity likenesses.
- To run the project you need Node.js (18+ recommended).

How to run locally:
1. Extract the zip.
2. In project root, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

Deploy:
- Push to GitHub and connect to Vercel (recommended) or Netlify.

If you want, I can later:
- Replace placeholder head images with higher-resolution AI renders
- Integrate TTS or video APIs (requires API keys)
