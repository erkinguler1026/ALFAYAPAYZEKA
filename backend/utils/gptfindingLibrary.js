export const FINDING_LIBRARY = {
  "Missing HSTS": {
    title: "HTTP Strict Transport Security (HSTS) Eksikliği",
    severity: "Medium",

    description: `
HSTS mekanizması, tarayıcıya sadece HTTPS üzerinden iletişim kurmasını zorunlu kılar.
Bu başlık eksik olduğunda kullanıcılar MITM saldırılarına açık hale gelir.
`,

    technical: `
Sunucu, Strict-Transport-Security header'ını göndermemektedir.
Bu nedenle tarayıcı HTTPS zorlaması yapamaz.
`,

    attack: `
Saldırgan, kullanıcıyı HTTP üzerinden yakalayarak HTTPS'e yönlendirmeyi engelleyebilir
ve trafiği manipüle edebilir.
`,

    impact: `
Kullanıcı oturumları ele geçirilebilir, veri sızıntısı yaşanabilir.
`,

    businessImpact: `
KVKK ve ISO 27001 kapsamında veri güvenliği ihlali oluşur.
Şirket itibar kaybı yaşayabilir.
`,

    remediation: `
Strict-Transport-Security header'ı eklenmelidir:
max-age=31536000; includeSubDomains; preload
`,

    references: [
      "OWASP A05:2021",
      "https://owasp.org/www-project-top-ten/"
    ]
  }
};