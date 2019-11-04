class MyMap {
    constructor(carte, tileL, lat, lng, apiJcd, markerOuvert, markerFerme, markerFaible, markerOver, aside, form, nomStation, nomElt, prenomElt, button, sign, infosStations){
        this.carte = carte;
        this.tileL = tileL;
        this.lat = lat;
        this.lng = lng;
        this.apiJcd = apiJcd;
        this.markerOuvert = markerOuvert;
        this.markerFerme = markerFerme;
        this.markerFaible = markerFaible;
        this.markerOver = markerOver;
        this.aside = document.querySelector(aside);
        this.form = document.querySelector(form);
        this.nomStation = document.querySelector(nomStation);
        this.nomElt = document.querySelector(nomElt);
        this.prenomElt = document.querySelector(prenomElt);
        this.button = document.querySelector(button);
        this.sign = document.querySelector(sign);
        this.infosStations = document.querySelector(infosStations);
        this.markerElt;
    };

    init(){
        this.initMap();
        this.getStations();
    };

    //Initialisartion de la map
    initMap(){
        this.carte = new L.map('map', {
            center: [this.lat, this.lng],
            zoom: 12
        });

        this.tile = L.tileLayer(this.tileL, {
            maxZoom: 20
        });
        this.carte.addLayer(this.tile);
    };

    //récupération des données des getStations
    getStations(){
        ajaxGet(this.apiJcd,
            function(reponse){
                var stations = JSON.parse(reponse);
                stations.forEach(function(station){
                    this.createMarkers(station);
                }.bind(this));
            }.bind(this));
        };

        //Création des markers
        createMarkers(station){
            var leafIcon = L.Icon.extend ({
                options: {
                    shadowUrl: 'images/marker_shadow.png',
                    iconSize: [40, 40],
                    shadowSize: [40, 32],
                    iconAnchor: [20, 40],
                    shadowAnchor: [20, 40],
                    popupAnchor: [0, -35]
                }
            });

            //Définition des images des marqueurs
            var greenIcon = new leafIcon({iconUrl: this.markerOuvert});
            var jauneIcon = new leafIcon({iconUrl: this.markerFaible});
            var rougeIcon = new leafIcon({iconUrl: this.markerFerme});
            var blackIcon = new leafIcon({iconUrl: this.markerOver});

            this.markerElt = L.marker([station.position.lat, station.position.lng], {icon: greenIcon});

            if(station.status === "CLOSED"){
                this.markerElt = L.marker([station.position.lat, station.position.lng], {icon: blackIcon});
            }

            if((station.available_bikes >= 1) && (station.available_bikes <= 3)){
                this.markerElt = L.marker([station.position.lat, station.position.lng], {icon: jauneIcon});
            }
            else if(station.available_bikes === 0){
                this.markerElt = L.marker([station.position.lat, station.position.lng], {icon: rougeIcon});
            }

            this.carte.addLayer(this.markerElt);

            this.markerClick(station);
        };

        markerClick(station){
            this.markerElt.addEventListener("click", function(e){
                if(sessionStorage.getItem("endDate")===null){
                    this.checkStorage(station);
                }
                else {
                    this.resetResa(station);
                }
                this.getFocus();
            }.bind(this));
        };

        getFocus(){
            if(screen.width <= 1023){
                this.aside.focus();
                this.aside.scrollIntoView({behavior:"smooth"});
            }
        };

        infoStation(station){

            if(station.status === "OPEN"){
                station.status = "ouverte";
            }
            else if(station.status === "CLOSED") {
                station.status = "fermée";
            }

            if(station.available_bikes >= 1){
                this.nomStation.innerHTML = "<div>" + "<strong>" + "Station " + "</strong>" + "<br>" + station.name + "<br>" + station.address+ "<br>" + "Station : " + station.status + "</div>" + "<p>" + "<strong>" + station.available_bikes + "</strong>" + " vélos disponibles" + "<br>" + "<strong>" + station.available_bike_stands + "</strong>" + " places disponibles" + "</p>";
                this.nomElt.style.display = "block";
                this.prenomElt.style.display = "block";
                this.button.style.display = "block";
                this.form.style.display = "none";
            }
            else {
                this.nomStation.innerHTML = "<div>" + "<strong>" + "Station " + "</strong>" + "<br>" + station.name + "<br>" + station.address + "<br>" + "Station : " + station.status + "</div>" + "<p>" + "Aucun vélo disponible à cette station" + "<br>" + "Vous ne pouvez pas réserver." + "</p>" ;
                this.form.style.display = "none";
                this.button.style.display = "none";
            }
            if(station.status === "CLOSED"){
                this.nomStation.innerHTML = "<div>" + "<strong>" + "Station " + "</strong>" + "<br>" + station.name + "<br>" + station.address + "<br>" + "Station : " + station.status + "</div>" + "<p>" + "Cette station est fermée." + "<br>" + "Vous ne pouvez pas réserver." + "</p>" ;
                this.form.style.display = "none";
                this.button.style.display = "none";
            }

        };

        checkStorage(station){

            sessionStorage.setItem('name', station.name);
            sessionStorage.setItem('address', station.address);
            sessionStorage.setItem('velos', station.available_bikes);
            sessionStorage.setItem('stand', station.available_bike_stands);
            this.aside.style.display = "block";
            this.infosStations.style.display = "block";

            this.infoStation(station);
        };

        //Méthode qui permet de revenir à l'affichage de la station
        resetResa(station){
            var cancel = window.confirm('Voulez-vous effectuer une nouvelle réservation à la station ' + station.name + ' ? Celle-ci annulera la précédente.');
            if(cancel){
                sessionStorage.clear();
                setTimeout(function(){
                    this.checkStorage(station);
                }.bind(this), 100);
            }
        };
    };
