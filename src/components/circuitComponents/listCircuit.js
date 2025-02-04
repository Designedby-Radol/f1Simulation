class ListCircuits extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML= /*html*/`
        <style>
        @import 'src/css/hoverCard.css'
        </style>
        <div id="cardListedContainer">
        </div>
        `;
        this.listCircuits();
        this.querySelectorAll('')
    }
    async getCircuits(){
        try{
            const response = await fetch("http://localhost:3000/circuits")
            if(!response.ok){
                throw new Error('We could not obtain the cars.')
            } return  await response.json()
        } catch(error){
            console.error(error);
            return []
        }
    }
    async listCircuits(){
        const data  = await this.getCircuits();
        const cardContainer = this.querySelector("#cardListedContainer")
        data.forEach(circuit=>{ 
            const circuitCard = document.createElement("article");
            circuitCard.className = 'list-card '
            circuitCard.dataset.ed = `${circuit.id}`
            circuitCard.dataset.circuitDescription = circuit.description;
            const firstCard = document.createElement("div");
            firstCard.innerHTML =`
            <p> ${circuit.name}</p>
            <p>${circuit.country}</p>
            <p>${circuit.length}</p>
            <p>${circuit.laps}</p>
            `;
            const secondCard = document.createElement("div");
            secondCard.innerHTML =`
            <img src="${circuit.image}" alt="">       
            `
            circuitCard.appendChild(firstCard)
            circuitCard.appendChild(secondCard)
            cardContainer.appendChild(circuitCard)
        }
        )
    }
}
customElements.define('list-circuits', ListCircuits)