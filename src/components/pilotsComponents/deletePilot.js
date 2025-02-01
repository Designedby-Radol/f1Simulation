class DeletePilot extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
        <div class="formDelete">
            <form id="myformDeletePilot">
                <h1>Write team to delete a pilot</h1>
                
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" required>

                <label for="teamCountry">Country</label>
                <input type="text" id="teamCountry" name="country" disabled>

                <label for="teamBranch">Branch</label>
                <input type="text" id="teamBranch" name="branch" disabled>


                <label for="teamImage">Image URL</label>
                <input type="url" id="teamImage" name="image" disabled>

                <label for="pilotName">Name</label>
                <input type="text" id="pilotName" name="name" required>

                <label for="pilotRole">Role</label>
                <input type="text" id="pilotRole" name="role" disabled>

                <label for="pilotImage">Image URL</label>
                <input type="url" id="pilotImage" name="image" disabled>

                <button type="submit">Delete</button>
            </form>
        </div>
        `;
        const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "13";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 13) {
        btnBack.dataset.ed = "4";
        appMain.innerHTML = `<manage-pilots></manage-pilots>`;
      }
    });
    }
}

customElements.define('delete-pilot', DeletePilot)