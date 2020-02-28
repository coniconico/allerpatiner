//Declenche fonction quand invent dans la barre de recherche
const recherche = document.getElementById('recherche');
recherche.addEventListener('input', () => chercherResultats(recherche.value));


//Des qu'on tape un truc =>
//Charger le XML et filtrer les donnees a ajouter au DOM sauf quand la taille du texte saisie est 0 (effacage)

const chercherResultats = chercherTexte => {

    //si la taille de la saisie est de 0 effacer les resultats
    if ((recherche.value.length === 0)) {
        document.querySelector('#resultats').innerHTML = '';
    }

    //Sinon on continue
    else {
        // //on efface les precedents resultats
        document.querySelector('#resultats').innerHTML = '';


        //on recup et on analyse le fichier xml
        fetch('https://cors-anywhere.herokuapp.com/http://www2.ville.montreal.qc.ca/services_citoyens/pdf_transfert/L29_PATINOIRE.xml')
            .then(response => response.text())
            .then(function (data) {
                let parser = new DOMParser();
                const xmlPatinoires = parser.parseFromString(data, 'application/xml');

                //On recup nos donnees de patinoires dans le xml
  
                let nomsPatinoire = xmlPatinoires.getElementsByTagName('nom');

                let condition = xmlPatinoires.getElementsByTagName('condition');

                let ouvert = xmlPatinoires.getElementsByTagName('ouvert');

                let deblaye = xmlPatinoires.getElementsByTagName('deblaye');

                let arrose = xmlPatinoires.getElementsByTagName('arrose');

                let resurface = xmlPatinoires.getElementsByTagName('resurface');

                let date = xmlPatinoires.getElementsByTagName('date_maj');

                

                //loop de la longueur du nombre de patinoires
                for (i = 0; i < nomsPatinoire.length; i++) {

                    //le nom de la patinoire
                    let nomPatinoire = nomsPatinoire[i].textContent;
                    //stocke la condition de la patinoire
                    let  conditionPatinoire = condition[i].textContent;
                    //stocke la date de mise a jour de la patinoire
                    let dateMaj = date[i].textContent;

                    // ouverte ? vrai ou faux
                    let patinoireOuverte = ouvert[i].textContent;
                    if (patinoireOuverte === '1') {
                        patinoireOuverte = `<li class ="true">`;
                    } else {
                        patinoireOuverte = `<li class="false">`;
                    }; 

                    // deblayé ? vrai ou faux
                    let patinoireDeblaye = deblaye[i].textContent;
                    if (patinoireDeblaye === '1') {
                        patinoireDeblaye = `<li class ="true">`;
                    } else {
                        patinoireDeblaye = `<li class="false">`;
                    };

                    // arrose ? vrai ou faux
                    let patinoireArrose = arrose[i].textContent;
                    if (patinoireArrose === '1') {
                        patinoireArrose = `<li class ="true">`;
                    } else {
                        patinoireArrose = `<li class="false">`;
                    };

                    // resurface ? vrai ou faux
                    let patinoireResurface = resurface[i].textContent;
                    if (patinoireResurface === '1') {
                        patinoireResurface = `<li class ="true">`;
                    } else {
                        patinoireResurface = `<li class="false">`;
                    };
                     

                    //si le texte saisi corresspond a un nom, afficher le nom et l'etat 
                    if (nomPatinoire.toLowerCase().indexOf(recherche.value.toLowerCase()) != -1) {



                        //h1 pour le nom 
                        let h1 = document.createElement('h1');
                        h1.setAttribute('class', 'nom');
                        h1.innerHTML = `${nomPatinoire}`;

                        //une div pour l'etat 
                        let div = document.createElement('div');




                        //Le code HTML a creer pour le mettre dans la div
                        div.innerHTML = 
                        `
                        <div class="bloc etat-patinoire">
                <ul>
                    ${patinoireOuverte}Ouverte</li>
                    ${patinoireArrose}Arrosée</li>
                    ${patinoireResurface}Resurfacée</li>
                    ${patinoireDeblaye}Deblayée</li>
                </ul>
                <p>Condition <br>
                    <p class="condition">
                        ${conditionPatinoire}
                    </p>
                </p>
                <p id="date-maj">
                    Dernière Mise à Jour : <br>
                    ${dateMaj} 
                </p>    
            </div>
                         
                         `;

                        //on met tout dans la div resultats
                        const resultats = document.getElementById('resultats');
                        resultats.appendChild(h1);
                        resultats.appendChild(div);
                    }
                }
            })
    };
}
