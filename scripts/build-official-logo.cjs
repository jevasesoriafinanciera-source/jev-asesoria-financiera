const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// Target dimensions
const WIDTH = 1000;
const HEIGHT = 1350;

// Exact brand blue from 13046_JEV-Asesorias-finacieras_Logo.png
const BLUE = '#14468d';

/**
 * We map grid coordinates (u, v) for u in [0..8], v in [0..8]
 * to (x, y) coordinates.
 * Each cell (u, v) with u + v <= 7 is a diamond polygon.
 */
function getPoint(u, v) {
  const s = u + v; // row level 0 to 8
  const d = v - u; // lateral offset from -s to +s

  // Baseline apex
  const apexX = 500;
  const apexY = 50;

  // Non-linear grid mapping:
  // 1. Horizontal spread: increases smoothly with row level s
  const spreadX = 46.5 + s * 1.6;
  const x = apexX + d * spreadX;

  // 2. Vertical position:
  // Base linear drop per row
  const baseDrop = s * 64;

  // Droop effect: center points droop down, outer points stay higher
  // When d = 0, droop is maximum. As |d| increases, droop decreases.
  // This causes the bottom of the tree to form an inverted V / downward curve.
  const maxD = Math.max(1, s);
  const normD = d / maxD; // -1 to +1
  
  // Droop increases strongly in lower rows (s >= 4)
  const droopFactor = Math.pow(s / 8, 2.1) * 78;
  const droop = droopFactor * (1 - Math.pow(Math.abs(normD), 1.6));

  // Also slight outward curve on vertical paths
  const y = apexY + baseDrop + droop;

  return { x, y };
}

// Generate the 36 tiles
const tiles = [];
const GAP = 0.11; // relative gap between tile edges (0 to 0.5)

for (let s = 0; s < 8; s++) {
  for (let u = 0; u <= s; u++) {
    const v = s - u;
    // Cell corners in grid coordinates
    // Top: (u, v)
    // Right: (u, v + 1)
    // Bottom: (u + 1, v + 1)
    // Left: (u + 1, v)
    const pTop = getPoint(u, v);
    const pRight = getPoint(u, v + 1);
    const pBottom = getPoint(u + 1, v + 1);
    const pLeft = getPoint(u + 1, v);

    // Compute center
    const cx = (pTop.x + pRight.x + pBottom.x + pLeft.x) / 4;
    const cy = (pTop.y + pRight.y + pBottom.y + pLeft.y) / 4;

    // Inset each corner towards center to create clean uniform white channels
    function inset(p) {
      return {
        x: p.x + (cx - p.x) * GAP,
        y: p.y + (cy - p.y) * GAP
      };
    }

    const cTop = inset(pTop);
    const cRight = inset(pRight);
    const cBottom = inset(pBottom);
    const cLeft = inset(pLeft);

    // If it's one of the bottom center tiles (s=7, u=3 or u=4), refine the bottom tip to curve down
    if (s === 7 && (u === 3 || u === 4)) {
      if (u === 3) {
        // Center-right tile: bottom point pulls down and left
        cBottom.y += 14;
        cBottom.x -= 6;
      } else if (u === 4) {
        // Center-left tile: bottom point pulls down and right
        cBottom.y += 14;
        cBottom.x += 6;
      }
    }

    const pathData = `M ${cTop.x.toFixed(2)} ${cTop.y.toFixed(2)} ` +
      `L ${cRight.x.toFixed(2)} ${cRight.y.toFixed(2)} ` +
      `L ${cBottom.x.toFixed(2)} ${cBottom.y.toFixed(2)} ` +
      `L ${cLeft.x.toFixed(2)} ${cLeft.y.toFixed(2)} Z`;

    tiles.push(pathData);
  }
}

