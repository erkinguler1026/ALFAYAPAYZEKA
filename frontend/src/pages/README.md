# src/pages/ — Ana Sayfa Bileşenleri

Kullanıcının yönlendirildiği ayrı router görünümlerinin (view) bileşenleridir. Her biri kendi içerik mantığını barındırır.

## 📄 Dosya Sorumlulukları

- **`Home.jsx`**: (Landing Page) Uygulamanın en geniş ve uzun sayfasıdır. Hero alanı, "Outcomes" (kazanımlar), Features (özellikler), "How it works" (nasıl çalışır), hizmet kartları, metrikler (istatistikler) ve ek olarak alt kısmında iletişim formunu da barındırır. Çoklu Framer Motion animasyonları içerir.
- **`About.jsx`**: Vizyon, değerler ve takım hakkındaki bilgilerin listelendiği, cam efekti tasarımıyla zenginleştirilmiş tanıtım sayfasıdır.
- **`Portfolio.jsx`**: Önceden tamamlanmış projelerin ve AI çalışmalarının bir vitrini. `projects` JSON verisini iteratif olarak okuyarak, görsel ağırlıklı hover animasyonlu kartlar üretir.
- **`Pricing.jsx`**: Abonelik tabanlı ve proje bazlı hizmetlerin ücretlendirildiği paketleri içerir (`plans` dizisi). TL ve USD arasında geçiş yapan state bazlı bir Toggle bulundurur. `FeatureItem` alt bileşeniyle özellik liste öğeleri tooltip yeteneği kazanır.
- **`Contact.jsx`**: İletişim bilgileri vitrini ve fonksiyonel bir iletişim formudur. Kullanıcıdan veri toplayıp `/api/contact` backend uç noktasına POST isteği yollar ve sonucu bildirim (toast) ile gösterir.
