import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * main.jsx — Uygulamanın Giriş Noktası (Entry Point)
 *
 * Bu dosya Vite tarafından derlemenin başlangıç noktası olarak kullanılır.
 * React uygulaması burada public/index.html içindeki <div id="root"> elementine
 * bağlanır (hydrate edilir).
 *
 * Sarmalayıcı katmanlar (dıştan içe):
 *   <StrictMode>    → Geliştirme modunda çift render yaparak potansiyel
 *                     hataları ve eski API kullanımlarını konsola raporlar.
 *                     Production build'de etkisizdir.
 *
 *   <BrowserRouter> → React Router'ın HTML5 History API'sini kullanarak
 *                     URL geçişlerini yönetmesini sağlar. Tüm <Route>
 *                     ve <Link> bileşenlerinin çalışabilmesi için zorunludur.
 *
 *   <App />         → Routing yapısı ve global bileşenler (ToastContainer)
 *                     burada başlatılır.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
