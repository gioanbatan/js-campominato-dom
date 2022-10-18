// **Consegna**
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// **Bonus**
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// **Consigli del giorno:**  :party_wizard:
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.
// Buon lavoro! :muscolo:

// DATI

// INPUT ELEMENTS
const playBtn = document.getElementById("play-btn");
const difficulty = document.getElementById("difficulty");
let gridSize = 100;
let gridSide = 10;

// OUTPUT ELEMENTS
console.log("gridSize", gridSize);
const grid = document.querySelector(".ms_main-container");


// INPUT
// 1 SE l'utente clicca sul pulsante play
playBtn.addEventListener("click", function () {
    console.log("gridSize", gridSize);
    // ESECUZIONE
    // 2 Pulizia del main conteiner
    clearGrid(grid);

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

    console.log("post-if",gridSide,gridSide)
    // 3 Creazione della griglia, il numero indica la quantità di celle
    // OUTPUT
    gridDraw(grid, gridSize, gridSide);
    console.log(playBtn);
});


// FUNCTIONS

/**
 * Description Crea una grignia di n° celle numerate e intrerattive
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
        console.log("iteration", i);
    }

    // 3.5 Viene ritornata la griglia completata
    return gridToDraw;
}

/**
 * Description Pulisce il contenuto di una griglia
 * @param {oggetto} gridToClear Griglia da pulire
  */
function clearGrid (gridToClear) {
// 2.1 Pulizia del main conteiner
gridToClear.innerHTML = "";
}

/**
 * Description Funzione che crea una nuova cella completa e numerata
 * @param {number} numero della cella
 * @returns {object} cella come elemento del DOM
 */
function cellCreation(cellNumber) {
    console.log(cellNumber);
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
function cellIsTouched(cellTouched) {
    console.log(this.innerHTML);
    return this.classList.toggle("bg_cell-touched");    
}