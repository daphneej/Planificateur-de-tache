// SELECTIONS
const tacheListe = _('#tacheListe');
const formeTache = _('#formeTache');
const tacheInput = _('#tache');
const tacheTittle = _('#tacheTittle');
/* -------------------------------------------------------------------- */




// CLASSES

/* class Tache */
class Tache{
    constructor(tacheText, tacheComplete = false){
        this.tacheText = tacheText;
        this.tacheComplete = tacheComplete;
    }
}

/* class User Interface */
class UI{

    static listerTaches(){
        const taches = Store.getTaches();

        if(taches.length === 0){
            tacheTittle.innerText = 'La liste des taches est vide';
        }else{
            tacheTittle.innerText = 'Les Tâches';
            taches.forEach((tache)=>{
                UI.ajouterTache(tache);
            });
        }
    }

    static ajouterTache(tache){
        let completeClass = (tache.tacheComplete) ? "complete" : "incomplete";
        let tacheText = tache.tacheText;

        let div = __('div');
        div.classList.add('tache');

        let li = `
            <li class="tacheTexte ${completeClass}">
                ${tacheText}
            </li>
            <div class="tacheControl">
                <button class="tacheSup">Supprimer</button>
                <button class="tacheComp">Completer</button>
            </div>
        `;

        div.innerHTML = li;

        tacheListe.appendChild(div);
    }

    static clearField(){
        tacheInput.value = '';
    }
}


/* class tache stockage */
class Store{

    static getTaches(){

        let taches;

        if (localStorage.getItem('taches') === null) {
            taches = [];
        }else{
            taches = JSON.parse(localStorage.getItem('taches'));
        }
        return taches;
    }

    static setTache(tache){
        const tachesTab = Store.getTaches();
        tachesTab.push(tache);
        localStorage.setItem('taches', JSON.stringify(tachesTab));
    }

    // static removeTache(tacheSupprime){
    //     const taches = Store.getTaches();
    //     taches.forEach((tache, index)=>{
    //         if (tache.tacheSupprime) {
    //             tache.splice(index, 1);
    //         }
    //     });
    //     localStorage.setItem('taches', JSON.stringify(taches));
    // }

}
/* -------------------------------------------------------------------- */



// EVENTS
/* Lister taches */
document.addEventListener('DOMContentLoaded', UI.listerTaches());

/* Ajouter tache */
formeTache.addEventListener('submit', (e)=>{
    e.preventDefault();
    let inputTache = tacheInput.value;
    let nouvelleTache = new Tache(inputTache, false);
    UI.ajouterTache(nouvelleTache);
    Store.setTache(nouvelleTache);
    UI.clearField();
});

/* Clompleter et Supprimer tache */
tacheListe.addEventListener('click', (e)=>{
    if (e.target.classList.contains('tacheSup') || e.target.classList.contains('tacheComp')) {
        if (e.target.classList.contains('tacheSup')) {
            let tacheSup = e.target;
            let tacheToRemove = tacheSup.parentNode.parentNode;
            tacheToRemove.remove();
        } else {
            let tacheComp = e.target;
            let tacheToComplete = tacheComp.parentNode.previousElementSibling;

            if (tacheToComplete.classList.contains('incomplete')) {
                tacheToComplete.classList.remove('incomplete');
                tacheToComplete.classList.add('complete');
            }else{
                tacheToComplete.classList.remove('complete');
                tacheToComplete.classList.add('incomplete');
            }
        }
    }
});
/* -------------------------------------------------------------------- */



// FUNCTIONS

/* Select element */
function _(selector) { return document.querySelector(selector); }

/* Create element */
function __(element) { return document.createElement(element); }
/* -------------------------------------------------------------------- */