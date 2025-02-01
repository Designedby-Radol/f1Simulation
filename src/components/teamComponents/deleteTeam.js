class DeleteTeam extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
        <div class="formDelete">
            <form id="myformDeleteTeam">
                <h1>Delete Team</h1>
        
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" required>

                <label for="teamCountry">Country</label>
                <input type="text" id="teamCountry" name="country" disabled>

                <label for="teamBranch">Branch</label>
                <input type="text" id="teamBranch" name="branch" disabled>


                <label for="teamImage">Image URL</label>
                <input type="url" id="teamImage" name="image" disabled>

                <button type="submit">Delete</button>
            </form>
        </div>
        `;

        const appMain = document.querySelector('#main');
        
        const btnBack = document.querySelector("#btnBack");
        btnBack.dataset.ed = "10";
        btnBack.addEventListener("click", () => {
          if (btnBack.dataset.ed == 10) {
            btnBack.dataset.ed = "3";
            appMain.innerHTML = `<manage-team></manage-team>`;
          }
        });
    }
}

customElements.define('delete-team', DeleteTeam)