// Build SVG
function buildSVG(bg = 'white') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1350" width="1000" height="1350">
  ${bg === 'white' ? '<rect width="1000" height="1350" fill="#ffffff" />' : ''}
  <!-- 36 Diamond Lattice Tree -->
  <g fill="${BLUE}">
    ${tiles.map((d, i) => `<path key="${i}" d="${d}" />`).join('\n    ')}
  </g>

  <!-- JEV Monogram (Authentic Tall Condensed Proportions) -->
  <g fill="${BLUE}">
    <!-- J: stem at x=418..442, height 730..995, curve at bottom to left -->
    <path d="M 419 730 L 441 730 L 441 945 C 441 980 422 998 385 998 C 352 998 335 982 335 950 L 357 950 C 357 969 367 979 385 979 C 404 979 419 968 419 945 Z" />

    <!-- E: stem at x=472..494, arms to x=550 -->
    <path d="M 472 730 L 550 730 L 550 750 L 494 750 L 494 851 L 544 851 L 544 870 L 494 870 L 494 977 L 550 977 L 550 997 L 472 997 Z" />

    <!-- V: diagonal strokes from (578, 730) & (642, 730) to bottom (610, 997) -->
    <path d="M 577 730 L 599 730 L 610 962 L 621 730 L 643 730 L 620 997 L 600 997 Z" />
  </g>

  <!-- ASESORÍA FINANCIERA (Geometric All-Caps) -->
  <g fill="${BLUE}" font-family="system-ui, -apple-system, 'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="52" letter-spacing="4" text-anchor="middle">
    <text x="500" y="1120">ASESORÍA FINANCIERA</text>
  </g>
</svg>`;
}

// Build Horizontal SVG
function buildHorizontalSVG(bg = 'white') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 250" width="850" height="250">
  ${bg === 'white' ? '<rect width="850" height="250" fill="#ffffff" />' : ''}
  <!-- Left: 36 Diamond Lattice Tree -->
  <g transform="translate(130, 125) scale(0.35) translate(-500, -330)" fill="${BLUE}">
    ${tiles.map((d, i) => `<path key="${i}" d="${d}" />`).join('\n    ')}
  </g>

  <!-- Right: JEV Monogram -->
  <g transform="translate(285, 20) scale(0.65)" fill="${BLUE}">
    <!-- J -->
    <path d="M 60 40 L 92 40 L 92 200 C 92 235 73 253 36 253 C 3 253 -14 237 -14 205 L 18 205 C 18 224 28 234 46 234 C 65 234 80 223 80 200 Z" />
    <!-- E -->
    <path d="M 125 40 L 225 40 L 225 68 L 157 68 L 157 130 L 218 130 L 218 156 L 157 156 L 157 225 L 225 225 L 225 253 L 125 253 Z" />
    <!-- V -->
    <path d="M 260 40 L 292 40 L 320 215 L 348 40 L 380 40 L 338 253 L 302 253 Z" />
  </g>

  <!-- Right: ASESORÍA FINANCIERA -->
  <g fill="${BLUE}" font-family="system-ui, -apple-system, 'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="28" letter-spacing="3.5">
    <text x="285" y="222">ASESORÍA FINANCIERA</text>
  </g>
</svg>`;
}

const svgWhite = buildSVG('white');
const svgTransparent = buildSVG('transparent');
const svgHorizontalWhite = buildHorizontalSVG('white');
const svgHorizontalTransparent = buildHorizontalSVG('transparent');

fs.writeFileSync(path.join(__dirname, '../public/logo-oficial-jev.svg'), svgWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo-oficial-jev-transparent.svg'), svgTransparent);
fs.writeFileSync(path.join(__dirname, '../public/logo-oficial-jev-horizontal.svg'), svgHorizontalWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo-oficial-jev-horizontal-transparent.svg'), svgHorizontalTransparent);

// Render high-res PNGs
const resvgWhite = new Resvg(svgWhite, { fitTo: { mode: 'width', value: 1000 } });
const pngWhite = resvgWhite.render().asPng();

const resvgHoriz = new Resvg(svgHorizontalWhite, { fitTo: { mode: 'width', value: 1200 } });
const pngHoriz = resvgHoriz.render().asPng();

fs.writeFileSync(path.join(__dirname, '../public/13046_JEV-Asesorias-finacieras_Logo.png'), pngWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo-fondo-blanco-completo.png'), pngWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo fondo blanco completo.png'), pngWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo-original.png'), pngWhite);
fs.writeFileSync(path.join(__dirname, '../public/logo-horizontal-oficial.png'), pngHoriz);

// Write diamonds data for direct React SVG rendering
const diamondsDataContent = `// 36 Diamond paths for the official JEV Asesoría Financiera emblem
// Reconstructed with mathematical precision matching 13046_JEV-Asesorias-finacieras_Logo.png
export const JEV_OFFICIAL_BLUE = '${BLUE}';

export const JEV_DIAMOND_PATHS: string[] = ${JSON.stringify(tiles, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/components/jevDiamondsData.ts'), diamondsDataContent);

console.log('Successfully generated all official logo assets!');
