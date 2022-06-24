/* La creazione della griglia avviene nell eventListener di "Generate-grid"
Facciamo un ciclo for in cui creiamo dinamicamente i singoli quadrati;
Il contenuto di questi quadrati sarà l'indice del for;
Iniziamo mettendo condizione indice < 100;
Creiamo una Funzione in cui viene creato un div e il suo eventListener,
qui dentro aggiungiamo il toggle('active') e stampiamo il log passando l'indice 
come argomento della funzione;
*/

// SECONDA PARTE ESERCIZIO 

/* Per creare le bombe dobbiamo fare una funzione che viene ripetuta 16 volte
*/

let blackList = [];
const generateButton = document.getElementById('generate-grid-btn');
const gridWrapper = document.getElementById('grid-wrapper');
let numBox;
let isBomb;
let bombNumber;
let totPoints = 0;
generateButton.addEventListener('click',function(){
    blackList = [""];
    const diffSelection = document.getElementById('difficult-selection').value; // Prendo il valore scelto dall'utente
    let nameSquareClass; // Variabile a cui assegno il nome della classe da utilizzare per le box
    gridWrapper.textContent = "" // Text Content = "" per rimuovere la vecchia tabella in modo che la nuova non si aggiunga alla vecchia 
    
    if(diffSelection == 'easy'){
        numBox = 100;
        nameSquareClass = 'square-easy'
    }else if(diffSelection == 'medium'){
        numBox = 81;
        nameSquareClass = 'square-medium'
    }else{
        numBox = 49;
        nameSquareClass = 'square-hard'
    }
    gridWrapper.classList.add('border-black')
    // Popoliamo il nostro array
    for(let r = 0; r < 16 ; r++){
        bombNumber = generateRandomBomb(blackList,1,numBox);
        blackList.push(bombNumber);
       }
    for(let i = 0 ; i < numBox ; i++){
       const newBox = createBox(nameSquareClass);
       // Creiamo i nostri quadrati 
       newBox.addEventListener('click',function(){
        // Verifichiamo se all'interno dell'array c'è un numero uguale all'indice attuale + 1
        // Se c'è allora il quadrato sarò una bomba
        if(blackList.includes(i+1) == true){
            newBox.classList.add('bomb-square');
            console.log('Questa è una bomba alla posizione ' + (i+1) );
        }
        else{
            if(newBox.classList.contains('point-square') == true){
                console.log('Hai già cliccato questa casella')            
            }
            else{
                newBox.classList.add('point-square');
                totPoints ++;
                console.log('Il tuo punteggio è di : ' + totPoints + ' punti');
            }
        }   
    })
       gridWrapper.append(newBox);
    }
})
console.log('Punteggio finale : ' +totPoints);


function createBox(squareType){
    let newSquare = document.createElement('div');
    newSquare.classList.add('square',squareType,'border-black')
    return newSquare;
}

function generateRandomBomb(listBomb, min, max){
    let newRandomNumber;
    let isNumberValid = false;
    while( isNumberValid === false){
        newRandomNumber = Math.floor(Math.random() * (max + 1) - min) + min;
        if ( !listBomb.includes(newRandomNumber)) {
            isNumberValid = true;
        }
    }
    console.log(newRandomNumber)
    return newRandomNumber;
}