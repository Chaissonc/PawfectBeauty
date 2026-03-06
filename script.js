
    const track = document.querySelector('.dog-track');
    const next = document.querySelector('#dogNext');
    const prev = document.querySelector('#dogPrev');
    const dogCount = document.querySelectorAll('.dog-track img').length;
    
    let index = 0;
    const dogsVisible = 7;

    next.addEventListener('click', () => {
        // Stop sliding when we reach the last set of 7
        if (index < dogCount - dogsVisible) {
            index++;
            updateSlide();
        } else {
            index = 0; // Loop back to start
            updateSlide();
        }
    });

    prev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateSlide();
        }
    });

    function updateSlide() {
        const movePercentage = index * (100 / dogsVisible);
        track.style.transform = `translateX(-${movePercentage}%)`;
    }
