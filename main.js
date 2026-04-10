document.addEventListener('DOMContentLoaded', () => {
    // Dropdown toggle for mobile/click events
    const contactDropdown = document.querySelector('.contact-dropdown');
    
    // Toggle active class on click for touch devices
    contactDropdown.addEventListener('click', (e) => {
        // Prevent closing immediately if clicking inside the menu
        if (e.target.closest('.dropdown-menu')) return;
        
        contactDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!contactDropdown.contains(e.target)) {
            contactDropdown.classList.remove('active');
        }
    });

    // Local time updater
    const timeElement = document.querySelector('.local-time');
    if (timeElement) {
        setInterval(() => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            
            const strTime = `${hours < 10 ? '0'+hours : hours}:${minutes}${ampm} 현지 시간`;
            timeElement.textContent = strTime;
        }, 1000);
    }

    // Theme toggle interaction placeholder
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentBg = getComputedStyle(document.body).backgroundColor;
            // Simple toggle demonstration
            if (currentBg === 'rgb(247, 247, 248)') { // #f7f7f8
                document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
                document.documentElement.style.setProperty('--text-primary', '#f5f5f7');
                themeBtn.textContent = '☾';
            } else {
                document.documentElement.style.setProperty('--bg-color', '#f7f7f8');
                document.documentElement.style.setProperty('--text-primary', '#1d1d1f');
                themeBtn.textContent = '☀';
            }
        });
    }
});
