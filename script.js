// Album data structure
const albums = [
    {
        title: "Poila Boishak 23",
        images: [
            "images/pb23/image1.jpg",
            "images/pb23/image2.jpg",
            "images/pb23/image3.jpg"
        ]
    },
    {
        title: "Poila Boishak 24",
        images: [
            "images/pb24/image1.jpg",
            "images/pb24/image2.jpg",
            "images/pb24/image3.jpg"
        ]
    },
    {
        title: "Saraswati Puja 24",
        images: [
            "images/sp24/image1.jpg",
            "images/sp24/image2.jpg",
            "images/sp24/image3.jpg"
        ]
    }
];

// Background slideshow variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-container img');

// Album slideshow variables
let currentAlbum = 0;
let currentSlideIndex = 0;

// Background slideshow function
function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Initialize background slideshow
setInterval(showNextSlide, 5000);
slides[currentSlide].classList.add('active');

// Album slideshow functions

function openSlideshow(albumIndex) {
    currentAlbum = albumIndex;
    currentSlideIndex = 0;
    const modal = document.querySelector('.slideshow-modal');
    const modalImg = modal.querySelector('img');
    
    modal.style.display = 'block';
    modalImg.src = albums[currentAlbum].images[currentSlideIndex];
    
    // Trigger reflow to ensure transition works
    modalImg.offsetHeight;
    modalImg.classList.remove('fade-out');
}
function closeSlideshow() {
    document.querySelector('.slideshow-modal').style.display = 'none';
}

function changeSlide(direction) {
    const modalImg = document.querySelector('.modal-content img');
    modalImg.classList.add('fade-out');
    
    setTimeout(() => {
        currentSlideIndex += direction;
        const albumLength = albums[currentAlbum].images.length;
        
        if (currentSlideIndex >= albumLength) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = albumLength - 1;
        
        modalImg.src = albums[currentAlbum].images[currentSlideIndex];
        modalImg.classList.remove('fade-out');
    }, 500);
}

// Close modal when clicking outside the image
document.querySelector('.slideshow-modal').addEventListener('click', function(e) {
    if (e.target.classList.contains('slideshow-modal')) {
        closeSlideshow();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.slideshow-modal').style.display === 'block') {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Escape') closeSlideshow();
    }
});

