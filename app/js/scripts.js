// SELECTIONS
const tacheListe = _('#tacheListe');
const formeTache = _('#formeTache');
const tacheInput = _('#tache');
const tacheTittle = _('#tacheTittle');
const filtre = _('#filtre');
/* -------------------------------------------------------------------- */




// CLASSES
class Tache{
    constructor(tacheText, tacheComplete){
        this.tacheText = tacheText;
        this.tacheComplete = tacheComplete;
    }
}


class UI{

    static listerTaches(){
        const taches = Store.getTaches();

        if (taches.length === 0) {
            tacheListe.firstElementChild.innerText = `Il n'y a aucune tâche enregistrer pour le moment.`;
        }else{
            tacheListe.firstElementChild.innerText = 'Toutes les tâches';
                taches.forEach((tache)=>{
                UI.ajouterTache(tache);
            });
        }
    }

    static listerToutesLesTaches(){
        const taches = tacheListe.children;
        let tachesExiste = false;

        Array.from(taches).forEach((tache)=>{
            if (tache.classList.contains('tache')) {
                if (tache.firstElementChild.classList.contains('incomplete') || tache.firstElementChild.classList.contains('complete')) {
                    tache.style.display = 'flex';
                    tachesExiste = true;
                }
            }
        });

        if (tachesExiste) {
            tacheListe.firstElementChild.innerText = 'Toutes les tâches';
        } else {
            tacheListe.firstElementChild.innerText = `Il n'y a aucune tâche enregistrer pour le moment.`;
        }
    }

    static listerTachesCompletes(){
        let tachesCompleteExiste = false;
        const taches = tacheListe.children;
        Array.from(taches).forEach((tache)=>{
            if (tache.classList.contains('tache')) {
                if (tache.firstElementChild.classList.contains('incomplete')) {
                    tache.style.display = 'none';
                }else{
                    tache.style.display = '';
                    tachesCompleteExiste = true;
                }
            }
        });

        if (tachesCompleteExiste) {
            tacheListe.firstElementChild.innerText = 'Les tâches completes';
        }else{
            tacheListe.firstElementChild.innerText = 'Aucun tâches completes';
        }
    }

    static listerTachesIncompletes(){
        
        const taches = tacheListe.children;
        let tachesIncompleteExiste = false;

        Array.from(taches).forEach((tache)=>{
            if (tache.classList.contains('tache')) {
                if (tache.firstElementChild.classList.contains('complete')) {
                    tache.style.display = 'none';
                }else{
                    tache.style.display = '';
                    tachesIncompleteExiste = true;
                }
            }
        });

        if (tachesIncompleteExiste) {
            tacheListe.firstElementChild.innerText = 'Les tâches incompletes';
        }else{
            tacheListe.firstElementChild.innerText = 'Aucun tâches incompletes';
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
        filtre.value = 'touteTache';
    }

    static clearField(){
        tacheInput.value = '';
    }
}


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

    static removeTache(tacheText){
        const taches = Store.getTaches();
        taches.forEach((tache, index)=>{
            if (tache.tacheText === tacheText) {
                taches.splice(index, 1);
            }
        });
        localStorage.setItem('taches', JSON.stringify(taches));
    }

    static completeTache(tacheText){
        const taches = Store.getTaches();
        taches.forEach((tache, index)=>{
            if (tache.tacheText === tacheText) {
                tache.tacheComplete = !(tache.tacheComplete);
            }
        });
        localStorage.setItem('taches', JSON.stringify(taches));
    }
}
/* -------------------------------------------------------------------- */




// EVENTS
document.addEventListener('DOMContentLoaded', UI.listerTaches());

filtre.addEventListener('change', ()=>{
    if (filtre.value === 'complete') {
        UI.listerTachesCompletes();
    }else if (filtre.value === 'incomplete') {
        UI.listerTachesIncompletes();
    }else{
        UI.listerToutesLesTaches();
     }
});

formeTache.addEventListener('submit', (e)=>{
    e.preventDefault();
    let inputTache = tacheInput.value;
    let nouvelleTache = new Tache(inputTache, false);
    UI.ajouterTache(nouvelleTache);
    Store.setTache(nouvelleTache);
    UI.clearField();
});


tacheListe.addEventListener('click', (e)=>{
    if (e.target.classList.contains('tacheSup') || e.target.classList.contains('tacheComp')) {
        if (e.target.classList.contains('tacheSup')) {
            let tacheSup = e.target;
            let tacheToRemove = tacheSup.parentNode.parentNode;
            let textTache = tacheToRemove.firstElementChild.innerText;
            tacheToRemove.remove();
            Store.removeTache(textTache);
        } else {
            let tacheComp = e.target;
            let tacheToComplete = tacheComp.parentNode.previousElementSibling;

            if (tacheToComplete.classList.contains('incomplete')) {
                tacheToComplete.classList.remove('incomplete');
                tacheToComplete.classList.add('complete');
                Store.completeTache(tacheToComplete.innerText);
            }else{
                tacheToComplete.classList.remove('complete');
                tacheToComplete.classList.add('incomplete');
                Store.completeTache(tacheToComplete.innerText);
            }
        }
    }
});
/* -------------------------------------------------------------------- */




// FUNCTIONS

/* Select elements */
function _(selector) { return document.querySelector(selector); }

/* Create elements */
function __(element) { return document.createElement(element); }
/* -------------------------------------------------------------------- */