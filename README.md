# Affan Ahmer - Portfolio

This is a premium, high-performance personal portfolio website built with Next.js 15, React 19, and Tailwind CSS 4. It features a continuous smooth scroll experience (Lenis) and is heavily optimized for a flawless visual experience.

## Sections

| Section     | Description |
| ----------- | ----------- |
| Hero        | Full-screen video hero with sound unlock interaction and greeting. |
| About       | ID card interaction with pendulum physics and 3D hover effects. |
| Skills      | A "periodic table" grid with an interactive inspector panel. |
| Work        | Expanding accordion gallery showcasing projects. |
| Experience  | Vertical timeline highlighting education and professional journey. |
| Contact     | Final call to action with hopping letters and copy-to-clipboard email interaction. |

*Note: The "Certifications" and "Achievements" sections were dynamically omitted as per the provided résumé data.*

## How to run the site

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Rebuilding the Hero Video

To re-process the hero video assets, ensure you have Python and `ffmpeg` installed on your machine, along with the `numpy` package.

1. Place your source video at the root of the project named `intro.mp4`.
2. Run the script:
   ```bash
   python scripts/build-hero-assets.py
   ```
3. The script will automatically crop, whiten the background, create a seamless audio/video crossfade loop, and export both `hero.mp4` and `hero.webm` into the `public/hero/` folder. It will also generate `public/portrait-bust.webp` and `public/og.jpg`.

## Credits and Licenses

- **Tech Logos:** All technology logos displayed in the Skills section were sourced from [Devicon](https://devicon.dev/) (MIT License). They are served dynamically.
- **Fonts:** 
  - *Inter Tight* (OFL)
  - *Instrument Serif* (OFL)
  - *JetBrains Mono* (OFL)
  These are self-hosted via `next/font/local`.
- **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/) by Studio Freight.
