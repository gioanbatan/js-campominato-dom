// Ciao ragazzi,
// Esercizio di oggi: **Campo Minato**
// nome repo: js-campominato-dom
// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
// **Consigli del giorno:** :party_wizard:
// ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

// L'utente clicca play
//      Creazione della griglia
//      Creazione di un array di 16 numeri casuali (bombe)
//          Generazione di numeri casuali che vengono aggiunti alla'array solo se non già presenti fino al riempimento dell'array
//      Output griglia
//      L'utente può cliccare su una cella
//          SE la cella corrisponde a un numero dell'array "bombe" si salta alla fase "fine gioco - perdita"
//              -->"fine gioco - perdita" si colora la cella di rosso e viene mostrato il punteggio cioè la lunghezza dell'array "celle selezionate" 
//          ALTRIMENTI SE l'array "celle già selezionate" raggiunge la lunghezza di "celle totali - n° bombe" si passa alla fase "fine gioco - vittoria!"
//              -->"fine gioco - vittoria!" mostrare un messaggio di congratulazioni
//          ALTRIMENTI si colora la cella scelta di blu e si aggiunge la cella all'array "celle già selezionate" e il gioco prosegue

// DATA 
// Dimensione griglia
let gridSize = 100;
// Numero di celle per lato della griglia
let gridSide = 10;
// Numero bombe
let bombsNumber = 16;
// Array delle bombe
let bombs = [];
// Array celle inermi toccate
let cellCounter = [];
// Interruttore gioco attivo
let play = false;

// INPUT ELEMENTS
// Bottone avvio gioco
const playBtn = document.getElementById("play-btn");
// Selettore della difficoltà
const difficulty = document.getElementById("difficulty");

// OUTPUT ELEMENTS
// Contenitore della griglia
const grid = document.querySelector(".ms_main-container");
// Box comunicazione (fondo scuro per comunicazioni)
const communicationBox = document.querySelector(".ms_communication-box");
console.log("comm-box", communicationBox)
// Messaggio vittoria
const youWinMessage = document.querySelector(".ms_win");
// Messaggio perdita
const youLooseMessage = document.querySelector(".ms_loose");

// INPUT
// 1 SE l'utente clicca sul pulsante play
playBtn.addEventListener("click", function () {
    // Stato del gioco true->Attivo false->Fermo
    play = true;
    // console.log("gridSize", gridSize);
    // ESECUZIONE
    // 2 Pulizia del main conteiner
    clearGrid(grid);

    bombs = createBombs(bombsNumber, gridSize);
    console.log("Le bombe",bombs);
    // Scelta della difficoltà
    // DISATTIVATO PER ORA
    // if (parseInt(difficulty.value) === 1) {
    //     console.log("diff", difficulty.value);
    //     console.log("dfdheuid");
    //     gridSize = 100;
    //     gridSide = 10;
    // } else if (parseInt(difficulty.value) === 2) {
    //     console.log("diff", difficulty.value);
    //     console.log("Aaaaa");
    //     gridSize = 81;
    //     gridSide = 9;
    // } else if (parseInt(difficulty.value) === 3) {
    //     console.log("diff", difficulty.value);
    //     console.log("GGGGgggGg");
    //     gridSize = 49;
    //     gridSide = 7;
    // } else {
    //     console.log("diff", difficulty.value);
    //     gridSize = 0;
    //     gridSide = 0;
    // }
    // 3 Creazione della griglia, il numero indica la quantità di celle
    // OUTPUT
    gridDraw(grid, gridSize, gridSide);
    console.log(playBtn);
});


// FUNCTIONS

/**
 * Description Crea una grignia di n° celle numerate e interattive
 * @param {number} cellQuantity N° di celle
 * @returns {object} griglia definitiva 
 */
