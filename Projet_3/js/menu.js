/*Menu principal*/
class Menu {
    constructor(menu, nav){
        this.menu = document.querySelector(menu);
        this.nav = document.querySelector(nav);
        this.cross = document.querySelector(".fa-arrow-left");
    };

    openMenu(){
        this.nav.classList.toggle('nav_open');
    };

    closeMenu(){
        this.nav.toggle('nav_open');
    }

    init(){
        this.menu.addEventListener("click", this.openMenu.bind(this));
        this.cross.addEventListener("click", this.closeMenu.bind(this));
    };
};
