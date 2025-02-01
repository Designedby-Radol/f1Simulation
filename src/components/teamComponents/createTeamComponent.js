class CreateTeam extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformCrearTeam">
                <h1>Create Team</h1>
        
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" required>

                <label for="teamCountry">Country</label>
                <input type="text" id="teamCountry" name="country" required>

                <label for="teamBranch">Branch</label>
                <input type="text" id="teamBranch" name="branch" required>


                <label for="teamImage">Image URL</label>
                <input type="url" id="teamImage" name="image" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;

        const appMain = document.querySelector('#main');
        
        const btnBack = document.querySelector("#btnBack");
        btnBack.dataset.ed = "9";
        btnBack.addEventListener("click", () => {
          if (btnBack.dataset.ed == 9) {
            btnBack.dataset.ed = "3";
            appMain.innerHTML = `<manage-team></manage-team>`;
          }
        });
  }
}

customElements.define("create-team", CreateTeam);
