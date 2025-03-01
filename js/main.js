document.addEventListener('DOMContentLoaded', function() {
    // Matterport Controls
    const matterportIframe = document.querySelector('.matterport-container iframe');
    
    // Fullscreen button
    const fullscreenBtn = document.querySelector('.mp-control.mp-fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (matterportIframe.requestFullscreen) {
                matterportIframe.requestFullscreen();
            } else if (matterportIframe.webkitRequestFullscreen) { /* Safari */
                matterportIframe.webkitRequestFullscreen();
            } else if (matterportIframe.msRequestFullscreen) { /* IE11 */
                matterportIframe.msRequestFullscreen();
            }
        });
    }
    
    // Dollhouse view button (pohled z výšky)
    const dollhouseBtn = document.querySelector('.mp-control.mp-dollhouse');
    if (dollhouseBtn) {
        dollhouseBtn.addEventListener('click', function() {
            // Posílání zprávy do iframe pro přepnutí do dollhouse pohledu
            // Toto funguje, pokud Matterport SDK podporuje postMessage
            matterportIframe.contentWindow.postMessage({
                type: 'application/x-matterport-postmessage',
                data: { name: 'mode.dollhouse' }
            }, '*');
        });
    }
    
    // Nápověda button
    const helpBtn = document.querySelector('.mp-control.mp-help');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            // Vytvoření modálního okna s nápovědou
            const helpModal = document.createElement('div');
            helpModal.className = 'help-modal';
            helpModal.innerHTML = `
                <div class="help-modal-content">
                    <h3>Navigace v 3D prohlídce</h3>
                    <ul>
                        <li><strong>Pohyb:</strong> Klikněte na místo, kam chcete jít</li>
                        <li><strong>Otáčení:</strong> Klikněte a táhněte myší</li>
                        <li><strong>Přiblížení/oddálení:</strong> Kolečko myši nebo gesta na trackpadu</li>
                        <li><strong>Pohled z výšky:</strong> Klikněte na ikonu domečku</li>
                    </ul>
                    <button class="close-help">Zavřít</button>
                </div>
            `;
            document.body.appendChild(helpModal);
            
            // Tlačítko pro zavření nápovědy
            const closeBtn = document.querySelector('.close-help');
            closeBtn.addEventListener('click', function() {
                helpModal.remove();
            });
            
            // Zavření po kliknutí mimo obsah
            helpModal.addEventListener('click', function(e) {
                if (e.target === helpModal) {
                    helpModal.remove();
                }
            });
        });
    }
    
    // FAQ toggling
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Toggle active class on the question
            question.classList.toggle('active');
            
            // Toggle the visibility of the answer
            const answer = question.nextElementSibling;
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .hero-cta a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
});
