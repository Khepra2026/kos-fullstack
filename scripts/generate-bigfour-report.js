const fs = require('fs');
const path = require('path');

const lighthouseDir = '.lighthouseci';
const outputPath = 'bigfour-report.json';

let report = {
  timestamp: new Date().toISOString(),
  lighthouse: null,
  status: 'fallback'
};

if (fs.existsSync(lighthouseDir)) {
  const files = fs.readdirSync(lighthouseDir).filter(f => f.endsWith('.json'));
  if (files.length > 0) {
    const data = JSON.parse(fs.readFileSync(path.join(lighthouseDir, files[0]), 'utf8'));
    report.lighthouse = data;
    report.status = 'success';
  } else {
    report.message = 'No Lighthouse data available - artifact empty';
  }
} else {
  report.message = 'No Lighthouse data available - directory missing';
}

fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
console.log(`Report generated: ${outputPath} - Status: ${report.status}`);
