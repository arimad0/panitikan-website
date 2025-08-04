document.addEventListener('DOMContentLoaded', () => {

    const cursorRing = document.querySelector('.cursor-ring');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorRing && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        });
    }

    const imageContainers = document.querySelectorAll('.clickable-image, #modalImage');
    imageContainers.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('image-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('image-hover'));
    });

    const otherInteractiveElements = document.querySelectorAll(
        'a, h1, h2, h3, .scroll-indicator, .close-button, .modal-content'
    );
    otherInteractiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });


    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    fadeElems.forEach(elem => observer.observe(elem));


    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeButton = document.querySelector('.close-button');
    const clickableImages = document.querySelectorAll('.clickable-image');

    function openModal(imgElement) {
        const description = imgElement.dataset.description || 'No description available.';
        
        modalImage.src = imgElement.src;
        modalImage.alt = imgElement.alt;
        modalDescription.textContent = description;
        
        modal.style.display = 'flex';
        setTimeout(() => { 
            modal.classList.add('is-visible');
        }, 10); 
        
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.remove('is-visible');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }, 400);
    }

    clickableImages.forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            if (img) {
                openModal(img);
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    const storyStart = document.getElementById('story-begins');

    if (scrollIndicator && storyStart) {
        scrollIndicator.addEventListener('click', () => {
            storyStart.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

});