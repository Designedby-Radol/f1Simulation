class ManageCircuit extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style> @import 'src/css/cardStyle.css'</style>
        <div class= "card">
            <a id="createCircuit">
                <h1>Create Circuit</h1>
                <p>Create a circuit to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="editCircuit">
                <h1>Edit Circuit</h1>
                <p>Edit a circuit that is already been racing in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="deleteCircuit">
                <h1>Delete Circuit</h1>
                <p>Delete a circuit to stop racing in the simulator.</p>
            </a>
            </div>
        <div class= "card">
            <a id="listCircuit">
                <h1>List Circuits</h1>
                <p>List circuits that are ready to be raced at the simulator.</p>
            </a>
        </div>
        `;
        const appMain = document.querySelector('#main');
        
        document.querySelector('#createCircuit').addEventListener('click' , (e) => {
        e.preventDefault();
            
        appMain.innerHTML = `
            <create-circuit></create-circuit>
            `;
        });

        document.querySelector('#editCircuit').addEventListener('click' , (e) => {
        e.preventDefault();
        
        appMain.innerHTML = `
        <edit-circuit></edit-circuit>
        `;
        });

        document.querySelector('#deleteCircuit').addEventListener('click' , (e) => {
            e.preventDefault();
            
            appMain.innerHTML = `
            <delete-circuit></delete-circuit>
            `;
            });
    }
}

customElements.define('manage-circuit', ManageCircuit);