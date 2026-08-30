/* ========================================================
   Arun & Dhiya | Soft Romantic Aqua Blue Countdown Script
   Strict Date Logic: Tomorrow ➔ November 19, 2026
======================================================== */

// Target End Boundary: Nov 20 00:00:00 (which marks the end of Nov 19 23:59:59)
const TARGET_YEAR = 2026;
const TARGET_MONTH = 10; // 0-indexed: 10 = November
const TARGET_DAY = 20;

// DOM Elements
const daysNumberEl = document.getElementById('daysNumber');
const daysLabelEl = document.getElementById('daysLabel');
const counterCardEl = document.getElementById('counterCard');
const tickerGridEl = document.getElementById('tickerGrid');
const weddingDateDisplayEl = document.getElementById('weddingDateDisplay');

// Live Ticker Elements
const liveDaysEl = document.getElementById('liveDays');
const liveHoursEl = document.getElementById('liveHours');
const liveMinutesEl = document.getElementById('liveMinutes');
const liveSecondsEl = document.getElementById('liveSeconds');

/**
 * Calculates remaining days strictly from Tomorrow up to November 19, 2026
 */
function updateWeddingCountdown() {
  const now = new Date();
  
  // Tomorrow's Date (00:00:00)
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);

  // End boundary: Nov 20 00:00:00 (End of Nov 19)
  const nov20Midnight = new Date(TARGET_YEAR, TARGET_MONTH, TARGET_DAY, 0, 0, 0, 0);

  // Time difference in milliseconds
  const diffTime = nov20Midnight.getTime() - now.getTime();
  const remainingDaysFromTomorrow = Math.floor((nov20Midnight.getTime() - tomorrow.getTime()) / (1000 * 60 * 60 * 24));

  if (diffTime > 0) {
    // Active Countdown State
    daysNumberEl.textContent = remainingDaysFromTomorrow;
    daysLabelEl.textContent = remainingDaysFromTomorrow === 1 ? 'Day Remaining' : 'Days Remaining';
    
    // Live Ticker Calculation (Days, Hours, Minutes, Seconds remaining until Nov 19 23:59:59)
    const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const h = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diffTime % (1000 * 60)) / 1000);

    liveDaysEl.textContent = d < 10 ? '0' + d : d;
    liveHoursEl.textContent = h < 10 ? '0' + h : h;
    liveMinutesEl.textContent = m < 10 ? '0' + m : m;
    liveSecondsEl.textContent = s < 10 ? '0' + s : s;

    tickerGridEl.style.display = 'grid';
    counterCardEl.className = 'counter-card';
    weddingDateDisplayEl.textContent = 'November 20, 2026 💍';
  } else if (remainingDaysFromTomorrow === 0) {
    // Eve / Nov 19 Day State
    daysNumberEl.textContent = "It's Wedding Eve! ❤️💍";
    daysLabelEl.textContent = "";
    tickerGridEl.style.display = 'none';
    counterCardEl.className = 'counter-card event-day';
    weddingDateDisplayEl.textContent = 'November 19, 2026 • Today';
  } else {
    // Post Wedding State
    daysNumberEl.textContent = "We Are Married ❤️";
    daysLabelEl.textContent = "";
    tickerGridEl.style.display = 'none';
    counterCardEl.className = 'counter-card married';
    weddingDateDisplayEl.textContent = 'November 20, 2026';
  }
}

// Initial calculation and 1-second interval update
updateWeddingCountdown();
setInterval(updateWeddingCountdown, 1000);

/* ========================================================
   Cinematic Intro Splash Animation & Transition
======================================================== */
const introSplash = document.getElementById('introSplash');
const mainContainer = document.getElementById('mainContainer');

let splashDismissed = false;

function dismissIntroSplash() {
  if (splashDismissed) return;
  splashDismissed = true;

  if (introSplash) {
    introSplash.classList.add('splash-hidden');
    setTimeout(() => {
      introSplash.style.display = 'none';
    }, 900);
  }

  if (mainContainer) {
    mainContainer.classList.add('app-visible');
  }
}

// Auto transition after 2.3 seconds
const splashTimer = setTimeout(dismissIntroSplash, 2300);

// Allow user to tap/click anywhere to transition immediately
if (introSplash) {
  introSplash.addEventListener('click', () => {
    clearTimeout(splashTimer);
    dismissIntroSplash();
  });
}

/* ========================================================
   Aqua Blue Canvas Particles (Hearts & Sparkles)
======================================================== */
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 30;
    this.size = Math.random() * 8 + 5;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.color = Math.random() > 0.4 ? '#00f2fe' : '#80f9ff';
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.001;

    if (this.y < -20 || this.opacity <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    const topCurve = this.size * 0.3;
    ctx.moveTo(0, topCurve);
    ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurve);
    ctx.bezierCurveTo(-this.size / 2, (this.size + topCurve) / 2, 0, this.size, 0, this.size);
    ctx.bezierCurveTo(0, (this.size + topCurve) / 2, this.size / 2, (this.size + topCurve) / 2, this.size / 2, topCurve);
    ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurve);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

const particleCount = 20;
for (let i = 0; i < particleCount; i++) {
  const p = new FloatingParticle();
  p.y = Math.random() * height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

/* ========================================================
   PWA Service Worker Registration & Install Prompt
======================================================== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((reg) => {
        console.log('PWA Service Worker registered:', reg.scope);
      })
      .catch((err) => {
        console.log('PWA Service Worker registration failed:', err);
      });
  });
}

// PWA Install Prompt Handling
let deferredPrompt = null;
const installBtn = document.getElementById('pwaInstallBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent default mini-infobar or auto prompt
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'inline-flex';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert("To install this app on your device:\n\n• On iPhone/iPad (Safari): Tap the 'Share' icon and choose 'Add to Home Screen'.\n• On Android/Chrome: Tap the 3 dots menu and choose 'Install app' or 'Add to Home screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
}

window.addEventListener('appinstalled', () => {
  console.log('PWA installed successfully');
  if (installBtn) {
    installBtn.style.display = 'none';
  }
});
