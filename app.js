// Live Clock, Countdown & Canvas Scaling Engine (Indian Standard Time)

document.addEventListener('DOMContentLoaded', () => {
  const clockElement = document.getElementById('live-clock');
  const countdownElement = document.getElementById('countdown');
  const progressBar = document.getElementById('progress-bar');
  const dateElement = document.getElementById('live-date');
  const container = document.querySelector('.wallpaper-container');

  // Study window: May 31, 2026 to July 15, 2026 (45 days total)
  const startDate = new Date('2026-05-31T00:00:00+05:30');
  const targetDate = new Date('2026-07-15T00:00:00+05:30');
  const totalDays = 45;

  // 1. Dynamic Scale-to-Fit Engine (keeps background and live overlays aligned identically)
  function scaleWallpaper() {
    const baseWidth = 1444; // Matches wallpaper.png width
    const baseHeight = 960; // Matches wallpaper.png height
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const scale = Math.min(windowWidth / baseWidth, windowHeight / baseHeight);
    
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'center center';
  }

  window.addEventListener('resize', scaleWallpaper);
  scaleWallpaper(); // Initial scale calculation

  // 2. Metrics & Timers Engine
  function updateWallpaperMetrics() {
    const now = new Date();
    
    // Get current time in Indian Standard Time (IST)
    const istTimeString = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const istDate = new Date(istTimeString);

    // Live Clock formatting (h:mm:ss 12-hour style)
    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');
    
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 maps to 12
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Live Date formatting (e.g. "31 May 2026 at 11:45 AM")
    const day = istDate.getDate();
    const monthName = istDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', month: 'long' });
    const year = istDate.getFullYear();
    
    let dateHours = istDate.getHours();
    const dateMinutes = String(istDate.getMinutes()).padStart(2, '0');
    const ampm = dateHours >= 12 ? 'PM' : 'AM';
    dateHours = dateHours % 12;
    dateHours = dateHours ? dateHours : 12;
    
    dateElement.textContent = `${day} ${monthName} ${year} at ${dateHours}:${dateMinutes} ${ampm}`;

    // 3. Preparation Period Day Tracker (Day X / 45)
    // Starts at Day 1 on May 31, 2026 and counts up to Day 45 on July 15, 2026
    const diffTime = now - startDate;
    const elapsedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const currentDay = Math.max(1, Math.min(totalDays, elapsedDays + 1));
    
    countdownElement.textContent = `${currentDay}/${totalDays}`;

    // Dynamic Progress Bar calculation based on completed preparation days
    const progressPercent = (currentDay / totalDays) * 100;
    progressBar.style.width = `${progressPercent.toFixed(1)}%`;
  }

  updateWallpaperMetrics();
  setInterval(updateWallpaperMetrics, 1000);
});
