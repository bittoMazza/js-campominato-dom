/* La creazione della griglia avviene nell eventListener di "Generate-grid"
Facciamo un ciclo for in cui creiamo dinamicamente i singoli quadrati;
Il contenuto di questi quadrati sarà l'indice del for;
Iniziamo mettendo condizione indice < 100;
Creiamo una Funzione in cui viene creato un div e il suo eventListener,
qui dentro aggiungiamo il toggle('active') e stampiamo il log passando l'indice 
come argomento della funzione;
*/

const generateButton = document.getElementById('generate-grid-btn');
const gridWrapper = document.getElementById('grid-wrapper');
let numBox;
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
       const newBox = createBox(i,nameSquareClass); 
       newBox.innerHTML = i + 1;
       gridWrapper.append(newBox);
    }
})


function createBox(index,squareType){
    let newSquare = document.createElement('div');
    newSquare.classList.add('square',squareType,'border-black')
    newSquare.addEventListener('click',function(){
        if(newSquare.classList.contains('active')){
            console.log('Hai già cliccato questo elemento : ' + (index + 1))
        }
        else{
            newSquare.classList.add('active')
            console.log('Hai cliccato la casella numero : ' + (index + 1));
        }       
    })
    return newSquare;
}

