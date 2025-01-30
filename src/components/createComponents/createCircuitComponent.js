class CreateCircuit extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <div class="formCrear">
            <form id="myformCrearCircuito">
                <label>Name<input type="text" name="circuitName"></label>
                <label>Country<input type="text" name="circuitCountry"></label>
                <label>Length<input type="number" name="circuitLength"></label>
                <label>Laps <input type="number" name="circuitLaps"></label>
                <label>Description<input type="text" name="circuitDescription"></label>
                <label>Image<input type="url" name="circuitImage"></label>
                <button type="submit">Submit</button>
            </form>
        </div>;
        `;


    }
}

customElements.define('create-circuit', CreateCircuit);