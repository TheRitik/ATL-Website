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
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
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
        const response = await fetch('https://sneh-atl-website.onrender.com/api/events');
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
                window.location.href = `imageGallery.html?eventId=${event.eventId}`; // Redirect to gallery page
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


async function fetchEventImages() {
  // Get the eventId from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('eventId');

  if (!eventId) {
      console.error('Event ID not found in URL');
      return;
  }

  try {
      const response = await fetch(`https://sneh-atl-website.onrender.com/api/events/${eventId}`);
      const eventData = await response.json();
      console.log('Event Data:', eventData);

      // Update the gallery heading and description dynamically
      document.querySelector('.heading h1').textContent = eventData.title || 'Event Gallery';
      document.querySelector('.description p').textContent = eventData.description || 'No description available.';

      // Populate the image gallery
      const galleryContainer = document.querySelector('.image-gallery');
      galleryContainer.innerHTML = ''; // Clear any existing images

      if (eventData.images && eventData.images.length > 0) {
          eventData.images.forEach(imageSrc => {
              const imageCard = document.createElement('div');
              imageCard.classList.add('image-card');

              const imgElement = document.createElement('img');
              imgElement.src = imageSrc;
              imgElement.alt = 'Event Image';
              imgElement.classList.add('gallery-image');
              imgElement.onclick = () => openLightbox(imageSrc); // Open in lightbox on click

              imageCard.appendChild(imgElement);
              galleryContainer.appendChild(imageCard);
          });
      } else {
          const noImagesMessage = document.createElement('p');
          noImagesMessage.textContent = 'No images available for this event.';
          galleryContainer.appendChild(noImagesMessage);
      }
  } catch (err) {
      console.error('Error fetching event data:', err);
  }
}

// Call the function
fetchEventImages();
});


