class CreatePilot extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformSelectTeam">
                <h1>Write Team and pilot</h1>
                
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
                <input type="text" id="pilotRole" name="role" required>

                <label for="pilotImage">Image URL</label>
                <input type="url" id="pilotImage" name="image" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;

    }
}

customElements.define('create-pilot', CreatePilot);