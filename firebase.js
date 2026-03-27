import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfuqKL7Tf8gS8jSaUWf47PvqXEpoHPRoQ",
  authDomain: "sunyang-9d6da.firebaseapp.com",
  projectId: "sunyang-9d6da",
  storageBucket: "sunyang-9d6da.firebasestorage.app",
  messagingSenderId: "704663068688",
  appId: "1:704663068688:web:b47836261e2dfe257c2a95",
  measurementId: "G-L6KGR7P5KF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// submitForm을 전역에 노출 (HTML onclick에서 호출 가능하도록)
window.submitForm = async function () {
  const name = document.getElementById('f-name').value.trim();
  const contact = document.getElementById('f-contact').value.trim();
  const desc = document.getElementById('f-desc').value.trim();
  const phoneInput = document.getElementById('f-contact');
  const err = document.getElementById('phone-error');
  const submitBtn = document.getElementById('submit-btn');

  // 유효성 검사
  if (!name) { alert('이름을 입력해주세요!'); return; }
  if (contact.length !== 11) {
    phoneInput.classList.add('error');
    err.classList.add('show');
    phoneInput.focus();
    return;
  }

  // 로딩 상태
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');

  try {
    await addDoc(collection(db, 'applications'), {
      name,
      contact,
      desc,
      createdAt: serverTimestamp()
    });

    closeModal();
    document.getElementById('f-name').value = '';
    document.getElementById('f-contact').value = '';
    document.getElementById('f-desc').value = '';

    showToast('✓ 신청이 완료됐어요! 곧 연락드릴게요 😊');

  } catch (error) {
    console.error('Firestore 저장 실패:', error);
    alert('신청 중 오류가 발생했어요. 다시 시도해주세요.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  }
};