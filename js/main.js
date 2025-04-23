/**
 * Orionware - Main JavaScript File
 * Implementa tutte le funzionalità interattive del sito web
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== LOADER =====
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-container');
        setTimeout(function() {
            loader.classList.add('loaded');
            // Rimuovi il loader dal DOM dopo l'animazione
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Chiudi il menu quando si clicca su un link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // ===== ANIMAZIONE NUMERI STATISTICHE =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 secondi per completare l'animazione
            const step = target / duration * 10; // Incremento per ogni 10ms
            let current = 0;
            
            const counter = setInterval(function() {
                current += step;
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 10);
        });
    }
    
    // Utilizziamo Intersection Observer per avviare l'animazione quando la sezione è visibile
    const statsSection = document.querySelector('.stats-banner');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // ===== TESTIMONIAL SLIDER =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Loop circolare
        if (index >= testimonialSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else {
            currentSlide = index;
        }
        
        testimonialSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        // Inizializza il primo slide
        showSlide(0);
        
        // Event listeners per navigazione
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        
        // Event listeners per dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto-play slider (ogni 5 secondi)
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== ANIMAZIONE RETE NEURALE AI =====
    function createNeuralNetwork() {
        const networkContainer = document.querySelector('.ai-network-animation');
        
        if (!networkContainer) return;
        
        // Numero di nodi e connessioni
        const numNodes = 20;
        const numConnections = 30;
        
        // Crea nodi
        for (let i = 0; i < numNodes; i++) {
            const node = document.createElement('div');
            node.classList.add('network-node');
            
            // Posiziona casualmente
            const x = Math.random() * 80 + 10; // Da 10% a 90%
            const y = Math.random() * 80 + 10; // Da 10% a 90%
            
            node.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: 6px;
                height: 6px;
                background-color: #cf354b;
                border-radius: 50%;
                opacity: 0.6;
                z-index: 3;
                animation: pulseNode 2s infinite alternate;
                animation-delay: ${Math.random()}s;
            `;
            
            networkContainer.appendChild(node);
        }
        
        // Crea connessioni
        for (let i = 0; i < numConnections; i++) {
            const connection = document.createElement('div');
            connection.classList.add('network-connection');
            
            // Posizione e dimensione casuale
            const x1 = Math.random() * 90 + 5;
            const y1 = Math.random() * 90 + 5;
            const width = Math.random() * 100 + 50;
            const angle = Math.random() * 360;
            
            connection.style.cssText = `
                position: absolute;
                left: ${x1}px;
                top: ${y1}px;
                width: ${width}px;
                height: 1px;
                background-color: rgba(207, 53, 75, 0.3);
                transform: rotate(${angle}deg);
                transform-origin: left center;
                z-index: 2;
                animation: fadeConnection 3s infinite alternate;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            networkContainer.appendChild(connection);
        }
    }
    
    // Aggiungi le animazioni per la rete neurale al foglio di stile
    function addNeuralNetworkStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseNode {
                0% { transform: scale(1); opacity: 0.3; }
                100% { transform: scale(1.5); opacity: 0.7; }
            }
            
            @keyframes fadeConnection {
                0% { opacity: 0.1; }
                100% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }
    
    addNeuralNetworkStyles();
    createNeuralNetwork();

    // ===== PARTICLE NETWORK IN HERO =====
    function createParticleNetwork() {
        const heroParticles = document.querySelector('.particle-network');
        
        if (!heroParticles) return;
        
        // Crea particelle
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posizione casuale
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 3 + 1;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                animation: floatParticle ${Math.random() * 15 + 5}s linear infinite;
                animation-delay: -${Math.random() * 10}s;
            `;
            
            heroParticles.appendChild(particle);
        }
    }
    
    // Aggiungi gli stili delle particelle
    function addParticleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(0) translateX(20px);
                }
                75% {
                    transform: translateY(20px) translateX(10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    addParticleStyles();
    createParticleNetwork();

    // ===== ANIMAZIONI SCROLL =====
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .project-card, .section-header, .ai-content, .ai-visual, .testimonial-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
            element.classList.add('scroll-animation');
        });
    }
    
    // Aggiungi gli stili per le animazioni di scroll
    function addScrollAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-animation {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .scroll-animation.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    addScrollAnimationStyles();
    initScrollAnimations();

    // ===== VALIDAZIONE FORM NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simuliamo l'invio del form
                emailInput.value = '';
                showNotification('Grazie per l\'iscrizione alla newsletter!', 'success');
            } else {
                showNotification('Per favore, inserisci un indirizzo email valido.', 'error');
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // ===== SISTEMA DI NOTIFICHE =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Aggiungi la classe per mostrare la notifica
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Aggiungi stili per le notifiche
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification-success {
                background-color: #4CAF50;
            }
            
            .notification-error {
                background-color: #F44336;
            }
            
            .notification-info {
                background-color: #2196F3;
            }
        `;
        document.head.appendChild(style);
    }
    
    addNotificationStyles();

    // ===== INIZIALIZZAZIONE ACTIVE STATE NEL MENU =====
    function setActiveMenuItem() {
        const currentPage = window.location.pathname.split('/').pop();
        const menuItems = document.querySelectorAll('.nav-links a');
        
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
            } else if (currentPage === '' && item.getAttribute('href') === 'index.html') {
                item.classList.add('active');
            }
        });
    }
    
    setActiveMenuItem();
});