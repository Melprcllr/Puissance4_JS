// On récupère l'élément avec l'id main
const main = document.getElementById('main');


// Variable pour suivre de quel couleur de jeton c'est le tour (true pour le jaune, false pour le rouge)
let tour = true;

// Fonction pour créer le tableau de Puissance 4
function createTable(target) {
    
    // On crée un élément de tableau
    const table = document.createElement('table');
     // Boucle pour créer les lignes
    for (let i = 0; i < 6; i++) {

        // Crée un élément de ligne de tableau
        const tr = document.createElement('tr');
        // Boucle pour créer les colonnes dans chaque ligne
        for (let y = 0; y < 7; y++) {
            // Crée un élément de cellule de tableau
            const td = document.createElement('td');

            // Définit la valeur initiale de la cellule à 0 (pour signifier que toutes les cellules sont vides)
            td.value = 0
            
            // Définit l'identifiant de la cellule en fonction de sa position (met en place un système de coordonnées, sauvegardés dans l'ID)
            td.id = i + ':' + y

            // Pour se repérer dans les cellules
            // td.innerText = td.id

            // Ajoute un écouteur d'événements de clic à la cellule
            td.addEventListener('click', putCoin)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
target.appendChild(table);

}

// La fonction putCoin contient tout le système de jeu 
//(event) est le parametre chargé par défaut 
function putCoin(event) {
    const td = event.target
 // Quand on clique on récupère la colonne avec un charAt 
 const column = td.id.charAt(2)
 let line = 5
 let jeton = null
 while (line >= 0 &&
    (jeton = document.getElementById(line + ':' + column)).value !== 0) {
 line -= 1;
 }
 jeton.value = tour
 const coin = document.createElement('div')
 jeton.appendChild(coin)
coin.classList.add('coin', tour ? 'red' : 'yellow')
gameOver(line, column)

// On affecte à style une chaine de caractère par défaut de background color
//  jeton.style = 'background-color: ' + (tour ? 'red' : 'yellow')

// Inversion de boolean
 tour = !tour
}

    
    // On ne la rend pas accessible ailleurs, car on en a besoin que dans la fonction gameOver()
    function gameOver(line, column) {
        console.log(`${line}:${column}`)
        console.log(document.getElementById(`${line}:${column}`).value, 'VALUE')
        
        function verticalFour() {
            let count = 0
            let y = line;
            // tant que y est supérieur à 1 et que y est inférieur ou égal à 5,  
            while (y > 1 && y <= 5 && document.getElementById(`${y++}:${column}`).value === tour) {
                count++;
            }
            return count >= 4;
        }
    
        function horizontalFour() {
            let count = 0
            let x = column
            while (x > 1 && x <= 5 && document.getElementById(`${line}:${x--}`).value === tour) {
                count++;
            }
            return count >= 4;
        }
    
        function diagoRightFour() {
            return false;
        }
    
        function diagoLeftFour() {
            return false;
        }
    
        const isWin = verticalFour() || horizontalFour() || diagoRightFour() || diagoLeftFour()
        isWin && alert(tour ? "Joueur 1 a gagné ! " : "Joueur 2 a gagné ! ")
    }
    
    createTable(main)