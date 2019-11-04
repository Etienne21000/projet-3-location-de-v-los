document.addEventListener('DOMContentLoaded', function(){

    var Main = {

        //Reservation
        newReservation: new Resa(('#timer'), ('#btnAnnuler'), ('#resa'), ('#valider'), ('#signature'), ('#formulaire'), ('#temps')),

        //Formulaire
        newForm: new Formulaire(("#formulaire"), ("#name"), ("#prenom"), ("#sign"), /^[a-zà-ù-\s]{2,20}$/i, ("#valider"), ('#aideNom'), ('#aidePrenom')),

        //Canvas
        newCanvas: new Canvas(('#canvas'), canvas.getContext('2d'), ('#effacer'), ('#valider'), false, ('#resa')),

        //Slider
        newSlider: new Slider(('#slider'), 0, ('.slide'), ('.slide'), ('#play'), ('#stop'), ('#fleche_droite'), ('#fleche_gauche')),

        //Menu
        newMenu: new Menu(('.menu_ham'), ('.nav')),

        //Map
        newMap: new MyMap(null, 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', 43.603631, 1.447268,
        'https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=54f437814d8eb09f767ed6a1afb4d1e0893f5eec',
        "images/markerouvert.png", "images/markerferme.png", "images/markerfaible.png", "images/markerOver.png",
        ('#signature'), ('#formulaire'), ('#nomStation'), ('#name'), ('#prenom'), ('#resa'), ('#sign'), ('#infosStations')),

        //Initialisation
        init: function(){
            Main.newReservation.init();
            Main.newForm.init();
            Main.newCanvas.initCanvas();
            Main.newSlider.init();
            Main.newMenu.init();
            Main.newMap.init();
        },
    };
    Main.init();
});
