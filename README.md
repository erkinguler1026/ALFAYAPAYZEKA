# Alfa Yapay Zeka Ajansı — Kurumsal Web Portalı

Alfa Yapay Zeka (ALFAYAPAYZEKA), işletmeler için Endüstriyel AI, İş Makinesi Otomasyonu ve Veri Analitiği çözümleri sunan modern ve kurumsal bir web projesidir. Frontend'de React/Vite, Backend'de ise Node.js/Express kullanılmıştır.

**Arayüz Tasarım Dili:**
- Karanlık Temalı (Dark Mode) UI
- Glassmorphism (Cam Efekti)
- Premium Akıcı Animasyonlar (Framer Motion)
- Tailwind CSS v4

---

## 📂 Proje Yapısı

Proje temel olarak iki ana klasörden oluşur, her birinin kendi çalıştırılabilir ortamı (`package.json`) vardır:

### 1. [frontend/](./frontend/README.md)
Kullanıcı arayüzünü (UI) barındırır. 
- **Teknolojiler:** React v19, Vite, Redux Toolkit, Tailwind CSS v4, React Router DOM, Framer Motion, Lucide React.
- **Çalıştırma:** `npm run dev` (Port 5173'te çalışır)

### 2. [backend/](./backend/README.md)
Sunucu tarafı iş mantığını, iletişim formu aracılığıyla gelen mesajların e-posta (SMTP) ile gönderilmesini barındırır.
- **Teknolojiler:** Node.js, Express.js, Nodemailer, CORS.
- **Çalıştırma:** `npm run dev` (Port 5000'de çalışır)

---

## 🚀 Hızlı Kurulum ve Başlatma

Yerel (Local) ortamda projeyi ayağa kaldırmak için **iki terminal** kullanmanız gerekir.

### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
# Beklenen çıktı: "Server is running on port 5000"
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
# Beklenen çıktı: "VITE v8.x.x ready in ... ms"
# Tarayıcıda http://localhost:5173 adresini açın.
```

---

## 🛡️ Bakım ve Geliştirme Notları

- **Ortam Değişkenleri (.env):** Frontend iletişim formunun doğru endpointe istek atabilmesi için `frontend/.env` dosyası içinde `VITE_API_BASE_URL` değişkeni tutulur. Backend'de ise SMTP mail erişim anahtarları (`backend/.env`) bulunur.
- **Versiyonlama:** Projenin son kararlı/aktif versiyonu arayüzde (Footer ve App.jsx) `V1.3.1` olarak belirtilmiştir.
- **Katkıda Bulunan:** Projenin tüm interaktif bileşenlerindeki (Framer Motion) gecikme (delay) süreleri sistemli şekilde kurgulanmıştır; bileşen hiyerarşisinde değişiklik yapılacağında sıralı geçişlere dikkat edilmelidir.
