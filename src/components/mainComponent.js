class MainComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = ``;
    }
}