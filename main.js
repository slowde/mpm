document.addEventListener('DOMContentLoaded', () => {
    // SPA Routing Logic
    const homeView = document.getElementById('home-view');
    const aboutView = document.getElementById('about-view');

    let aboutAnimated = false;

    function startAboutAnimation() {
        if (aboutAnimated) return;
        
        const aboutContainer = document.getElementById('about-typewriter-container');
        const aboutSubtitle = document.getElementById('about-subtitle');
        if (!aboutContainer) return;
        
        aboutAnimated = true;
        const textToType = "느린빛은 화면 속 빛을 통해 가치를 전달하는 디자인 스튜디오입니다.";
        
        // Clear initial text
        aboutContainer.innerHTML = '';
        aboutSubtitle.style.opacity = '0';
        
        let i = 0;
        const cursor = `<span class="typing-cursor">|</span>`;
        
        function typeAbout() {
            if (i < textToType.length) {
                const currentText = textToType.slice(0, i + 1);
                
                if (i < 3) {
                    aboutContainer.innerHTML = `<span style="font-weight: 700 !important;">${currentText}</span>${cursor}`;
                } else {
                    aboutContainer.innerHTML = `<span style="font-weight: 700 !important;">느린빛</span>${currentText.slice(3)}${cursor}`;
                }
                
                i++;
                setTimeout(typeAbout, 70);
            } else {
                aboutContainer.innerHTML = `<span style="font-weight: 700 !important;">느린빛</span>${textToType.slice(3)}<span class="typing-cursor blink">|</span>`;
                if (aboutSubtitle) {
                    aboutSubtitle.style.opacity = '1';
                }
            }
        }
        
        setTimeout(typeAbout, 400); // Small initial delay
    }

    function handleRoute() {
        if (!homeView || !aboutView) return;
        
        if (window.location.hash === '#about') {
            homeView.style.display = 'none';
            aboutView.style.display = 'flex';
            window.scrollTo(0,0);
            startAboutAnimation();
        } else {
            homeView.style.display = 'flex';
            aboutView.style.display = 'none';
            // Scroll natively handled by browser for #works or #home
        }
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Execute on initial load

    // Select the target title
    const heroTitle = document.querySelector('.hero-content h2');
    
    if (heroTitle) {
        // The texts to type out
        const text1 = "저는 다른 사람들을 위해";
        const text2 = "무언가를 만드는 것을 좋아합니다.";
        
        // Clear the element before starting
        heroTitle.innerHTML = '';
        
        let i = 0;
        let line = 1;
        
        // Blinking cursor element
        const cursor = `<span class="typing-cursor">|</span>`;
        
        function typeWriter() {
            if (line === 1) {
                if (i < text1.length) {
                    // Type first line
                    heroTitle.innerHTML = text1.slice(0, i + 1) + cursor;
                    i++;
                    setTimeout(typeWriter, 80); // Speed of typing (ms per char)
                } else {
                    // First line finished, pause slightly before breaking to next line
                    heroTitle.innerHTML = text1 + '<br>' + cursor;
                    line = 2;
                    i = 0;
                    setTimeout(typeWriter, 300);
                }
            } else if (line === 2) {
                if (i < text2.length) {
                    // Type second line
                    heroTitle.innerHTML = text1 + '<br>' + text2.slice(0, i + 1) + cursor;
                    i++;
                    setTimeout(typeWriter, 80);
                } else {
                    // Done typing, set blinking class to cursor
                    heroTitle.innerHTML = text1 + '<br>' + text2 + `<span class="typing-cursor blink">|</span>`;
                }
            }
        }
        
        // Start typing after a short delay so the user sees it start
        setTimeout(typeWriter, 500);
    }
    
    // Slideshow Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Change image every 3 seconds
    }

    // Music Player Logic
    const bgAudio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('play-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressContainer = document.getElementById('progress-container');

    if (bgAudio && playBtn && progressFill && progressContainer) {
        // Attempt Autoplay check to sync button icon
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                playBtn.textContent = '⏸';
            }).catch(error => {
                // Autoplay was blocked
                playBtn.textContent = '▶';
            });
        }
        // Toggle Play/Pause
        playBtn.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play();
                playBtn.textContent = '⏸';
            } else {
                bgAudio.pause();
                playBtn.textContent = '▶';
            }
        });

        // Update Progress Bar
        bgAudio.addEventListener('timeupdate', () => {
            const progressPercent = (bgAudio.currentTime / bgAudio.duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
        });

        // Seek functionality
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = bgAudio.duration;
            
            bgAudio.currentTime = (clickX / width) * duration;
        });

        // Reset icon when audio ends
        bgAudio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            progressFill.style.width = '0%';
        });
    }
});
