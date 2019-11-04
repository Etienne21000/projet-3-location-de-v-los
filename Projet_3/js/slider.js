class Slider {
    constructor(slider, index, nbSlides, slide, play, pause, suivBtn, precBtn){
        this.slider = document.querySelector(slider);
        this.index = index;
        this.nbSlides = document.querySelectorAll(nbSlides).length-1;
        this.slide = document.querySelectorAll(slide);
        this.play = document.querySelector(play);
        this.pause = document.querySelector(pause);
        this.suivBtn = document.querySelector(suivBtn);
        this.precBtn = document.querySelector(precBtn);
        this.timer;
    };

    //Initialisation du slider
    init(){
        this.slideImg();
        this.suivBtn.addEventListener("click", this.suiv.bind(this));
        this.precBtn.addEventListener("click", this.prec.bind(this));
        this.play.addEventListener("click", this.slideImg.bind(this));
        this.pause.addEventListener("click", this.stopSlide.bind(this));
        document.addEventListener("keydown", this.slideClavier.bind(this));
    };

    //méthode de l'afficage de la fonction slide suivante et défilement.
    suiv(){
        if(this.index < this.nbSlides){
            this.index++;
        }
        else if(this.index === this.nbSlides){
            this.index = 0;
        }

        this.slide.forEach(function(s) {
            s.style.transform = 'translateX(-'+ this.index + '00%)';
        }.bind(this));
    };

    //méthode de l'afficage de la fonction slide précédente et défilement.
    prec(){
        if(this.index > 0){
            this.index--;
        }
        else  if(this.index === 0){
            this.index = this.nbSlides;
        }

        this.slide.forEach(function(s) {
            s.style.transform = 'translateX(-'+ this.index + '00%)';
        }.bind(this));
    };

    //Defilement automatique des slides
    slideImg(){
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            this.suiv();

            this.slide.forEach(function (s) {
                s.style.transform = 'translateX(-'+ this.index + '00%)';
            }.bind(this));

            this.slideImg();

        }.bind(this), 5000);
    };

    stopSlide(){
        clearTimeout(this.timer);
    };

    //Défilement des slides avec le clavier
    slideClavier(e) {
        if(e.keyCode === 39){
            this.suiv();
        }
        else if(e.keyCode === 37){
            this.prec();
        }
    };
};
