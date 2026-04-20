/* eslint-env node */
const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'pages', 'fullPages', 'FullFormalReport.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Update the pCounter assignments (Lines 443-467)
const pCounterRegex = /let pCounter = 3;[\s\S]*?const pageMap = {[\s\S]*?};/m;
const newPCounter = `let pCounter = 3;
  const pS1 = pCounter++; 
  const pS3 = pCounter++; // TCP PORT
  const pS5 = pCounter++; // HTTP HEADERS
  const pS8 = pCounter++; // SENSITIVE
  
  const pN1_start = pCounter; // SUBDOMAINS
  pCounter += subChunks.length || 1;
  const pN2 = pCounter++; // GEO IP
  const pN3 = pCounter++; // SSL LABS
  const pN4 = pCounter++; // WHOIS
  const pN5 = pCounter++; // COOKIE FULL
  const pN6 = pCounter++; // CORS FULL
  const pN7 = pCounter++; // TECH STACK
  const pN8 = pCounter++; // OTX
  const pMeth_start = pCounter; // METHODOLOGY
  pCounter += methodologyChunks.length || 1;
  const pDump = pCounter++;
  const pLegal = pCounter++;
  const pFinal = pCounter;
  const totalPages = pCounter;

  const pageMap = {
     s1: pS1, s3: pS3, s5: pS5, s8: pS8,
     n1: pN1_start, n2: pN2, n3: pN3, n4: pN4, n5: pN5, n6: pN6, n7: pN7, n8: pN8,
     meth: pMeth_start, dump: pDump, legal: pLegal, final: pFinal
  };`;
content = content.replace(pCounterRegex, newPCounter);

// 2. Update TableOfContents array mapping (lines 136-147)
const tocRegex = /\{\[\s*\{\s*id:\s*"S1",[\s\S]*?id:\s*"S12"[\s\S]*?\},/m;
const newToc = `{[
          { id: "S1", title: t.sections.s1, page: pad(pageMap.s1) },
          { id: "S3", title: t.sections.s3, page: pad(pageMap.s3) },
          { id: "S5", title: t.sections.s5, page: pad(pageMap.s5) },
          { id: "S8", title: t.sections.s8, page: pad(pageMap.s8) },
          { id: "N1", title: t.sections.n1, page: pad(pageMap.n1) },
          { id: "N2", title: t.sections.n2, page: pad(pageMap.n2) },
          { id: "N3", title: t.sections.n3, page: pad(pageMap.n3) },
          { id: "N4", title: t.sections.n4, page: pad(pageMap.n4) },
          { id: "N5", title: t.sections.n5, page: pad(pageMap.n5) },
          { id: "N6", title: t.sections.n6, page: pad(pageMap.n6) },
          { id: "N7", title: t.sections.n7, page: pad(pageMap.n7) },
          { id: "N8", title: t.sections.n8, page: pad(pageMap.n8) },`;
content = content.replace(tocRegex, newToc);

// 3. Update t.sections (tr)
const trSectionsRegex = /s1:\s*"BÖLÜM I[\s\S]*?s12:\s*"BÖLÜM XII[^"]*"/m;
const newTrSections = `s1: "BÖLÜM I: IP ÇÖZÜMLEME VE AĞ İSTİHBARATI (S1)",
        s3: "BÖLÜM II: PORT TARAMA VE SERVİS ANALİZİ (S3)",
        s5: "BÖLÜM III: HTTP GÜVENLİK BAŞLIKLARI (S5)",
        s8: "BÖLÜM IV: HASSAS DOSYA VE YOL TARAMASI (S8)",
        n1: "BÖLÜM V: SUBDOMAIN / ALT ALAN ADI KEŞFİ (N1)",
        n2: "BÖLÜM VI: GEO-IP KONUM VE ISP ANALİZİ (N2)",
        n3: "BÖLÜM VII: SSL LABS GÜVENLİK DERECESİ (N3)",
        n4: "BÖLÜM VIII: WHOIS VE RDAP SAHİPLİK BİLGİSİ (N4)",
        n5: "BÖLÜM IX: ÇEREZ (COOKIE) GÜVENLİK ANALİZİ (N5)",
        n6: "BÖLÜM X: CORS POLİTİKASI VE API GÜVENLİĞİ (N6)",
        n7: "BÖLÜM XI: TEKNOLOJİ PARMAK İZİ TESPİTİ (N7)",
        n8: "BÖLÜM XII: IP VE DOMAİN İTİBAR KONTROLÜ (N8)"`;
content = content.replace(trSectionsRegex, newTrSections);

// 4. Update t.sections (en)
const enSectionsRegex = /s1:\s*"Section I:[\s\S]*?s12:\s*"Section XII[^"]*"/m;
const newEnSections = `s1: "Section I: IP Resolution & Network OSINT (S1)",
        s3: "Section II: Port Scan & Service Analysis (S3)",
        s5: "Section III: HTTP Security Headers (S5)",
        s8: "Section IV: Sensitive File & Path Brute (S8)",
        n1: "Section V: Subdomain Discovery (N1)",
        n2: "Section VI: Geo-IP & ISP Analysis (N2)",
        n3: "Section VII: Qualys SSL Labs Security Grade (N3)",
        n4: "Section VIII: WHOIS & RDAP Ownership (N4)",
        n5: "Section IX: Cookie Security Analysis (N5)",
        n6: "Section X: CORS Policy & API Security (N6)",
        n7: "Section XI: Technology Fingerprint (N7)",
        n8: "Section XII: IP & Domain Reputation (N8)"`;
content = content.replace(enSectionsRegex, newEnSections);

// 5. Extract and reposition SSL Labs and Geo-IP
const sslRegex = /<Page pageNum=\{pS4\} totalPages=\{totalPages\} title=\{t\.sections\.s4\} t=\{t\}>[\s\S]*?<\/Page>/;
const sslMatch = content.match(sslRegex);
if (!sslMatch) console.error('SSL Labs page not found!');
let sslContent = sslMatch[0];
content = content.replace(sslRegex, ''); // Remove SSL

const geoRegex = /<Page pageNum=\{pN2\} totalPages=\{totalPages\} title=\{t\.sections\.n2\} t=\{t\}>[\s\S]*?<\/Page>/;
const geoMatch = content.match(geoRegex);
if (!geoMatch) console.error('Geo IP page not found!');
const geoContent = geoMatch[0];
content = content.replace(geoRegex, ''); // Remove Geo IP

// Update SSL Labs variable references to N3
sslContent = sslContent.replace(/pS4/g, 'pN3').replace(/t\.sections\.s4/g, 't.sections.n3');

// Use proper template literal newline insertion
const whoisIndex = content.indexOf('<Page pageNum={pN4}');
content = content.slice(0, whoisIndex) + geoContent + `

        ` + sslContent + `

        ` + content.slice(whoisIndex);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully updated FullFormalReport.jsx sequence.');
