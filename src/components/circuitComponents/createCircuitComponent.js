class CreateCircuit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformCrearCircuito">
                <h1>Create Circuit</h1>
        
                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="circuitName" required>

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="circuitCountry" required>

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="circuitLength" required>

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="circuitLaps" required>

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="circuitDescription" rows="3" required></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="circuitImage" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;

    const appMain = document.querySelector('#main');

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "6";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 6) {
        btnBack.dataset.ed = "2";
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }
    });
  }
}

customElements.define("create-circuit", CreateCircuit);
