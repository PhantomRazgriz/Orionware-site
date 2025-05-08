/**
 * Orionware - Services Tab Manager
 * Gestisce le interazioni dei tab nella sezione servizi
 */

class ServicesTabManager {
    constructor() {
        // Elementi UI
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        
        // Animazioni
        this.isAnimating = false;
        this.animationDuration = 500; // ms
        
        // Inizializzazione
        this.init();
    }
    
    /**
     * Inizializza gli event listener e lo stato iniziale
     */
    init() {
        // Aggiungi event listener a ogni tab button
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleTabClick(e));
        });
        
        // Configura stato iniziale (prima tab attiva)
        if (this.tabButtons.length > 0 && this.tabPanels.length > 0) {
            this.tabButtons[0].classList.add('active');
            this.tabPanels[0].classList.add('active');
        }
        
        // Aggiungi listener per il resize per migliorare la responsività
        window.addEventListener('resize', () => this.handleResize());
        
        // Correggi lo scroll orizzontale per la navigazione su mobile
        this.setupMobileScrolling();
    }
    
    /**
     * Gestisce il click su un tab
     * @param {Event} e - Evento click
     */
    handleTabClick(e) {
        // Previeni doppi click durante l'animazione
        if (this.isAnimating) return;
        
        const clickedButton = e.currentTarget;
        
        // Se il tab è già attivo, non fare nulla
        if (clickedButton.classList.contains('active')) return;
        
        // Blocca durante l'animazione
        this.isAnimating = true;
        
        // Rimuovi la classe active da tutti i tab e panel
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Aggiungi classe active al tab cliccato
        clickedButton.classList.add('active');
        
        // Trova e attiva il panel corrispondente
        const targetService = clickedButton.getAttribute('data-service');
        const targetPanel = document.getElementById(`${targetService}-panel`);
        
        if (targetPanel) {
            // Anima l'uscita del panel attivo corrente
            const activePanel = Array.from(this.tabPanels).find(panel => 
                panel.classList.contains('active'));
            
            if (activePanel) {
                // Anima l'uscita
                activePanel.style.opacity = '0';
                activePanel.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    // Disattiva il vecchio panel
                    activePanel.classList.remove('active');
                    activePanel.style.removeProperty('opacity');
                    activePanel.style.removeProperty('transform');
                    
                    // Attiva nuovo panel con animazione
                    targetPanel.classList.add('active');
                    targetPanel.style.opacity = '0';
                    targetPanel.style.transform = 'translateY(10px)';
                    
                    // Forza reflow per avviare nuova animazione
                    void targetPanel.offsetWidth;
                    
                    targetPanel.style.opacity = '1';
                    targetPanel.style.transform = 'translateY(0)';
                    
                    // Sblocca le animazioni
                    setTimeout(() => {
                        targetPanel.style.removeProperty('opacity');
                        targetPanel.style.removeProperty('transform');
                        this.isAnimating = false;
                    }, this.animationDuration);
                    
                }, this.animationDuration / 2);
            } else {
                // Nessun panel attivo, attiva direttamente
                targetPanel.classList.add('active');
                this.isAnimating = false;
            }
        } else {
            console.error(`Panel con ID "${targetService}-panel" non trovato`);
            this.isAnimating = false;
        }
    }
    
    /**
     * Gestisce lo scrolling orizzontale della tab navigation su mobile
     */
    setupMobileScrolling() {
        const tabsNavigation = document.querySelector('.tabs-navigation');
        if (!tabsNavigation) return;
        
        // Centra il tab attivo nel viewport su mobile
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    const btnRect = btn.getBoundingClientRect();
                    const navRect = tabsNavigation.getBoundingClientRect();
                    const centerPosition = btnRect.left + btnRect.width/2 - navRect.left;
                    const scrollLeft = centerPosition - tabsNavigation.offsetWidth/2;
                    
                    tabsNavigation.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Risponde a cambiamenti di dimensione dello schermo
     */
    handleResize() {
        // Qui puoi aggiungere logica per gestire cambiamenti di visualizzazione su resize
        // Ad esempio, adattare altezze o ricalcolare posizioni
    }
    
    /**
     * Aggiorna i contenuti dei tab con dati dinamici
     * @param {string} tabId - ID del tab da aggiornare
     * @param {Object} data - Dati da inserire nel tab
     */
    updateTabContent(tabId, data) {
        const panel = document.getElementById(`${tabId}-panel`);
        if (!panel) return;
        
        // Esempio di aggiornamento di contenuto
        if (data.title) {
            const titleElement = panel.querySelector('h3');
            if (titleElement) titleElement.textContent = data.title;
        }
        
        if (data.description) {
            const descElement = panel.querySelector('p');
            if (descElement) descElement.textContent = data.description;
        }
        
        // Aggiorna features se presenti
        if (data.features && Array.isArray(data.features)) {
            const featuresList = panel.querySelector('.service-features');
            if (featuresList) {
                featuresList.innerHTML = '';
                data.features.forEach(feature => {
                    const featureItem = document.createElement('div');
                    featureItem.className = 'feature-item';
                    featureItem.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    `;
                    featuresList.appendChild(featureItem);
                });
            }
        }
    }
}

// Inizializza il gestore quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se i componenti sono caricati (se usi un sistema component-based)
    if (typeof window.componentLoader !== 'undefined') {
        // Se usi un component loader, aspetta il caricamento completo
        document.addEventListener('componentsLoaded', function() {
            window.servicesTabManager = new ServicesTabManager();
        });
    } else {
        // Altrimenti inizializza direttamente
        window.servicesTabManager = new ServicesTabManager();
    }
});

// Esponi la classe globalmente per poterla usare da altre parti dell'app
window.ServicesTabManager = ServicesTabManager;