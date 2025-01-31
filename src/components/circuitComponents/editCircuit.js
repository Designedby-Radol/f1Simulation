class EditCircuitComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>@import 'src/css/editStyle.css'</style>
        <div class="formEdit">
            <form id="myformEditCircuito">
                <h1>Edit Circuit</h1>
        
                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="circuitName" required>

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="circuitCountry">

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="circuitLength">

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="circuitLaps">

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="circuitDescription" rows="3"></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="circuitImage">

                <button type="submit">Update</button>
            </form>
        </div>
        `;   
  }
}

customElements.define("edit-circuit", EditCircuitComponent);
