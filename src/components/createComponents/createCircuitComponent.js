class CreateCircuit extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <div class="formCrear">
            <form id="myformCrearCircuito">
                <label>Name<input type="text"></label>
                <label>Country<input type="text"></label>
                <label>Length<input type="number"></label>
                <label>Laps <input type="number"></label>
                <label>Description<input type="text"></label>
                <label>Image<input type="url"></label>
                <button type="submit">Submit</button>
            </form>
        </div>
        `;

        
    }
}

customElements.define('create-circuit', CreateCircuit);