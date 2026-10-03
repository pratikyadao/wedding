import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Read config.js to inject real values into the static HTML for WhatsApp/Social scrapers
const configPath = path.resolve(import.meta.dirname, 'src/data/config.js');
let siteTitle = "Our Wedding";
let siteDesc = "Join us in celebrating our wedding!";
let siteUrl = "https://our-wedding-invite.vercel.app";

try {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const groomMatch = configContent.match(/groomName:\s*"([^"]+)"/);
  const brideMatch = configContent.match(/brideName:\s*"([^"]+)"/);
  const urlMatch = configContent.match(/url:\s*"([^"]+)"/);
  const textMatch = configContent.match(/text:\s*"([^"]+)"/);

  const groomName = groomMatch ? groomMatch[1] : 'Groom';
  const brideName = brideMatch ? brideMatch[1] : 'Bride';
  
  if (urlMatch) siteUrl = urlMatch[1];
  if (textMatch) siteDesc = textMatch[1];
  siteTitle = `${brideName} & ${groomName} — Our Wedding`;
} catch (e) {
  console.warn("Could not read config.js for HTML injection, using defaults.");
}

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html
        .replace(/{{TITLE}}/g, siteTitle)
        .replace(/{{DESC}}/g, siteDesc)
        .replace(/{{URL}}/g, siteUrl);
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    htmlPlugin(),
  ],
})
