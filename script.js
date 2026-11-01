// Real-Time Clock Function
function updateClock() {
  const now = new Date();
  
  // Format Tanggal (Contoh: Minggu, 1 November 2026)
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('id-ID', optionsDate);
  
  // Format Waktu (Contoh: 18:08:00 WIB)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds} WIB`;
  
  document.getElementById('currentDate').textContent = dateString;
  document.getElementById('currentTime').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// Dark/Light Theme Toggle Function
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
  const icon = document.getElementById('themeIcon');
  const text = document.getElementById('themeText');
  if (theme === 'dark') {
    icon.textContent = '☀️';
    text.textContent = 'Light Mode';
  } else {
    icon.textContent = '🌙';
    text.textContent = 'Dark Mode';
  }
}

// Load Saved Theme Preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);
