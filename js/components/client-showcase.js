/**
 * Orionware - Client Showcase Component
 * Animazione slide orizzontale: DESTRA → CENTRO → SINISTRA
 * Versione: 3.0 - Slide animation
 */

class ClientShowcase {
    constructor() {
        // Elementi DOM
        this.slides = document.querySelectorAll('.client-slide');
        this.dots = document.querySelectorAll('.indicator-dot');
        this.progressBar = document.querySelector('.progress-bar');
        
        // Configurazione
        this.currentIndex = 0;
        this.interval = null;
        this.duration = 4000; // 4 secondi per slide
        this.animationDuration = 800; // Durata transizione CSS
        
        // Verifica se gli elementi esistono
        if (this.slides.length === 0 || this.dots.length === 0) {
            console.warn('ClientShowcase: Elementi non trovati nella pagina');
            return;
        }
        
        // Inizializza il componente
        this.init();
    }
    
    /**
     * Imposta lo stato iniziale
     */
    setupInitialState() {
        console.log('ClientShowcase: Impostazione stato iniziale slide...');
        
        // Imposta tutte le slide come "entering" (fuori schermo a destra)
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'exiting', 'entering');
            if (index === 0) {
                // Prima slide attiva al centro
                slide.classList.add('active');
            } else {
                // Altre slide in attesa fuori schermo
                slide.classList.add('entering');
            }
        });
        
        // Attiva il primo dot
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === 0) {
                dot.classList.add('active');
            }
        });
        
        this.currentIndex = 0;
        console.log('ClientShowcase: Prima slide attiva al centro');
    }
    
    /**
     * Inizializza il componente
     */
    init() {
        console.log('ClientShowcase: Inizializzazione animazione slide...');
        
        // Imposta stato iniziale
        this.setupInitialState();
        
        // Event listeners per i dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.pauseAutoRotation();
                    this.goToSlide(index);
                    this.startAutoRotation();
                }
            });
        });
        
        // Event listeners per hover (pausa rotazione)
        const showcase = document.querySelector('.client-showcase');
        if (showcase) {
            showcase.addEventListener('mouseenter', () => this.pauseAutoRotation());
            showcase.addEventListener('mouseleave', () => this.startAutoRotation());
        }
        
        // Event listeners per i link clienti
        this.setupClientClickHandlers();
        
        // Avvia rotazione automatica
        this.startAutoRotation();
    }
    
    /**
     * Configura i click sui link dei clienti
     */
    setupClientClickHandlers() {
        this.slides.forEach((slide) => {
            const link = slide.querySelector('.client-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    // Permettere click solo su slide attiva
                    if (!slide.classList.contains('active')) {
                        e.preventDefault();
                        return false;
                    }
                    
                    // Pausa temporanea dopo click
                    this.pauseAutoRotation();
                    setTimeout(() => {
                        this.startAutoRotation();
                    }, 8000);
                    
                    // Log per analytics
                    const clientName = slide.getAttribute('data-client');
                    console.log(`ClientShowcase: Click su ${clientName}`);
                });
            }
        });
    }
    
    /**
     * Animazione slide: DESTRA → CENTRO → SINISTRA
     */
    goToSlide(targetIndex) {
        if (targetIndex === this.currentIndex) return;
        
        console.log(`ClientShowcase: Slide ${this.currentIndex} → ${targetIndex}`);
        
        const currentSlide = this.slides[this.currentIndex];
        const targetSlide = this.slides[targetIndex];
        
        // FASE 1: Slide corrente esce verso sinistra
        if (currentSlide) {
            currentSlide.classList.remove('active');
            currentSlide.classList.add('exiting');
        }
        
        // FASE 2: Nuova slide entra da destra (dopo piccolo delay)
        setTimeout(() => {
            if (targetSlide) {
                targetSlide.classList.remove('entering');
                targetSlide.classList.add('active');
            }
            
            // Aggiorna dots
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === targetIndex);
            });
            
            // Aggiorna indice
            this.currentIndex = targetIndex;
            
        }, 100); // Piccolo delay per transizione più fluida
        
        // FASE 3: Cleanup dopo animazione completata
        setTimeout(() => {
            // Reset di tutte le slide non attive
            this.slides.forEach((slide, index) => {
                if (index !== this.currentIndex) {
                    slide.classList.remove('active', 'exiting');
                    slide.classList.add('entering');
                }
            });
        }, this.animationDuration);
    }
    
    /**
     * Passa alla slide successiva
     */
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    /**
     * Avvia rotazione automatica
     */
    startAutoRotation() {
        this.pauseAutoRotation();
        
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.duration);
        
        // Restart progress bar animation
        if (this.progressBar) {
            this.progressBar.style.animation = 'none';
            this.progressBar.offsetHeight; // Trigger reflow
            this.progressBar.style.animation = `progress ${this.duration}ms linear infinite`;
        }
        
        console.log('ClientShowcase: Rotazione automatica avviata');
    }
    
    /**
     * Ferma rotazione automatica
     */
    pauseAutoRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        console.log('ClientShowcase: Rotazione automatica fermata');
    }
    
    /**
     * Cleanup
     */
    destroy() {
        this.pauseAutoRotation();
        console.log('ClientShowcase: Componente distrutto');
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    window.clientShowcase = new ClientShowcase();
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (window.clientShowcase) {
        window.clientShowcase.destroy();
    }
});