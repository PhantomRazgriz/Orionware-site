/**
 * Funzione avanzata per il contatore di caffè con effetti visivi
 * 
 * Questa versione migliorata:
 * - Incrementa il contatore a una velocità realistica
 * - Aggiunge effetti visivi quando si raggiungono numeri tondi (ogni 10 caffè)
 * - Fa cadere dei chicchi di caffè con un'animazione
 * - Aggiunge effetti sonori leggeri (opzionale)
 */
function initAdvancedCoffeeCounter() {
    // Seleziona l'elemento del contatore caffè
    const coffeeCounter = document.querySelector('.coffee-counter');
    if (!coffeeCounter) return;
    
    // Valore iniziale (un numero significativo ma plausibile)
    let coffeeCount = 3439;
    
    // Ultimo valore arrotondato per tenere traccia degli incrementi significativi
    let lastRoundNumber = Math.floor(coffeeCount / 10) * 10;
    
    // Velocità: circa 1 caffè ogni 6-12 secondi (velocità variabile per un effetto più naturale)
    const getRandomRate = () => 0.08 + (Math.random() * 0.12); // Tra 0.08 e 0.2 caffè al secondo
    let currentRate = getRandomRate();
    
    // Flag per tracciare quando far cadere un chicco
    let dropBean = false;
    
    // Funzione per far cadere un chicco di caffè
    function createFallingBean() {
        if (!dropBean) return;
        
        // Rimuovi l'attributo data-bean (se presente) e aggiungilo nuovamente
        // per riavviare l'animazione
        coffeeCounter.removeAttribute('data-bean');
        
        // Forza reflow
        void coffeeCounter.offsetWidth;
        
        // Aggiungi nuovamente l'attributo
        coffeeCounter.setAttribute('data-bean', 'true');
        
        // Resetta il flag
        dropBean = false;
        
       
    }

    // Funzione di aggiornamento che verrà chiamata ogni 100ms
    function updateCoffeeCounter() {
        // Cambia occasionalmente il tasso di incremento per un effetto più naturale
        if (Math.random() < 0.05) { // 5% di possibilità di cambiare velocità
            currentRate = getRandomRate();
        }
        
        // Incrementa il contatore in base alla velocità (convertita per l'intervallo di 100ms)
        coffeeCount += currentRate * 0.1;
        
        // Verifica se abbiamo raggiunto un nuovo numero rotondo (multiplo di 10)
        const currentRoundNumber = Math.floor(coffeeCount / 10) * 10;
        if (currentRoundNumber > lastRoundNumber) {
            lastRoundNumber = currentRoundNumber;
            dropBean = true;
            
            // Aggiungi una piccola classe di animazione al numero
            coffeeCounter.classList.add('milestone');
            setTimeout(() => {
                coffeeCounter.classList.remove('milestone');
            }, 1000);
        }
        
        // Aggiorna il testo con il valore arrotondato
        coffeeCounter.textContent = Math.floor(coffeeCount);
        
        // Crea animazione chicco se necessario
        createFallingBean();
        
        // Continua ad aggiornare
        requestAnimationFrame(() => {
            setTimeout(updateCoffeeCounter, 100);
        });
    }
    
    // Aggiungi una classe CSS per l'animazione dei numeri milestone
    const style = document.createElement('style');
    style.textContent = `
        @keyframes milestone-highlight {
            0% { transform: scale(1); }
            30% { transform: scale(1.2); color: #ff5370; }
            100% { transform: scale(1); }
        }
        
        .coffee-counter.milestone {
            animation: milestone-highlight 1s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Avvia il contatore
    updateCoffeeCounter();
}

// Aggiungi questa funzione all'inizializzazione della pagina
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedCoffeeCounter();
});