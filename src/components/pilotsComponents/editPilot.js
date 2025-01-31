class EditPilotComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>@import 'src/css/editStyle.css'</style>
        <div class="formEdit">
            <form id="myformEditPilot">
                <h1>Write team to edit a pilot</h1>
                
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
                <input type="text" id="pilotRole" name="role">

                <label for="pilotImage">Image URL</label>
                <input type="url" id="pilotImage" name="image">

                <button type="submit">Edit</button>
            </form>
        </div>
        `;   
  }
}

customElements.define("edit-pilot", EditPilotComponent);