function gridDraw (gridToDraw, cellQuantity, rowSize) {
   
    // 3.1 Si avvia un ciclo che n volte:
    for (let i = 1; i <= cellQuantity; i++) {
        
        // 3.2 Si crea la cella
        const cell = cellCreation(i);
        
        // 3.3 Si aggiunge la cella alla griglia
        gridToDraw.append(cell);
        
        //  3.4 Fine iterazione
        // console.log("iteration", i);
    }

    // 3.5 Viene ritornata la griglia completata
    return gridToDraw;
}

/**
 * Description Funzione che crea una nuova cella completa e numerata
 * @param {number} numero della cella
 * @returns {object} cella come elemento del DOM
 */
function cellCreation(cellNumber) {
    //  2.3 Crea un elemento HTML con classe .ms_cell che contiene
    const newCell = document.createElement("div");
    newCell.classList.add("ms_cell");
    //  2.4 Un Numero che corrisponde all'indice del ciclo
    newCell.innerHTML = cellNumber;
    //  2.5 Un event listner per la colorazione in azzurro
    newCell.addEventListener("click", cellIsTouched);

    return newCell;
}

/**
 * Description funzione che si occupa di colorare in azzurro le celle cliccate
 * @param {object} cellTouched cella cliccata
 * @returns {object} cella cliccata con classe bg_cell-touched
 */
function cellIsTouched() {
    if (play === true) {
        thisCell = parseInt(this.innerHTML);
        console.log("cell touched", thisCell);
        if (bombs.includes(thisCell)) {
            console.log("KABOOM!", cellCounter.length, "points");
            // alert(`KABOOM! ${cellCounter.length} points`);
            this.classList.add("bg_cell-explode");
            // Messaggio "hai perso"
            communicationBox.classList.remove("ms_hidden");
            youLooseMessage.classList.remove("ms_hidden");
            youLooseMessage.innerHTML = `Hai perso!!! Il tuo punteggio è di ${cellCounter.length} punti!`;
            // Ferma il gioco
            play = false;
        } else if (!cellCounter.includes(thisCell)) {
            cellCounter.push(thisCell);
            this.classList.add("bg_cell-touched");
        }

        //Controllo vittoria raggiunta
        if (cellCounter >= (gridSize - bombsNumber)) {
            // alert(`WIN! ${cellCounter.length} points`);
            console.log("WIN", cellCounter.length, "points");
            // MEssaggio "hai vinto"
            communicationBox.classList.remove("ms_hidden");
            youWinMessage.classList.remove("ms_hidden");
            youWinMessage.innerHTML = `Hai vinto!!! Il tuo punteggio è di ${cellCounter.length} punti!`;
            //Ferma il gioco
            play = false;
        }
    }
}

/**
 * Description funzione che crea un array di numeri tra 1 e il limite delle celle di una quantatità di indici specifica
 * @param {number} bombsQuantity lunghezza dell'array
 * @param {number} cellsNumber valore massimo del singolo numero
 * @returns {array} array con i numeri di cella delle bombe 
 */
function createBombs(bombsQuantity, cellsNumber) {
    let finalArray = [];
    while (finalArray.length < bombsQuantity) {
        const currentNumb = getRndInt(1, cellsNumber);

        if (!finalArray.includes(currentNumb)) {
            //SE il numero non è già contenuto nell'array, aggiungilo
            finalArray.push(currentNumb);
        }
    }
    return finalArray;
}

/**
 * Description funzione per ottenere un numero intero random tra min e max compresi 
 * @param {number} min minimo
 * @param {number} max massimo
 * @returns {number} numero casuale 
 */
function getRndInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log("casuale")
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
/**
 * Description Pulisce il contenuto di una griglia
 * @param {oggetto} gridToClear Griglia da pulire
 */
function clearGrid (gridToClear) {
    // Pulizia del main container
    gridToClear.innerHTML = "";
    // Comunication box nascosto
    communicationBox.classList.add("ms_hidden");
    youLooseMessage.classList.add("ms_hidden");
    youWinMessage.classList.add("ms_hidden");
    }
    