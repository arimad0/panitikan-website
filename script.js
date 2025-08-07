document.addEventListener('DOMContentLoaded', () => {

    // Get all the necessary elements from the HTML
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const closeButton = document.querySelector('.close-button');
    const clickableImages = document.querySelectorAll('.clickable-image');

    // --- LOGIC TO OPEN THE MODAL ---
    clickableImages.forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('img');
            
            // Populate the modal with the correct image and description
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalDescription.textContent = img.dataset.description;

            // Show the modal
            modal.style.display = 'flex';
            
            // Prevent the main page from scrolling in the background
            document.body.style.overflow = 'hidden';
        });
    });

    // --- LOGIC TO CLOSE THE MODAL ---

    // A reusable function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        // Restore scrolling to the main page
        document.body.style.overflow = 'auto';
    }

    // 1. Close when the 'X' button is clicked
    closeButton.addEventListener('click', closeModal);

    // 2. Close when the dark background area is clicked
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // 3. Close when the 'Escape' key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
    
});