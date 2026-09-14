const fs = require('fs');

function createRhombus(cx, cy, w, h, angle = 0) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  
  const pts = [
    { x: 0, y: -h },
    { x: w, y: 0 },
    { x: 0, y: h },
    { x: -w, y: 0 }
  ];
  
  const rotated = pts.map(p => ({
    x: +(cx + p.x * cos - p.y * sin).toFixed(2),
    y: +(cy + p.x * sin + p.y * cos).toFixed(2)
  }));
  
  return `M ${rotated[0].x} ${rotated[0].y} L ${rotated[1].x} ${rotated[1].y} L ${rotated[2].x} ${rotated[2].y} L ${rotated[3].x} ${rotated[3].y} Z`;
}

function getDiamondPaths(cx = 250, startY = 60) {
  const w = 18;
  const h = 25;
  const factor = 0.22;
  const gapX = w * (1 + factor);
  const gapY = h * (1 + factor);

  const paths = [];

  // Rows 0 to 6
  for (let r = 0; r <= 6; r++) {
    const count = r + 1;
    const startCol = -r;
    for (let i = 0; i < count; i++) {
      const colOffset = startCol + i * 2;
      const x = cx + colOffset * gapX;
      const y = startY + r * gapY;
      paths.push(createRhombus(x, y, w, h, 0));
    }
  }

  // Row 7 (the bottom row with 8 diamonds)
  const bottomOffsets = [-7, -5, -3, -1, 1, 3, 5, 7];
  bottomOffsets.forEach((colOffset) => {
    let angle = 0;
    let yShift = 0;
    let xShift = 0;
    if (colOffset === -1) {
      angle = 7;
      yShift = 7;
      xShift = 4;
    } else if (colOffset === 1) {
      angle = -7;
      yShift = 7;
      xShift = -4;
    } else if (Math.abs(colOffset) === 3) {
      angle = colOffset > 0 ? -3 : 3;
      yShift = 2;
    }
    const x = cx + colOffset * gapX + xShift;
    const y = startY + 7 * gapY + yShift;
    paths.push(createRhombus(x, y, w, h, angle));
  });

  return paths;
}

const diamonds = getDiamondPaths(250, 60);

// Icon-only diamonds (centered at 100, 100 with scale)
function getIconDiamondPaths() {
  return getDiamondPaths(150, 26).map(p => {
    return p;
  });
}

// 1. Exact white background version matching "logo fondo blanco completo.png"
const svgWhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="500" height="620">
  <rect width="100%" height="100%" fill="#ffffff" />
  
  <!-- 36 Diamond Lattice Tree -->
  <g fill="none" stroke="#000000" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    ${diamonds.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>
  
  <!-- JEV in tall condensed outline font -->
  <g text-anchor="middle">
    <text x="250" y="450" 
      font-family="'Plus Jakarta Sans', 'Arial Black', -apple-system, sans-serif" 
      font-size="124" 
      font-weight="900" 
      letter-spacing="18" 
      fill="none" 
      stroke="#000000" 
      stroke-width="3" 
      stroke-linejoin="round"
      transform="scale(0.9, 1.25) translate(28, -65)"
    >JEV</text>
  </g>

  <!-- ASESORÍA FINANCIERA in outline font with accent -->
  <g text-anchor="middle">
    <text x="250" y="540" 
      font-family="'Plus Jakarta Sans', -apple-system, sans-serif" 
      font-size="22" 
      font-weight="800" 
      letter-spacing="5" 
      fill="none" 
      stroke="#000000" 
      stroke-width="1.8" 
      stroke-linejoin="round"
    >ASESORÍA FINANCIERA</text>
  </g>
</svg>`;

fs.writeFileSync('public/logo-fondo-blanco.svg', svgWhite);
fs.writeFileSync('public/logo-jev.svg', svgWhite);

// 2. Exact dark mode version (crisp bright line art for dark theme)
const svgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="500" height="620">
  <!-- 36 Diamond Lattice Tree -->
  <g fill="none" stroke="#F8FAFC" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    ${diamonds.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>
  
  <!-- JEV in tall condensed outline font -->
  <g text-anchor="middle">
    <text x="250" y="450" 
      font-family="'Plus Jakarta Sans', 'Arial Black', -apple-system, sans-serif" 
      font-size="124" 
      font-weight="900" 
      letter-spacing="18" 
      fill="none" 
      stroke="#F8FAFC" 
      stroke-width="3" 
      stroke-linejoin="round"
      transform="scale(0.9, 1.25) translate(28, -65)"
    >JEV</text>
  </g>

  <!-- ASESORÍA FINANCIERA in outline font with accent -->
  <g text-anchor="middle">
    <text x="250" y="540" 
      font-family="'Plus Jakarta Sans', -apple-system, sans-serif" 
      font-size="22" 
      font-weight="800" 
      letter-spacing="5" 
      fill="none" 
      stroke="#7EDBFF" 
      stroke-width="1.8" 
      stroke-linejoin="round"
    >ASESORÍA FINANCIERA</text>
  </g>
</svg>`;

fs.writeFileSync('public/logo-jev-dark.svg', svgDark);

// Export diamond data for React component
const exportData = `// Exact 36 diamond paths computed mathematically from the official JEV logo
export const JEV_DIAMOND_PATHS = ${JSON.stringify(diamonds, null, 2)};
`;
fs.writeFileSync('src/components/jevDiamondsData.ts', exportData);

console.log('Regenerated logo SVGs and data successfully.');
