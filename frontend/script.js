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


setInterval(goToNext, 2000);


nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);


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


