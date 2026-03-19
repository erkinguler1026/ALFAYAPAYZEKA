import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';

/**
 * Redux Store Yapılandırması — Uygulama Beyni
 * 
 * Versiyon: V1.3.1
 * 
 * Bu dosya, uygulamanın tüm state'ini (durumunu) tek bir merkezde toplar.
 * RTK (Redux Toolkit) kullanılarak yapılandırılmıştır.
 * 
 * Mevcut Reducer'lar:
 *   - ui: Mobil menü açılış/kapanış, loading ve tema durumlarını yönetir.
 * 
 * @module store/index
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export default store;
