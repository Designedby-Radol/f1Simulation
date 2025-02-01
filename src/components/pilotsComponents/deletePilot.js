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
                
                <label for="teamSearch">Search</label>
                <input type="text" id="teamDelete" required>
                
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" disabled>

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

    this.querySelector("#teamDelete").addEventListener('input', async (e)=>{
        let textSearch = e.target.value;
        const result = await this.searchTeam(textSearch);
        if(result){
            this.deleteForm(result);
        }else {
            this.clearForm();
        }
    })

    this.querySelector("#myformDeletePilot").addEventListener('submit', async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        const teamID = this.querySelector("#teamId").value;
        const formattedData = JSON.stringify(data);
        try{
            const response = await fetch(`http://localhost:3000/teams/${teamID}/`);
            const responseFormatted = await response.json();
            let pilots = responseFormatted.pilots;
            pilots.push(data)
            let finalData = {"pilots": pilots};
            fetch(`http://localhost:3000/teams/${teamID}`,{ 
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalData),})
                console.log("Pilot deleted:", formattedData);
                alert("Pilot deleted successfully!");
              }catch(error){
            console.error(error)
            console.error("Error al enviar datos:", error);
            alert("pipipi")
        }
    })
    }

    async searchTeam(textSearch) {
    const url = `http://localhost:3000/teams/`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.filter(dataSearch => dataSearch.name.toLowerCase().includes(textSearch.toLowerCase()));
    }

    deleteFormOne(product){
        this.querySelector("#teamId").value = product.id;
        this.querySelector("#teamName").value= product.name;
    }
    clearFormOne(){
        this.querySelector("#teamId").value = "";
        this.querySelector("#teamName").value= "";
    }
    
}

customElements.define('delete-pilot', DeletePilot)