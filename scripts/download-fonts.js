const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS = [
  { name: 'Inter_Tight', url: 'https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap' },
  { name: 'Instrument_Serif', url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap' },
  { name: 'JetBrains_Mono', url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap' }
];

const dir = path.join(__dirname, '../src/fonts');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadFonts() {
  for (const font of FONTS) {
    const css = await fetch(font.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36' }
    }).then(r => r.text());
    
    // Simple regex to grab the first woff2 URL
    const match = css.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (match) {
      const fontUrl = match[1];
      const fontPath = path.join(dir, `${font.name}.woff2`);
      const response = await fetch(fontUrl);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(fontPath, Buffer.from(buffer));
      console.log(`Downloaded ${font.name}.woff2`);
    }
  }
}

downloadFonts();
