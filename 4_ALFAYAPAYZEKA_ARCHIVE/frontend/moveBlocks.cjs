const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'pages', 'fullPages', 'FullFormalReport.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Extract and reposition SSL Labs and Geo-IP
const sslRegex = /<Page pageNum=\{pS4\} totalPages=\{totalPages\} title=\{t\.sections\.s4\} t=\{t\}>[\s\S]*?<\/Page>/;
const sslMatch = content.match(sslRegex);
if (!sslMatch) console.error('SSL Labs (pS4) page not found!');
let sslContent = sslMatch ? sslMatch[0] : '';
if(sslMatch) content = content.replace(sslRegex, ''); // Remove SSL

const geoRegex = /<Page pageNum=\{pN2\} totalPages=\{totalPages\} title=\{t\.sections\.n2\} t=\{t\}>[\s\S]*?<\/Page>/;
const geoMatch = content.match(geoRegex);
if (!geoMatch) console.error('Geo IP (pN2) page not found!');
const geoContent = geoMatch ? geoMatch[0] : '';
if(geoMatch) content = content.replace(geoRegex, ''); // Remove Geo IP

if(sslMatch && geoMatch) {
    // Update SSL Labs variable references to N3
    sslContent = sslContent.replace(/pS4/g, 'pN3').replace(/t\.sections\.s4/g, 't.sections.n3');

    // Insert Geo IP and SSL Labs right before WHOIS (pN4)
    const whoisIndex = content.indexOf('<Page pageNum={pN4}');
    if(whoisIndex > -1){
        content = content.slice(0, whoisIndex) + geoContent + '\n\n        ' + sslContent + '\n\n        ' + content.slice(whoisIndex);
        fs.writeFileSync(targetPath, content, 'utf8');
        console.log('Successfully moved blocks.');
    } else {
        console.error('Could not find inserting index for WHOIS');
    }
}
