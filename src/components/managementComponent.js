class ManagementComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style> @import 'src/css/cardStyle.css'</style>
        <div class= "card">
            <a id="manageCircuit">
                <h1>Manage Circuits</h1>
                <p>Manage circuits to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="manageTeam">
                <h1>Manage Teams</h1>
                <p>Manage teams to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="managePilots">
                <h1>Manage Pilots</h1>
                <p>Manage a pilots to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="manageCars">
                <h1>Manage Cars</h1>
                <p>Manage a car to pilots to race.</p>
            </a>
        </div>
        `;
        const appMain = document.querySelector('#main');
        document.querySelector('#manageCircuit').addEventListener('click' , (e) => {
            e.preventDefault();
            appMain.innerHTML = `
            <manage-circuit></manage-circuit>
            `;
        });
        document.querySelector('#manageTeam').addEventListener('click' , (e) => {
            e.preventDefault();
            appMain.innerHTML = `
            <manage-team></manage-team>
            `;
        });
        document.querySelector('#managePilots').addEventListener('click' , (e) => {
            e.preventDefault();
            appMain.innerHTML = `
            <manage-pilots></manage-pilots>
            `;
        });
    }
}

customElements.define('management-component', ManagementComponent);