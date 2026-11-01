// Real-Time Clock Function
function updateClock() {
  const now = new Date();
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('id-ID', optionsDate);
  
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

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

// ===============================================
// ANIMASI RASI BINTANG (CONSTELLATION CANVAS)
// ===============================================
const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 70; // Jumlah bintang

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();

window.addEventListener('resize', () => {
  setCanvasSize();
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1; // Ukuran bintang
    this.speedX = (Math.random() - 0.5) * 0.8; // Kecepatan gerak X
    this.speedY = (Math.random() - 0.5) * 0.8; // Kecepatan gerak Y
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce jika menabrak pinggir layar
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }

  draw() {
    const theme = document.documentElement.getAttribute('data-theme');
    ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 119, 181, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  const theme = document.documentElement.getAttribute('data-theme');
  const maxDistance = 120; // Jarak maksimum antar bintang untuk terhubung garis

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        let opacity = 1 - (distance / maxDistance);
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(255, 255, 255, ${opacity * 0.25})` 
          : `rgba(0, 119, 181, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
