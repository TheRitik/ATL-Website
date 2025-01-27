// Select carousel elements
const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const totalItems = items.length;

// Function to update the active slide
function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.remove('active');
    if (index === currentIndex) {
      item.classList.add('active');
    }
  });
}

// Go to the next slide
function goToNext() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}

// Go to the previous slide
function goToPrev() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
}

// Auto-slide every 3 seconds
setInterval(goToNext, 2000);

// Event listeners for buttons
nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);

// Initialize carousel on load
updateCarousel();
