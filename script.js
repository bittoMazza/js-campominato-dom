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
const finalResult = document.getElementById('final-result')
const messageNewgame = 'Clicca sul tasto "Avvia il gioco " per giocare di nuovo';
let numBox;
let isBomb;
let bombNumber;
let totPoints = 0;
generateButton.addEventListener('click',function(){
    // RESET 
    finalResult.innerHTML = ""
    gridWrapper.innerHTML = "" // Text Content = "" per rimuovere la vecchia tabella in modo che la nuova non si aggiunga alla vecchia 
    gridWrapper.classList.remove('end-game')
    console.clear();
    blackList = [""];

    const diffSelection = document.getElementById('difficult-selection').value; // Prendo il valore scelto dall'utente
    let nameSquareClass; // Variabile a cui assegno il nome della classe da utilizzare per le box
   
    
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
    for(let i = 0; i < 16 ; i++){
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
            gridWrapper.classList.add('end-game')
            finalResult.innerHTML = 'HAI PRESO UNA BOMBA, HAI PERSO!! <br> ' + messageNewgame + '<br> Punteggio finale : ' + totPoints ;
        }
        else{
            if(newBox.classList.contains('point-square') == true){
                console.log('Hai già cliccato questa casella')            
            }
            else{
                newBox.classList.add('point-square');
                totPoints ++;
                if(totPoints == numBox - 16){
                    gridWrapper.classList.add('end-game')
                    finalResult.innerHTML = 'COMPLIMENTI HAI VINTO !! <br> ' + messageNewgame ;
                }
            }
        }   
    })
       gridWrapper.append(newBox);
    }
})



function createBox(squareType){
    let newSquare = document.createElement('div');
    newSquare.classList.add('square',squareType,'border-black')
    return newSquare;
}

function generateRandomBomb(listBomb, min, max){
    let newRandomNumber;
    let isNumberValid = false;
    while( isNumberValid === false){
        newRandomNumber = Math.floor(Math.random() * max - min + 1) + min;
        if ( !listBomb.includes(newRandomNumber)) {
            isNumberValid = true;
        }
    }
    console.log(newRandomNumber)
    return newRandomNumber;
}