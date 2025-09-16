/**
 * Orionware - Client Showcase Component
 * Gestisce la rotazione automatica dei loghi clienti
 * Versione: 1.1 - Fix sovrapposizione loghi
 */

class ClientShowcase {
    constructor() {
        // Elementi DOM
        this.logos = document.querySelectorAll('.client-logo');
        this.dots = document.querySelectorAll('.indicator-dot');
        this.progressBar = document.querySelector('.progress-bar');
        
        // Configurazione
        this.currentIndex = 0;
        this.interval = null;
        this.progressInterval = null;
        this.duration = 4000; // 4 secondi per logo
        this.transitionDelay = 200; // Delay per le transizioni
        
        // Verifica se gli elementi esistono
        if (this.logos.length === 0 || this.dots.length === 0) {
            console.warn('ClientShowcase: Elementi non trovati nella pagina');
            return;
        }
        
        // Inizializza il componente
        this.init();
    }
    
    /**
     * Imposta lo stato iniziale corretto per evitare sovrapposizioni
     */
    setupInitialState() {
        console.log('ClientShowcase: Impostazione stato iniziale...');
        
        // Nascondi tutti i loghi
        this.logos.forEach((logo, index) => {
            logo.classList.remove('active', 'fade-out');
            if (index === 0) {
                // Mostra solo il primo logo
                logo.classList.add('active');
            }
        });
        
        // Attiva il primo dot
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === 0) {
                dot.classList.add('active');
            }
        });
        
        // Reset dell'indice
        this.currentIndex = 0;
        
        console.log('ClientShowcase: Stato iniziale impostato - Logo 0 attivo');
    }
    
    /**
     * Inizializza il componente
     */
    init() {
        console.log('ClientShowcase: Inizializzazione...');
        
        // Imposta lo stato iniziale corretto - FIX per sovrapposizione
        this.setupInitialState();
        
        // Aggiungi event listeners ai dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetInterval();
            });
        });
        
        // Gestisci la visibilità della pagina (pausa quando non è visibile)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
        
        // Pausa al hover sulla sezione
        const clientsSection = document.querySelector('.clients-section');
        if (clientsSection) {
            clientsSection.addEventListener('mouseenter', () => this.pause());
            clientsSection.addEventListener('mouseleave', () => this.resume());
        }
        
        // Avvia la rotazione automatica
        this.startAutoRotation();
        
        console.log(`ClientShowcase: Inizializzato con ${this.logos.length} loghi`);
    }
    
    /**
     * Va a un slide specifico
     * @param {number} index - Indice del slide di destinazione
     */
    goToSlide(index) {
        // Validazione dell'indice
        if (index < 0 || index >= this.logos.length) {
            console.warn('ClientShowcase: Indice non valido:', index);
            return;
        }
        
        // Se è già il slide corrente, non fare nulla
        if (index === this.currentIndex) {
            return;
        }
        
        console.log(`ClientShowcase: Passaggio da ${this.currentIndex} a ${index}`);
        
        // Rimuovi classe active dal logo corrente
        this.logos[this.currentIndex].classList.remove('active');
        this.logos[this.currentIndex].classList.add('fade-out');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Dopo il delay di transizione, mostra il nuovo logo
        setTimeout(() => {
            // Rimuovi fade-out dal logo precedente
            this.logos[this.currentIndex].classList.remove('fade-out');
            
            // Aggiorna l'indice corrente
            this.currentIndex = index;
            
            // Attiva il nuovo logo e dot
            this.logos[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');
            
            // Restart dell'animazione della progress bar
            this.restartProgressBar();
            
        }, this.transitionDelay);
    }
    
    /**
     * Va al slide successivo
     */
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.logos.length;
        this.goToSlide(nextIndex);
    }
    
    /**
     * Avvia la rotazione automatica
     */
    startAutoRotation() {
        // Pulisci eventuali interval esistenti
        this.clearIntervals();
        
        // Avvia il nuovo interval
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.duration);
        
        // Avvia l'animazione della progress bar
        this.restartProgressBar();
        
        console.log('ClientShowcase: Rotazione automatica avviata');
    }
    
    /**
     * Ferma la rotazione automatica
     */
    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            
            // Pausa anche l'animazione della progress bar
            if (this.progressBar) {
                this.progressBar.style.animationPlayState = 'paused';
            }
            
            console.log('ClientShowcase: Rotazione in pausa');
        }
    }
    
    /**
     * Riprende la rotazione automatica
     */
    resume() {
        if (!this.interval) {
            this.startAutoRotation();
            
            // Riprende l'animazione della progress bar
            if (this.progressBar) {
                this.progressBar.style.animationPlayState = 'running';
            }
            
            console.log('ClientShowcase: Rotazione ripresa');
        }
    }
    
    /**
     * Reset degli interval (per i click sui dots)
     */
    resetInterval() {
        this.startAutoRotation();
    }
    
    /**
     * Pulisce tutti gli interval attivi
     */
    clearIntervals() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
    
    /**
     * Restart dell'animazione della progress bar
     */
    restartProgressBar() {
        if (this.progressBar) {
            // Forza il reset completo dell'animazione
            this.progressBar.style.animation = 'none';
            this.progressBar.style.width = '0%';
            
            // Forza il reflow del browser
            this.progressBar.offsetHeight;
            
            // Riapplica l'animazione dopo un frame
            requestAnimationFrame(() => {
                this.progressBar.style.animation = 'progress 4s linear infinite';
            });
        }
    }
    
    /**
     * Distruggi il componente (cleanup)
     */
    destroy() {
        console.log('ClientShowcase: Cleanup...');
        
        // Ferma tutti gli interval
        this.clearIntervals();
        
        // Rimuovi event listeners (se necessario per SPA)
        this.dots.forEach(dot => {
            dot.replaceWith(dot.cloneNode(true));
        });
        
        // Reset dello stato
        this.currentIndex = 0;
        
        console.log('ClientShowcase: Cleanup completato');
    }
}

/**
 * Inizializza il componente quando il DOM è pronto
 */
function initClientShowcase() {
    // Verifica che gli elementi esistano prima di inizializzare
    const clientsSection = document.querySelector('.clients-section');
    
    if (clientsSection) {
        // Crea una nuova istanza del componente
        window.clientShowcase = new ClientShowcase();
        console.log('ClientShowcase: Componente inizializzato con successo');
    } else {
        console.log('ClientShowcase: Sezione non trovata, skip inizializzazione');
    }
}

// Inizializzazione automatica
if (document.readyState === 'loading') {
    // DOM non ancora caricato
    document.addEventListener('DOMContentLoaded', initClientShowcase);
    console.log('ClientShowcase: In attesa del DOM...');
} else {
    // DOM già caricato
    initClientShowcase();
}

// Export per uso in moduli (se necessario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClientShowcase;
}