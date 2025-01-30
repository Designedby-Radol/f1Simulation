class CreateComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class= "card">
            <button id="createCircuit">
                Create Circuit
            </button>
        </div>
        <div class= "card">
            <button id="createTeam">
                Create Team
            </button>
        </div>
        <div class= "card">
            <button id="createCars">
                Create Cars
            </button>
        </div>
        `;
    
    document.querySelector('#createCircuit').addEventListener('click' , (e) => {
        e.preventDefault();
        const appMain = document.querySelector('#app');
        appMain.innerHTML = `
        <create-circuit></create-circuit>
        `;
    })
    
  }
}

customElements.define("create-component", CreateComponent);
