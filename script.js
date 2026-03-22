
// Carousel - only runs on pages that have it
const track = document.querySelector('.dog-track');
if (track) {
    const images = Array.from(track.querySelectorAll('img'));
    images.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });
}

