// Encapsulate all logic within a main function
(function main() {
    console.log('Hello, World!');
    
    // Smooth Scrolling for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navbar Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-link');

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

    // Project Data for Modal
    const projectData = {
        'Shop drawings': {
            image: 'images/project1.jpg',
            alt: 'Shop drawings',
            description: 'Concurred detailed engineering and shop drawings 11',
            details: 'Developed comprehensive shop drawings and detailed engineering documents for various civil projects, using specialized software like StruBIM Steel.'
        },
        'Wind farms development': {
            image: 'images/project2.jpg',
            alt: 'Wind farms development',
            description: 'Managed the road modelling and documentation process',
            details: 'Led the road modeling and documentation efforts for wind farm projects in collaboration with a multi-disciplinary team.'
        },
        'Internal processes improvement': {
            image: 'images/project3.jpg',
            alt: 'Internal processes improvement',
            description: 'Aided in the optimization of internal processes',
            details: 'As a result of these efforts, I contributed to a dramatic reduction in project hours without compromising the quality of presentations.'
        },
        '...and more': {
            image: 'images/project3.jpg',
            alt: '...and more',
            description: 'Secondary roles',
            details: 'As a junior project engineer, I supported diverse projects by developing detailed documentation for industrial buildings and residential houses.'
        }
    };

    // Modal Logic
    const modalOverlay = document.querySelector('.modal-overlay');
    const modal = document.querySelector('.modal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalDetails = modal.querySelector('.project-details');

    // Function to open modal with project data
    function openModal(projectName) {
        console.log('Opening modal for:', projectName);
        const project = projectData[projectName];
        if (project) {
            modalImage.src = project.image;
            modalImage.alt = project.alt;
            modalTitle.textContent = projectName;
            modalDescription.textContent = project.description;
            modalDetails.textContent = project.details;
            modalOverlay.style.display = 'flex';
        }
    }

    // Event listeners for project cards
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Project cards:', projectCards);
    projectCards.forEach(card => {
        console.log('Card:', card);
        
        card.addEventListener('click', () => {
            const titleElement = card.querySelector('.project-title');
            const title = titleElement ? titleElement.textContent.trim() : '';
            if (title) {
                openModal(title);
            }
        });
    });

    // Close modal when clicking the close button
    const modalCloseButton = document.querySelector('.modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    // Keyboard Accessibility: Close modal with 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
        }
    });

    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        const totalItems = items.length;
        let carouselInterval;

        // Create dots dynamically based on carousel items
        items.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        // Function to update dots
        function updateDots() {
            document.querySelectorAll('.dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        // Function to navigate to a specific slide
        function goToSlide(index) {
            currentIndex = index;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        // Event listeners for prev and next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                goToSlide(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalItems;
                goToSlide(currentIndex);
            });
        }

        // Function to start auto-advance
        function startCarousel() {
            carouselInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                goToSlide(currentIndex);
            }, 5000);
        }

        // Function to stop auto-advance
        function stopCarousel() {
            clearInterval(carouselInterval);
        }

        // Start carousel
        startCarousel();

        // Pause carousel on mouse hover
        carousel.addEventListener('mouseenter', stopCarousel);

        // Resume carousel when mouse leaves
        carousel.addEventListener('mouseleave', startCarousel);
    }
})();
