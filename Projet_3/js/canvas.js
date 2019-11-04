class Canvas {
    constructor(canvas, context, effacer, valider, dessiner, button){
        this.canvas = document.querySelector(canvas);
        this.context = context;
        this.effacer = document.querySelector(effacer);
        this.valider = document.querySelector(valider);
        this.dessiner = dessiner;
        this.button = document.querySelector(button);
    };

    //Méthode d'initialisation du canvas
    initCanvas(){
        this.effacer.addEventListener("click", this.effacerCanvas.bind(this));
        this.button.addEventListener("click", this.effacerCanvas.bind(this));
        this.canvas.addEventListener("mousedown", this.startPosition.bind(this));
        this.canvas.addEventListener("mouseup", this.finishPosition.bind(this));
        this.canvas.addEventListener("mousemove", this.moveMouse.bind(this));
        this.canvas.addEventListener("touchstart", this.touchstart.bind(this));
        this.canvas.addEventListener("touchend", this.touchEnd.bind(this));
        this.canvas.addEventListener("touchmove", this.touchMove.bind(this));
    };

    //Récupération des coordonnées de la souris
    getMousePos(e){
        var rect = this.canvas.getBoundingClientRect();

        return{
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    //Méthode au déplacement de la souris
    moveMouse(e){
        var mousePos = this.getMousePos(e);
        var posX = mousePos.x;
        var posY = mousePos.y;
        this.draw(posX, posY);
    };

    //Exécution du tracé
    draw(posX, posY){
        if(!this.dessiner) return;

        this.context.lineWidth = 2.5;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.strokeStyle = "black";

        this.context.lineTo(posX, posY);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(posX, posY);
        this.valider.disabled = false;
    };

    //Début du tracé
    startPosition(e){
        this.dessiner = true;
        this.draw(e);
    };

    //Fin du tracé
    finishPosition(e){
        this.dessiner = false;
        this.context.beginPath();
    };

    //Méthode pour effacer le canvas
    effacerCanvas(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.valider.disabled = true;
    };

    //Tracé écran tactile
    getTouchPos(e){
        if(e.touches.length > 1){
            return;
        }
        var rect = this.canvas.getBoundingClientRect();

        return{
            touchX: e.targetTouches[0].clientX - rect.left,
            touchY: e.targetTouches[0].clientY - rect.top
        };
    };

    touchMove(e){
        var mousePos = this.getTouchPos(e);
        var posX = mousePos.touchX;
        var posY = mousePos.touchY;
        this.draw(posX, posY);
        e.preventDefault();
    };

    touchEnd(e){
        this.dessiner = false;
        this.context.beginPath();
        e.preventDefault();
    };

    touchstart(e){
        this.dessiner = true;
        this.draw(e);
        e.preventDefault();
    };
};
