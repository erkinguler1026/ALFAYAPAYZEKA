import axios from 'axios';
import sslChecker from 'ssl-checker';
import net from 'net';
import dns from 'dns/promises';

/**
 * FREE PENTEST ENGINE (V5.0 - ADVANCED CORE)
 */

class FreePentestEngine {
  constructor(domain) {
    this.domain = domain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .replace(/^www\./, '');

    this.targetUrl = `https://${this.domain}`;
    this.ip = null;

    this.results = {
      score: 100,
      grade: 'A',
      categories: {
        service: { name: "SERVİS GÜVENLİĞİ", health: 100, status: 'OK', findings: [] },
        headers: { name: "GÜVENLİK BAŞLIKLARI", health: 100, status: 'OK', findings: [] },
        network: { name: "AĞ PORT GÜVENLİĞİ", health: 100, status: 'OK', findings: [] },
        domain: { name: "DOMAIN & DNS", health: 100, status: 'OK', findings: [] },
        patching: { name: "YAZILIM & YAMA", health: 100, status: 'OK', findings: [] }
      }
    };
  }

  /* -------------------------------------------------- */
  /* INIT: Resolve IP */
  async resolveTarget() {
    try {
      const res = await dns.lookup(this.domain);
      this.ip = res.address;
    } catch (e) {
      this.ip = this.domain;
    }
  }

  /* -------------------------------------------------- */
  /* 3.1 SERVICE SECURITY */
  async checkServiceSecurity() {
    let score = 100;
    const findings = [];

    const paths = [
      { path: '/.env', critical: true },
      { path: '/.git/config', critical: true },
      { path: '/admin', critical: false },
      { path: '/wp-admin', critical: false }
    ];

    for (const p of paths) {
      try {
        const resp = await axios.get(`${this.targetUrl}${p.path}`, {
          timeout: 3000,
          validateStatus: false
        });

        if (p.critical && resp.status === 200) {
          score -= 40;
          findings.push(`Kritik dosya açık: ${p.path}`);
        }

        if (!p.critical && resp.status === 200) {
          findings.push(`Yönetim paneli erişilebilir: ${p.path}`);
        }

      } catch (e) {
        findings.push(`${p.path} kontrol edilemedi`);
      }
    }

    this.updateCategory('service', score, findings);
  }

  /* -------------------------------------------------- */
  /* 3.2 SECURITY HEADERS */
  async checkSecurityHeaders(headers) {
    let score = 100;
    const findings = [];

    const required = {
      'strict-transport-security': 20,
      'content-security-policy': 20,
      'x-frame-options': 15,
      'x-content-type-options': 10,
      'referrer-policy': 10,
      'permissions-policy': 10
    };

    for (const key in required) {
      if (!headers[key]) {
        score -= required[key];
        findings.push(`${key} eksik`);
      }
    }

    this.updateCategory('headers', score, findings);
  }

  /* -------------------------------------------------- */
  /* 3.3 NETWORK PORT SCAN */
  async checkNetworkPorts() {
    const ports = [21, 22, 23, 25, 445, 3306, 3389];

    const probe = (port) => new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(1500);

      socket.on('connect', () => {
        socket.destroy();
        resolve({ port, open: true });
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve({ port, open: false });
      });

      socket.on('error', () => {
        resolve({ port, open: false });
      });

      socket.connect(port, this.ip);
    });

    const results = await Promise.all(ports.map(p => probe(p)));
    const openPorts = results.filter(r => r.open).map(r => r.port);

    let score = 100;
    const findings = [];

    if (openPorts.length > 0) {
      score -= 60;
      findings.push(`Açık riskli portlar: ${openPorts.join(', ')}`);
    }

    this.updateCategory('network', score, findings);
  }

  /* -------------------------------------------------- */
  /* 3.4 DOMAIN & DNS */
  async checkDomainWhois() {
    let score = 100;
    const findings = [];

    try {
      const ssl = await sslChecker(this.domain);

      if (!ssl.valid) {
        score -= 40;
        findings.push("SSL geçersiz");
      }

      if (ssl.daysRemaining < 15) {
        score -= 20;
        findings.push("SSL süresi dolmak üzere");
      }

    } catch (e) {
      score -= 30;
      findings.push("SSL kontrol hatası");
    }

    try {
      const txt = await dns.resolveTxt(this.domain).catch(() => []);

      const hasSpf = txt.some(t => t.join('').includes('v=spf1'));
      const hasDmarc = txt.some(t => t.join('').includes('v=DMARC1'));

      if (!hasSpf) {
        score -= 20;
        findings.push("SPF eksik");
      }

      if (!hasDmarc) {
        score -= 15;
        findings.push("DMARC eksik");
      }

    } catch (e) {
      findings.push("DNS okunamadı");
    }

    this.updateCategory('domain', score, findings);
  }

  /* -------------------------------------------------- */
  /* 3.5 PATCHING */
  async checkSoftwarePatching(headers) {
    let score = 100;
    const findings = [];

    const server = headers['server'];
    const powered = headers['x-powered-by'];

    if (server && /\d/.test(server)) {
      score -= 20;
      findings.push(`Server version açık: ${server}`);
    }

    if (powered) {
      score -= 15;
      findings.push(`X-Powered-By açık: ${powered}`);
    }

    this.updateCategory('patching', score, findings);
  }

  /* -------------------------------------------------- */
  updateCategory(key, score, findings) {
    this.results.categories[key] = {
      name: this.results.categories[key].name,
      health: Math.max(0, score),
      status:
        score > 80 ? 'GÜVENLİ' :
        score > 50 ? 'ORTA' : 'RİSKLİ',
      findings: findings.length ? findings : ["Sorun tespit edilmedi"]
    };
  }

  /* -------------------------------------------------- */
  async performFullScan() {
    await this.resolveTarget();

    await Promise.all([
      this.checkServiceSecurity(),
      this.checkNetworkPorts(),
      this.checkDomainWhois()
    ]);

    let headers = {};

    try {
      const resp = await axios.get(this.targetUrl, {
        timeout: 5000,
        validateStatus: false
      });
      headers = resp.headers;
    } catch (e) {}

    await Promise.all([
      this.checkSecurityHeaders(headers),
      this.checkSoftwarePatching(headers)
    ]);

    const cats = Object.values(this.results.categories);
    const avg = cats.reduce((a, c) => a + c.health, 0) / cats.length;

    this.results.score = Math.round(avg);

    this.results.grade =
      avg >= 90 ? 'A' :
      avg >= 75 ? 'B' :
      avg >= 50 ? 'C' :
      avg >= 30 ? 'D' : 'F';

    return this.results;
  }
}

export default FreePentestEngine;