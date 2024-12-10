document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const projectData = {
    'E-commerce Platform': {
        image: 'images/project1.jpg',
        alt: 'E-commerce website showcase, modern minimal design',
        description: 'A comprehensive e-commerce solution built with React and Node.js. Features include user authentication, product management, shopping cart functionality, payment integration with Stripe, and order tracking. The platform supports multiple vendors and includes an admin dashboard for inventory management.',
        details: 'Technologies used: React, Redux, Node.js, Express, MongoDB, Stripe API, AWS S3 for image storage. The application follows a microservices architecture and implements real-time updates using WebSocket connections.'
    },
    'Fitness Tracker App': {
        image: 'images/project2.jpg',
        alt: 'Mobile app interface, dark theme',
        description: 'A comprehensive mobile application for tracking fitness progress and nutrition. Users can log workouts, track calories, set goals, and view progress analytics. The app includes social features for connecting with other fitness enthusiasts.',
        details: 'Built with React Native and Firebase. Features include push notifications, offline support, and integration with popular fitness devices through their APIs.'
    },
    'Analytics Dashboard': {
        image: 'images/project3.jpg',
        alt: 'Data visualization dashboard',
        description: 'A real-time analytics dashboard that visualizes complex business metrics in an intuitive interface. The platform processes large datasets and presents them through interactive charts and graphs.',
        details: 'Developed using Vue.js, D3.js for visualizations, and a Python backend. Implements WebSocket connections for real-time updates and includes export functionality for reports.'
    }
};

const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('img');
const modalTitle = modal.querySelector('h2');
const modalDescription = modal.querySelector('p');
const modalDetails = modal.querySelector('.project-details');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const project = projectData[title];

        modalImage.src = project.image;
        modalImage.alt = project.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = project.description;
        modalDetails.textContent = project.details;

        modalOverlay.style.display = 'flex';
        modal.classList.add('active');
    });
});

document.querySelector('.modal-close').addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    modal.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        modal.classList.remove('active');
    }
});

// Carousel code
const carousel = document.querySelector('.carousel');
const items = carousel.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Create dots
items.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    goToSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
});

// Auto-advance carousel
setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
}, 5000);
