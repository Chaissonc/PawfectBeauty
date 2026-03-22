
const track = document.querySelector('.dog-track');
const images = Array.from(track.querySelectorAll('img'));

// Clone images for seamless infinite loop
images.forEach(img => {
    track.appendChild(img.cloneNode(true));
});
