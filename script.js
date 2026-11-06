
// Carousel - only runs on pages that have it
const track = document.querySelector('.dog-track');
if (track) {
    const images = Array.from(track.querySelectorAll('img'));
    images.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });
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
