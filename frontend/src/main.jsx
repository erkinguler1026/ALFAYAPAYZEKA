import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * main.jsx (Uygulamanın Giriş Noktası / Entry Point)
 * 
 * Burası React uygulamasının DOM'a (HTML'e) bağlandığı ilk yerdir.
 * - StrictMode: Geliştirme aşamasında potansiyel hataları bulmak için kullanılır.
 * - BrowserRouter: React Router'ın tarayıcı geçmişini (URL) yönetebilmesi için tüm uygulamayı sarmalar.
 * - index.css: Tailwind ve global stillerin sisteme dahil edildiği temel CSS dosyasıdır.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
