/**
 * Ké HAMZA - Standalone Animation Engine
 * Real Events in Algeria · Decoupled from Framer · Pure Vanilla JS
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. Real Algerian Works & Events Data
    // =========================================================================
    const WORKS_DATA = [
        {
            id: 'algerian-sports-festival',
            title: 'Festival des Sports d’Alger',
            year: '2024 — 2025',
            image: 'assets/images/real-algerian-sports-festival.jpg',
            link: './works.html'
        },
        {
            id: 'sports-expo-safex',
            title: 'Sport Exhibition Expo (SAFEX)',
            year: '2024',
            image: 'assets/images/real-algerian-safex.jpg',
            link: './works.html'
        },
        {
            id: 'real-estate-safex',
            title: 'Real Estate Marketing (SAFEX)',
            year: '2024',
            image: 'assets/images/real-algerian-real-estate.jpg',
            link: './works.html'
        },
        {
            id: 'nestle-activation',
            title: 'Nestlé Marketing Supervisor Team',
            year: '2023',
            image: 'assets/images/nestle-marketing.jpg',
            link: './works.html'
        },
        {
            id: 'restaurant-branding-alger',
            title: 'Food & Restaurant Branding Alger',
            year: '2023',
            image: 'assets/images/real-algerian-restaurant.jpg',
            link: './works.html'
        },
        {
            id: 'flipex-center',
            title: 'Flipex Center (English & AI)',
            year: '2025',
            image: 'assets/images/flipex-center.jpg',
            link: './works.html'
        },
        {
            id: 'stadium-sports-events',
            title: 'Nelson Mandela Stadium Events',
            year: '2023 — 2024',
            image: 'assets/images/real-algerian-stadium.jpg',
            link: './works.html'
        }
    ];

    // =========================================================================
    // 2. Preloader
    // =========================================================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const percentEl = document.getElementById('preloader-percent');
        const barEl = document.getElementById('preloader-bar');

        if (!preloader || !percentEl || !barEl) {
            document.body.classList.add('is-loaded');
            return;
        }

        const duration = 1800; // 1.8 seconds duration
        const startTime = performance.now();

        // Easing function cubic-bezier(0.55, 0, 0.35, 1) approximation
        function ease(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function updateProgress(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = ease(progress);
            const percent = Math.round(eased * 100);

            percentEl.textContent = `${percent}%`;
            barEl.style.width = `${eased * 100}%`;

            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                // Completed: hold briefly, then fade out smoothly
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    document.body.classList.remove('no-scroll');
                    document.body.classList.add('is-loaded');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800);
                }, 220);
            }
        }

        requestAnimationFrame(updateProgress);
    }

    // =========================================================================
    // 3. Rolling Text Hover Navigation
    // =========================================================================
    function initRollingText() {
        const rollingWraps = document.querySelectorAll('.rolling-text-wrap');

        rollingWraps.forEach(wrap => {
            const text = wrap.getAttribute('data-text') || wrap.textContent.trim();
            wrap.innerHTML = '';

            Array.from(text).forEach((char, index) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'rolling-char';
                charSpan.textContent = char;
                // 30ms stagger between letters
                charSpan.style.transitionDelay = `${index * 30}ms`;
                wrap.appendChild(charSpan);
            });
        });
    }

    // =========================================================================
    // 4. Hero Title Color Cycler
    // =========================================================================
    function initColorCycler() {
        const titleEl = document.getElementById('hero-title');
        if (!titleEl) return;

        const colors = [
            '#FFF75E', // Yellow
            '#FFFFFF', // White
            '#B6FAA5'  // Mint Green
        ];

        let currentIndex = 0;
        const holdTime = 2000; // 2 seconds hold

        function nextColor() {
            currentIndex = (currentIndex + 1) % colors.length;
            titleEl.style.color = colors[currentIndex];
            setTimeout(nextColor, holdTime + 2500);
        }

        // Initial color setup
        titleEl.style.color = colors[0];
        setTimeout(nextColor, holdTime);
    }

    // =========================================================================
    // 5. Floating Interactive Cards Canvas (Exact Math & Physics)
    // =========================================================================
    function initHeroCanvas() {
        const canvasContainer = document.getElementById('hero-canvas');
        if (!canvasContainer) return;

        // Mathematical helper functions from Framer model
        function pseudoRandom(e) {
            const t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
            return t - Math.floor(t);
        }

        function moduloLoop(val, max) {
            return max <= 0 ? 0 : ((val % max) + max) % max;
        }

        function centerFactor(distNorm) {
            return 0.5 * (1 + Math.cos(Math.PI * Math.min(Math.abs(distNorm), 1)));
        }

        function createCardLayout(index, total, geo, tiltIntensity) {
            const loopDistance = geo.containerWidth + geo.cardWidth * 2;
            const step = loopDistance / Math.max(total, 1);
            return {
                loop: loopDistance,
                basePosition: index * step + pseudoRandom(index * 5.3) * step * 0.35,
                swingSign: index % 2 === 0 ? -1 : 1,
                swingScale: 0.8 + pseudoRandom(index * 2.17) * 0.35,
                tilt: (pseudoRandom(index * 9.71) * 2 - 1) * tiltIntensity
            };
        }

        function calculateCardX(layout, geo, offset) {
            return moduloLoop(layout.basePosition + offset, layout.loop) - geo.cardWidth;
        }

        function calculateZoomFactor(geo, x) {
            const halfWidth = geo.containerWidth / 2;
            return centerFactor((x + geo.cardWidth / 2 - halfWidth) / Math.max(halfWidth, 1));
        }

        function calculateCardY(layout, geo, zoomFactor) {
            const arcRadius = (geo.arcHeight / 100) * (geo.containerHeight / 2) * layout.swingScale;
            return geo.containerHeight / 2 + layout.swingSign * zoomFactor * arcRadius - geo.cardHeight / 2;
        }

        // Geometry state
        const geo = {
            containerWidth: window.innerWidth,
            containerHeight: window.innerHeight,
            cardWidth: 180,
            cardHeight: 135,
            arcHeight: 65,     // 65% arc amplitude
            centreZoom: 0.18,  // 18% center zoom
            speed: 22          // pixels per second
        };

        function updateCardDimensions() {
            const w = window.innerWidth;
            geo.containerWidth = w;
            geo.containerHeight = window.innerHeight;

            if (w < 810) {
                // Mobile
                geo.cardWidth = 96;
                geo.cardHeight = 72;
                geo.speed = 15;
            } else if (w < 1200) {
                // Tablet
                geo.cardWidth = 148;
                geo.cardHeight = 111;
                geo.speed = 18;
            } else {
                // Desktop
                geo.cardWidth = 180;
                geo.cardHeight = 135;
                geo.speed = 22;
            }
        }

        updateCardDimensions();

        // Build DOM elements for each card
        const cardElements = [];
        let layouts = [];

        WORKS_DATA.forEach((work, index) => {
            const cardLink = document.createElement('a');
            cardLink.className = 'floating-card';
            cardLink.href = work.link;
            cardLink.setAttribute('aria-label', work.title);

            cardLink.innerHTML = `
                <div class="card-inner">
                    <img class="card-img" src="${work.image}" alt="${work.title}" draggable="false" loading="lazy">
                </div>
                <div class="card-label">
                    <span class="card-label-title">${work.title}</span>
                    <span class="card-label-year">${work.year}</span>
                </div>
            `;

            // Hover interactions
            cardLink.addEventListener('mouseenter', () => {
                canvasContainer.classList.add('has-hovered');
                cardLink.classList.add('is-hovered');
            });

            cardLink.addEventListener('mouseleave', () => {
                canvasContainer.classList.remove('has-hovered');
                cardLink.classList.remove('is-hovered');
            });

            canvasContainer.appendChild(cardLink);
            cardElements.push(cardLink);
        });

        function refreshLayouts() {
            updateCardDimensions();
            layouts = WORKS_DATA.map((_, i) => createCardLayout(i, WORKS_DATA.length, geo, 0));
        }

        refreshLayouts();
        window.addEventListener('resize', refreshLayouts);

        // Motion & Physics State
        let targetOffset = 0;
        let currentOffset = 0;
        let lastTimestamp = performance.now();

        // Scroll boost
        window.addEventListener('wheel', (e) => {
            targetOffset += e.deltaY * 0.45;
        }, { passive: true });

        // Physics render loop
        function tick(timestamp) {
            const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
            lastTimestamp = timestamp;

            // Constant drift
            targetOffset += geo.speed * dt;

            // Spring smoothing
            currentOffset += (targetOffset - currentOffset) * 0.08;

            // Position each card
            cardElements.forEach((cardEl, i) => {
                const layout = layouts[i];
                if (!layout) return;

                const x = calculateCardX(layout, geo, currentOffset);
                const zoomFactor = calculateZoomFactor(geo, x);
                const y = calculateCardY(layout, geo, zoomFactor);

                const centerScale = 1 + zoomFactor * geo.centreZoom;

                // Apply geometry
                cardEl.style.width = `${geo.cardWidth}px`;
                cardEl.style.height = `${geo.cardHeight}px`;
                cardEl.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${centerScale.toFixed(3)})`;
            });

            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    // =========================================================================
    // 6. Mobile Navigation Drawer
    // =========================================================================
    function initMobileMenu() {
        const toggleBtn = document.getElementById('menu-toggle');
        const drawer = document.getElementById('mobile-drawer');

        if (!toggleBtn || !drawer) return;

        toggleBtn.addEventListener('click', () => {
            const isOpen = toggleBtn.classList.toggle('active');
            drawer.classList.toggle('open', isOpen);
            document.body.classList.toggle('no-scroll', isOpen);
        });

        // Close on link click
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.classList.remove('active');
                drawer.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // =========================================================================
    // Initialize everything once DOM is ready
    // =========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initPreloader();
        initRollingText();
        initColorCycler();
        initHeroCanvas();
        initMobileMenu();
    }
})();
