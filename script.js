document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Dynamic Text Highlight on Scroll (Enhanced)
    const highlightSection = document.querySelector('.large-text');
    if (highlightSection) {
        // Split text into words
        const text = highlightSection.innerText;
        highlightSection.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');

        const words = highlightSection.querySelectorAll('span');

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            root: null,
            threshold: 1.0,
            rootMargin: "-20% 0px -20% 0px" // Trigger when word is in the center 60% of screen
        });

        words.forEach(word => scrollObserver.observe(word));
    }

    // Navbar Blur Effect Enhancement
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(22, 22, 23, 0.95)';
            navbar.style.boxShadow = '0 1px 0 0 rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'rgba(22, 22, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Modal Interactions
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalTags = document.getElementById('modal-tags');
    const closeModal = document.querySelector('.close-modal');
    const projectItems = document.querySelectorAll('.bento-item');

    if (modal) {
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const hiddenDetails = item.querySelector('.hidden-details');
                if (!hiddenDetails) return;

                const title = item.querySelector('h3').innerText;
                const tags = item.querySelector('.project-tags').cloneNode(true);
                const detailsHtml = hiddenDetails.innerHTML;

                modalTitle.innerText = title;
                modalTags.innerHTML = '';
                modalTags.appendChild(tags);
                modalBody.innerHTML = detailsHtml;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        function hideModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (closeModal) {
            closeModal.addEventListener('click', hideModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                hideModal();
            }
        });
    }
});
