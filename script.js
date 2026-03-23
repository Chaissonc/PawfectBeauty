
// Contact form - Formspree AJAX submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const data = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            contactForm.reset();
            document.getElementById('form-success-overlay').style.display = 'flex';
        } else {
            alert('Something went wrong. Please try again or email us directly.');
        }
    });
}

// Carousel - only runs on pages that have it
const track = document.querySelector('.dog-track');
if (track) {
    const images = Array.from(track.querySelectorAll('img'));
    images.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });
}

