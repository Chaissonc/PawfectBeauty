
// Carousel - only runs on pages that have it
const track = document.querySelector('.dog-track');
const carousel = document.querySelector('.dog-carousel-container');
if (track && carousel) {
    const images = Array.from(track.querySelectorAll('img'));
    images.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });

    // Auto-scrolls on its own; swiping, dragging or wheel-scrolling pauses it for 3s, then it carries on
    const PAUSE_MS = 3000;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let pos = 0;
    let paused = false;
    let resumeTimer = null;
    let last = performance.now();
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragging = false;

    function half() { return carousel.scrollWidth / 2; }

    // Two identical halves: keep the scroll position in the middle band so it loops both ways
    function wrap() {
        const h = half();
        let sl = carousel.scrollLeft;
        if (sl >= h * 1.5) { sl -= h; carousel.scrollLeft = sl; }
        else if (sl < h * 0.5) { sl += h; carousel.scrollLeft = sl; }
        return sl;
    }

    function pauseThenResume() {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
            pos = carousel.scrollLeft;
            paused = false;
        }, PAUSE_MS);
    }

    function start() {
        carousel.scrollLeft = half();
        pos = carousel.scrollLeft;
        last = performance.now();
        requestAnimationFrame(tick);
    }

    function tick(now) {
        const dt = Math.min(now - last, 100);
        last = now;
        if (!paused && !reduceMotion && !dragging) {
            const speed = mobileQuery.matches ? 35 : 45; // pixels per second
            pos += speed * dt / 1000;
            if (pos >= half() * 1.5) { pos -= half(); }
            carousel.scrollLeft = pos;
        }
        requestAnimationFrame(tick);
    }

    carousel.addEventListener('touchstart', pauseThenResume, { passive: true });
    carousel.addEventListener('touchend', pauseThenResume, { passive: true });
    carousel.addEventListener('wheel', pauseThenResume, { passive: true });

    // Any scroll we did not cause (momentum, keyboard, scrollbar) also pauses and re-wraps
    carousel.addEventListener('scroll', function () {
        if (Math.abs(carousel.scrollLeft - pos) > 3) {
            pauseThenResume();
            pos = wrap();
        }
    }, { passive: true });

    // Mouse drag on desktop
    carousel.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        dragging = true;
        dragStartX = e.clientX;
        dragStartScroll = carousel.scrollLeft;
        carousel.classList.add('is-dragging');
        carousel.setPointerCapture(e.pointerId);
        pauseThenResume();
    });
    carousel.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        carousel.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
        pauseThenResume();
    });
    function endDrag() {
        if (!dragging) return;
        dragging = false;
        carousel.classList.remove('is-dragging');
        pauseThenResume();
    }
    carousel.addEventListener('pointerup', endDrag);
    carousel.addEventListener('pointercancel', endDrag);

    start();
    window.addEventListener('resize', function () { pos = wrap(); });
}

// Testimonials auto-scroll (mobile only) - pauses 5s after a manual swipe
const testimonialsGrid = document.querySelector('.testimonials-grid');
if (testimonialsGrid) {
    const AUTO_INTERVAL = 4000;
    const RESUME_DELAY = 5000;
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    let autoTimer = null;
    let resumeTimer = null;

    function advance() {
        const cards = testimonialsGrid.querySelectorAll('.testimonial-card');
        if (!cards.length) return;
        const gap = parseFloat(getComputedStyle(testimonialsGrid).columnGap) || 0;
        const step = cards[0].getBoundingClientRect().width + gap;
        const maxScroll = testimonialsGrid.scrollWidth - testimonialsGrid.clientWidth;
        const nextLeft = testimonialsGrid.scrollLeft + step >= maxScroll - 5
            ? 0
            : testimonialsGrid.scrollLeft + step;
        testimonialsGrid.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }

    function stopAuto() {
        clearInterval(autoTimer);
        autoTimer = null;
    }

    function startAuto() {
        stopAuto();
        if (!isMobile()) return;
        autoTimer = setInterval(advance, AUTO_INTERVAL);
    }

    function onUserSwipe() {
        stopAuto();
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAuto, RESUME_DELAY);
    }

    testimonialsGrid.addEventListener('touchstart', onUserSwipe, { passive: true });
    testimonialsGrid.addEventListener('wheel', onUserSwipe, { passive: true });
    window.addEventListener('resize', startAuto);

    startAuto();
}


// Instagram card: 3 clips at a time on desktop, 1 on mobile; arrows step one clip at a time
(function () {
    var stage = document.querySelector('.ig-stage');
    if (!stage) return;
    var track = stage.querySelector('.ig-track');
    var tiles = stage.querySelectorAll('.ig-tile');
    var vids = stage.querySelectorAll('video');
    var prev = stage.querySelector('.ig-prev');
    var next = stage.querySelector('.ig-next');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var desktop = window.matchMedia('(min-width: 769px)');
    var current = 0;

    function perView() { return desktop.matches ? 3 : 1; }

    function update() {
        var max = Math.max(0, tiles.length - perView());
        if (current > max) { current = max; }
        track.style.transform = 'translateX(' + (-tiles[current].offsetLeft) + 'px)';
        vids.forEach(function (v, i) {
            var visible = i >= current && i < current + perView();
            if (visible && !reduce) {
                v.play().catch(function () {});
            } else {
                v.pause();
            }
        });
        prev.hidden = (current === 0);
        next.hidden = (current >= max);
    }

    prev.addEventListener('click', function () { current -= 1; update(); });
    next.addEventListener('click', function () { current += 1; update(); });
    desktop.addEventListener('change', update);
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
})();
