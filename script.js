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
    for(let i = 0 ; i < numBox ; i++){
       const newBox = createBox(nameSquareClass);
       if(i < 16){
        bombNumber = generateRandomBomb(blackList,1,numBox);
       }
       newBox.addEventListener('click',function(){
        if(blackList.includes(bombNumber) == i){
            newBox.classList.add('bomb-square');
            console.log('Questa è una bomba' + bombNumber);
        }
        else{
            if(newBox.classList.contains('point-square') == true){
                console.log('Hai già cliccato questa casella')            
            }
            else{
                newBox.classList.add('point-square');
                totPoints ++;
                console.log(totPoints);
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

function generateRandomBomb(listBomb,min,max){
    let newNumBomb = Math.floor(Math.random() * (max - min + 1) + min);
    while(listBomb.includes(newNumBomb) == true){
        newNumBomb = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return newNumBomb;
}