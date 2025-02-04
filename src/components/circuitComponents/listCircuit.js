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

    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "9";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 8) {
        btnBack.dataset.ed = "2";
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }

    document.querySelector('.list-card').addEventListener('click', (e) =>{
        console.log(e.target.dataset.tid);
    })
    });

    this.listCircuits();
  }

  async getCircuits() {
    try {
      const response = await fetch("http://localhost:3000/circuits");
      if (!response.ok) {
        throw new Error("We could not obtain the cars.");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async listCircuits() {
    const data = await this.getCircuits();
    const cardContainer = this.querySelector("#cardListedContainer");
    data.forEach((circuit) => {
      const circuitCard = document.createElement("article");
      circuitCard.className = "list-card";
      circuitCard.dataset.tid = `${circuit.id}`;
      const firstCard = document.createElement("div");
      firstCard.innerHTML = `
            <img src="${circuit.image}" alt="">
            <p> ${circuit.name}</p>
            <p>${circuit.country}</p>
            <p>${circuit.length}</p>
            <p>${circuit.laps}</p>
            `;

      const secondCard = document.createElement("div");
      secondCard.innerHTML = `
            <p>${circuit.description}</p>          
            `;
      circuitCard.appendChild(firstCard);
      circuitCard.appendChild(secondCard);
      cardContainer.appendChild(circuitCard);
    });
    document.querySelector('.list-card').addEventListener('click', (e) =>{
        console.log(e.target.dataset.tid);
    })
  }
}
customElements.define("list-circuits", ListCircuits);
