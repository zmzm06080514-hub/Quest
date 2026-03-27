// 모달 열기/닫기
function openModal() {
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('f-contact').classList.remove('error');
  document.getElementById('phone-error').classList.remove('show');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

// 전화번호 입력 처리
function handlePhone(input) {
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 11);
  const err = document.getElementById('phone-error');
  if (input.value.length > 0 && input.value.length < 11) {
    input.classList.add('error');
    err.classList.add('show');
  } else {
    input.classList.remove('error');
    err.classList.remove('show');
  }
}

// 성공 토스트 표시
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);' +
    'background:#191F28;color:#fff;padding:14px 24px;border-radius:14px;' +
    'font-size:14px;font-weight:600;z-index:9999;white-space:nowrap;';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}