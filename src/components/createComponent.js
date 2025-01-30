class CreateComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style> @import 'src/css/createStyle.css'</style>
        <div class= "card">
            <a id="createCircuit">
                <h1>Create Circuit</h1>
                <p>Create a circuit to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="createTeam">
                <h1>Create Team</h1>
                <p>Create a team to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="createPilots">
                <h1>Create Pilot</h1>
                <p>Create a pilot to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="createCars">
                <h1>Create Cars</h1>
                <p>Create a car to pilots to race.</p>
            </a>
        </div>
        `;
        const appMain = document.querySelector('#main');

        let contAtras = 2
        if (contAtras === 2){
            const btnBack = document.querySelector('#btnBack').addEventListener('click', () =>{
                appMain.innerHTML = ''
    }); 
  }
    
    document.querySelector('#createCircuit').addEventListener('click' , (e) => {
        e.preventDefault();
        
        appMain.innerHTML = `
        <create-circuit></create-circuit>
        `;
    
    
    })
    
  }
}

customElements.define("create-component", CreateComponent);
