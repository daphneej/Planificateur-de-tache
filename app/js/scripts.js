// SELECTIONS
const tacheListe = _('#tacheListe');
const formeTache = _('#formeTache');
const tacheInput = _('#tache');
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
        const taches = [
            new Tache("Aller a la piscine", true),
            new Tache("Faire du velo", false),
            new Tache("Dormir toute la journee", false),
            new Tache("Manger au restau", true),
            new Tache("Manger du pain"),
            new Tache("Etudier mes lecons", false)
        ];

        taches.forEach((tache)=>{
            UI.ajouterTache(tache)
        });
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



// tacheListe.appendChild();