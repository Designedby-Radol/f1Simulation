class verCircuitos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <div id="circuitContainer">

        </div>
        `
        this.mostrarCircuitos()
    }
    async obtenerCircuitos(){
        try{
            const response = await fetch("http://localhost:3000/circuits")
            if (!response.ok){
                throw new error('We could not obtain the circuits.')
            } return await response.json()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async mostrarCircuitos(){
        const data = await this.obtenerCircuitos();
        const circuitContainer = this.shadowRoot.querySelector("#circuitContainer")
        data.forEach(circuit => {

            const circuito = document.createElement("div");
            circuito.className = 'circuit-card'
            circuito.innerHTML = /*html*/ `
            <p>${circuit.id}</p>
            <p>${circuit.name}</p>
            <p>${circuit.country}</p>
            <p>${circuit.length}</p>
            `
            circuitContainer.appendChild(circuito)
        });
    }

}

// customElements.define("ver-circuitos", verCircuitos)
