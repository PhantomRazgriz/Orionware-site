/**
 * Orionware - Component Loader
 * Sistema per il caricamento dinamico dei componenti HTML tramite fetch API
 */

class ComponentLoader {
    constructor() {
        this.componentsLoaded = 0;
        this.totalComponents = 0;
        this.onAllComponentsLoaded = null;
    }

    /**
     * Inizializza il caricamento dei componenti
     * @param {Function} callback - Funzione da eseguire quando tutti i componenti sono caricati
     */
    init(callback = null) {
        this.onAllComponentsLoaded = callback;
        
        // Seleziona tutti gli elementi con attributo data-component
        const componentPlaceholders = document.querySelectorAll('[data-component]');
        this.totalComponents = componentPlaceholders.length;
        
        if (this.totalComponents === 0 && this.onAllComponentsLoaded) {
            // Se non ci sono componenti, esegui subito il callback
            this.onAllComponentsLoaded();
            return;
        }
        
        // Per ogni placeholder, carica il componente corrispondente
        componentPlaceholders.forEach(placeholder => this.loadComponent(placeholder));
    }

    /**
     * Carica un singolo componente
     * @param {HTMLElement} placeholder - Elemento che conterrà il componente
     */
    async loadComponent(placeholder) {
        const componentName = placeholder.getAttribute('data-component');
        
        try {
            const response = await fetch(`/components/${componentName}.html`);
            if (!response.ok) throw new Error(`Componente ${componentName} non trovato`);
            
            const html = await response.text();
            
            // Elabora il componente sostituendo i parametri
            let processedHtml = this.processComponentParameters(html, placeholder);
            
            // Inserisci il HTML elaborato nel placeholder
            placeholder.innerHTML = processedHtml;
            
            // Attiva eventuali script nel componente
            this.activateComponentScripts(placeholder);
            
            // Aggiorna il conteggio dei componenti caricati
            this.componentsLoaded++;
            
            // Se tutti i componenti sono stati caricati, esegui il callback
            if (this.componentsLoaded === this.totalComponents && this.onAllComponentsLoaded) {
                this.onAllComponentsLoaded();
            }
        } catch (error) {
            console.error(`Errore nel caricamento del componente ${componentName}:`, error);
            placeholder.innerHTML = `<p class="error">Errore nel caricamento del componente ${componentName}</p>`;
            
            // Anche in caso di errore, aggiorna il conteggio
            this.componentsLoaded++;
            
            // Se tutti i componenti sono stati caricati (anche con errori), esegui il callback
            if (this.componentsLoaded === this.totalComponents && this.onAllComponentsLoaded) {
                this.onAllComponentsLoaded();
            }
        }
    }

    /**
     * Sostituisce i parametri nel template del componente
     * @param {string} html - HTML del componente
     * @param {HTMLElement} placeholder - Elemento con gli attributi data-param-*
     * @returns {string} - HTML con i parametri sostituiti
     */
    processComponentParameters(html, placeholder) {
        let processedHtml = html;
        
        // Ottieni tutti gli attributi data-param-*
        const dataAttributes = [...placeholder.attributes]
            .filter(attr => attr.name.startsWith('data-param-'));
            
        // Sostituisci {{paramName}} con il valore dell'attributo
        dataAttributes.forEach(attr => {
            const paramName = attr.name.replace('data-param-', '');
            const paramValue = attr.value;
            processedHtml = processedHtml.replace(
                new RegExp(`{{${paramName}}}`, 'g'), 
                paramValue
            );
        });
        
        return processedHtml;
    }

    /**
     * Attiva gli script presenti nel componente
     * @param {HTMLElement} container - Elemento contenitore con gli script
     */
    activateComponentScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            
            // Copia gli attributi dello script originale
            [...script.attributes].forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Se lo script ha un src, lo copiamo
            if (script.src) {
                newScript.src = script.src;
            } else {
                // Altrimenti copiamo il contenuto
                newScript.textContent = script.textContent;
            }
            
            // Sostituisci lo script originale
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

// Esporta il loader come variabile globale
window.componentLoader = new ComponentLoader();

// Inizializza il loader quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    window.componentLoader.init(() => {
        // Callback eseguito quando tutti i componenti sono caricati
        console.log('Tutti i componenti sono stati caricati');
        
        // Dispatch di un evento custom per segnalare che i componenti sono pronti
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    });
});