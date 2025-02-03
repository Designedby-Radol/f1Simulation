class verCarros extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <div id="carContainer">

        </div>
        `
        this.mostrarCarros()
    }

    async obtenerCarros(){
        try{
            const response = await fetch("http://localhost:3000/cars")
            if(!response.ok){
                throw new Error('We could not obtain the cars.')
            } return  await response.json()
        } catch(error){
            console.error(error);
            return []
        }
    }

    async mostrarCarros(){
        const data  = await this.obtenerCarros();
        const carContainer = this.shadowRoot.querySelector("#carContainer")
        data.forEach(car=>{ 
            const carro = document.createElement("div");
            carro.className = 'car-card'
            carro.innerHTML = /*html*/`
            <p> ${car.id}</p>
            <p>${car.model}</p>
            <p>${car.motor}</p>
            <p>${car.img}</p>
            `
            carContainer.appendChild(carro)
        }
        )
    }
}
// customElements.define('ver-carros', verCarros)
