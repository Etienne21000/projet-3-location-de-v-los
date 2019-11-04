class Resa {
    constructor(timer, btnTimer, button, valider, aside, formulaire, temps) {
        this.timer = document.querySelector(timer);
        this.btnTimer = document.querySelector(btnTimer);
        this.button = document.querySelector(button);
        this.valider = document.querySelector(valider);
        this.aside = document.querySelector(aside);
        this.formulaire = document.querySelector(formulaire);
        this.temps = document.querySelector(temps);
        this.start;
    };

    init(){
        this.hideForm();
        this.refreshTimer();
        this.button.addEventListener("click", this.showSign.bind(this));
        this.valider.addEventListener("click", this.initTimer.bind(this));
        this.btnTimer.addEventListener("click", this.annulerResa.bind(this));
    };

    hideForm(){
        this.aside.style.display = "none";
    };

    showSign(){
        this.formulaire.style.display = "flex";
        this.button.style.display = "none";
    };

    //Initialisation du timer
    initTimer(){
        if(sessionStorage.getItem("endDate") === null){
            var endDate = new Date().getTime() + 20*60*1000;
            sessionStorage.setItem('endDate', endDate);
            this.startTimer();
            setTimeout(function(){
                this.getFocusTimer();
            }.bind(this), 1000);
        }
    };

    //Méthode pour mettre en place les données du timer
    setDate(){

        var now = new Date().getTime();
        var endDate = new Date(Number(sessionStorage.getItem("endDate")));

        var tempsEcoule = endDate - now;
        sessionStorage.setItem("tempsEcoule", tempsEcoule);
        sessionStorage.setItem("date", now);

        var minutes = Math.floor((tempsEcoule % (1000 * 60 * 60)) / (1000 * 60));
        var secondes = Math.floor((tempsEcoule % (1000 * 60)) / 1000);

            this.timer.style.display = "flex";
            this.btnTimer.style.display ="block";
            this.temps.innerHTML = "Félicitations " + localStorage.nom + " " + localStorage.prenom + " vous avez " + sessionStorage.reservation + " réservation en cours à la station : " + sessionStorage.name + " <br>Elle expirera dans : " + minutes + " minute" + (minutes > 1?'s':'') + " et " + secondes + " seconde" + (secondes > 1?'s':'');
            this.temps.style.color = "#e95143";
            this.hideForm();

        if(sessionStorage.getItem("tempsEcoule") <= 0){
            this.endTimer();
        }
    };

    //Méthode qui lance le timer
    startTimer(){
        this.start = setInterval(this.setDate.bind(this), 1000);
    };

    //méthode rafraichissement du timer
    refreshTimer(){
        if(sessionStorage.getItem("endDate")){
            this.startTimer();
        }
        else if(sessionStorage.getItem("endDate")===null){
            this.timer.style.display = "none";
        }
    };

    //Méthode appelé dans setDate lorsque le temps est écoulé
    endTimer(){
            this.stopTimer();
            this.temps.innerHTML = "Votre réservation a expiré."
            this.temps.style.color ="#777777";
            console.log("la réservation a expiré !");
    };

    //Méthode d'annulation du timer
    annulerResa(){
        this.stopTimer();
        this.temps.innerHTML = "Votre réservation a bien été annulée.";
        this.temps.style.color = "#777777";
        console.log("la réservation a été annulée !");
    };

    // Méthode qui arrête le timer appelée dans les méthodes annulerResa et endTimer
    stopTimer(){
        sessionStorage.clear();
        clearInterval(this.start);
        this.btnTimer.style.display ="none";
        setTimeout(function(){
            this.timer.style.display ="none";
        }.bind(this), 2000);
    };

    getFocusTimer(){
        this.timer.focus();
        this.timer.scrollIntoView({behavior:"smooth"});
    };
};
