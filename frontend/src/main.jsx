import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
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
 *
 *   <Provider>      → Redux Toolkit Store'u tüm uygulamaya sağlar. Bileşenler
 *                     useSelector ve useDispatch ile state'e erişebilir.
 *
 *   <BrowserRouter> → React Router'ın HTML5 History API'sini kullanarak
 *                     URL geçişlerini yönetmesini sağlar.
 *
 *   <App />         → Routing yapısı ve global bileşenler burada başlatılır.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
