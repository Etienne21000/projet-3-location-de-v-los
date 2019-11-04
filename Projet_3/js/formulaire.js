class Formulaire {
    constructor(form, nomElt, prenomElt, sign, regexElt, valider, aideNomElt, aidePrenomElt){
        this.form = document.querySelector(form);
        this.nomElt = document.querySelector(nomElt);
        this.prenomElt = document.querySelector(prenomElt);
        this.sign = document.querySelector(sign);
        this.regexElt = regexElt;
        this.valider = document.querySelector(valider);
        this.aideNomElt = document.querySelector(aideNomElt);
        this.aidePrenomElt = document.querySelector(aidePrenomElt);
    };

    init(){
        this.sign.style.display = "none";
        this.verifStorage();
        this.nomElt.addEventListener("input", this.valideNom.bind(this));
        this.prenomElt.addEventListener("input", this.validePrenom.bind(this));
        this.form.addEventListener("input", this.showSignature.bind(this));
        this.form.addEventListener('submit', this.verifForm.bind(this));
    };

    verifStorage(){
        if((localStorage.getItem('nom')) && (localStorage.getItem('prenom'))){
            this.nomElt.value = localStorage.getItem('nom');
            this.prenomElt.value = localStorage.getItem('prenom');
            this.sign.style.display = "flex";
        }
    };

    valideNom(){
        if(this.regexElt.test(this.nomElt.value)){
            this.aideNomElt.textContent = "";
            return true;
        }
        else {
            this.aideNomElt.textContent = "nom invalide";
            this.aideNomElt.style.color = "red";
            return false;
        }
    };

    validePrenom(){
        if(this.regexElt.test(this.prenomElt.value)){
            this.aidePrenomElt.textContent = "";
            return true;
        }
        else {
            this.aidePrenomElt.textContent = "prénom invalide";
            this.aidePrenomElt.style.color = "red";
            return false;
        }
    };

    //Validation des nom et prénom et activation du bouton de réservation
    showSignature(){

        var nomOk = this.valideNom();
        var prenomOk = this.validePrenom();

        if(nomOk && prenomOk){
            this.sign.style.display = "flex";
            return true;
        }
        else {
            this.sign.style.display = "none";
            return false;
        }
    };

    //Validation finale au moment de l'envoi du formulaire
    verifForm(e){
        var nomOk = this.valideNom();
        var prenomOk = this.validePrenom();
        var reservationEnCours = 0;

        if(nomOk && prenomOk){
            localStorage.setItem('nom', this.nomElt.value);
            localStorage.setItem('prenom', this.prenomElt.value);

            sessionStorage.velos--;
            sessionStorage.stand++;
            reservationEnCours =1;
            sessionStorage.setItem("reservation", reservationEnCours);
            sessionStorage.getItem("velos");
            sessionStorage.getItem("stand");
            e.preventDefault();
            return true;
        }
        else {
            e.preventDefault();
            alert("Veuillez remplir les champs correctement.");
            return false;
        }
    };
};
