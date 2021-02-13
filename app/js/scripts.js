// SELECTIONS
const tacheListe = _('#tacheListe');


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

        let tacheDivs = new Array();

        taches.forEach((tache)=>{
            tacheDivs.push(UI.ajouterTache(tache));
        });
        tacheListe.innerHTML = tacheDivs;
    }

    static ajouterTache(tache){
        let completeClass = (tache.tacheComplete) ? "complete" : "incomplete";
        let tacheText = tache.tacheText;

        let div = `
            <div class ="tache">
                <li class="tacheTexte ${completeClass}">
                    ${tacheText}
                </li>
                <div class="tacheControl">
                    <button class="tacheSup">Supprimer</button>
                    <button class="tacheComp">Completer</button>
                </div>
            </div>
        `;
        return div;
    }
}
/* -------------------------------------------------------------------- */



// EVENTS
document.addEventListener('DOMContentLoaded', UI.listerTaches());
/* -------------------------------------------------------------------- */



// FUNCTIONS
function _(selector) { return document.querySelector(selector); }
/* -------------------------------------------------------------------- */



UI.ajouterTache(new Tache('Marcher sur la mer', false));