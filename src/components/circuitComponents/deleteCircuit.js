class DeleteCircuit extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
        <div class="formDelete">
            <form id="myformDeleteCircuito">
                <h1>Delete Circuit</h1>
        
                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="circuitName" required>

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="circuitCountry" disabled>

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="circuitLength" disabled>

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="circuitLaps" disabled>

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="circuitDescription" rows="3" disabled></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="circuitImage" disabled>

                <button type="submit">Delete</button>
            </form>
        </div>
        `;
    }
}

customElements.define('delete-circuit', DeleteCircuit)