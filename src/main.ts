/**
 * 애플리케이션 진입점
 */

import { UIManager } from './UIManager.js';

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  (window as any).uiManager = new UIManager();
  console.log('✅ UI Manager 초기화 완료');
});
