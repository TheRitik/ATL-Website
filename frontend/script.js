document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const items = document.querySelectorAll('.carousel-item');

  let currentIndex = 0;
  const totalItems = items.length;

  function updateCarousel() {
    items.forEach((item, index) => {
      item.classList.remove('active');
      if (index === currentIndex) {
        item.classList.add('active');
      }
    });
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  // Ensure the buttons exist before adding event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNext);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrev);
  }

  // Automatically move to the next item every 2 seconds
  setInterval(goToNext, 2000);

  updateCarousel();

  function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    lightboxImage.src = imageSrc;
    lightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("hidden");
  }

  
  // Fetch and display all events
  async function fetchEvents() {
    try {
        // Fetch data from the API
        const response = await fetch('http://localhost:5000/api/events');
        const events = await response.json();
        console.log('API Response:', events);

        // Get references to the card container and template
        const cardContainer = document.getElementById('card-container');
        const cardTemplate = document.getElementById('card-template');
        cardTemplate.style.display = 'none'; // Hide the template itself

        // Dynamically create event cards
        events.forEach(event => {
            const card = cardTemplate.cloneNode(true); // Clone the template
            card.style.display = 'block'; // Make the cloned card visible

            // Populate the card with event data
            card.querySelector('.card-img').src = event.thumbnail || 'placeholder.jpg'; // Use thumbnail or a placeholder
            card.querySelector('.card-title').textContent = event.title || 'Untitled Event'; // Use the title
            card.querySelector('.card-description').textContent = event.description || 'No description available.'; // Use the description

            // Add click event to "View More" button
            card.querySelector('.view-more-btn').onclick = () => {
                window.location.href = `imageGallery.html?id=${event._id}`; // Redirect to gallery page
            };

            // Append the card to the container
            cardContainer.appendChild(card);
        });
    } catch (err) {
        console.error('Error fetching events:', err);
    }
}

// Call the function to load events when the page loads
fetchEvents();

});
