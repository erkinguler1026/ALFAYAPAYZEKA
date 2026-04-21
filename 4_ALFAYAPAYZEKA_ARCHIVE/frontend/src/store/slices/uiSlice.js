import { createSlice } from '@reduxjs/toolkit';

/**
 * uiSlice — Uygulamanın Arayüz Durumlarını Yönetir
 * 
 * Versiyon: V1.3.1
 * 
 * Bu slice, mobil menü (hamburger), loading spinner'lar veya 
 * modal pencereleri gibi UI-level durumları merkezi store'da tutar.
 * 
 * Reducer İşlevleri:
 *   - toggleMenu: Menü durumunu tersine çevirir (açıksa kapatır, kapalıysa açar).
 *   - closeMenu: Menüyü doğrudan kapatır (navigasyon sonrası kullanılır).
 *   - setLoading: Uygulama genelindeki yükleme durumunu günceller.
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMenuOpen: false,
    theme: 'dark', // Gelecekte tema değişimi için hazır yapıldı
    isLoading: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
