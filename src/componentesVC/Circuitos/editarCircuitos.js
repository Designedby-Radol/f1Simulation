class editarCircuitos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/ `
        <form id="myForm">
        <label for="search"> Search by name:</label><input type="text" id="buscarEditar"> <br>
        <label for="id"> Circuit ID:</label><input type="text" name="id" disabled> <br>
        <label for="name">Circuit Name:</label><input type="text" name="name"   > <br>
        <label for="country"> Country:</label><input type="text" name="country" > <br>
        <label for="length"> Length:</label><input type="text" name="length" > <br>
        <label for="laps"> Laps:</label><input type="text" name="laps" > <br>
        <label for="description"> Description:</label><input type="text" name="description" > <br>
        <label for="img"> Circuit image:</label><input type="text" name="img"> <br>
        <input type="submit" value="submit" class="submitButton"> 
        </form>
        `
        this.shadowRoot.querySelector("#myForm").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            const result = await this.searchCircuit(textSearch);
            if(result){
                this.editForm(result)
            }
        })

        this.shadowRoot.querySelector("#myForm").addEventListener('submit', (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            const circuitID = this.shadowRoot.querySelector('input[name="id"]').value;
            console.log(circuitID)
            const structuredData = {
                "id": circuitID,
                "name": data.name,
                "country": data.country,
                "length": data.length,
                "laps": data.laps,
                "description": data.description,
                "img": data.image
            }
            this.actualizarData(circuitID, structuredData)
        })
    }
    async searchCircuit(userInput){
        const url = `http://localhost:3000/circuits/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(circuit => circuit.name.toLowerCase().includes(userInput.toLowerCase()))
        return result.length > 0 ? result[0] : null;
    }

    editForm(circuit){
        this.shadowRoot.querySelector('input[name="id"]').value = circuit.id;
        this.shadowRoot.querySelector('input[name="name"]').value= circuit.name;
        this.shadowRoot.querySelector('input[name="country"]').value= circuit.country;
        this.shadowRoot.querySelector('input[name="length"]').value= circuit.length;
        this.shadowRoot.querySelector('input[name="laps"]').value= circuit.laps;
        this.shadowRoot.querySelector('input[name="description"]').value= circuit.description;
        this.shadowRoot.querySelector('input[name="img"]').value= circuit.img;
    }

    clearForm(){
        this.shadowRoot.querySelector('input[name="id"]').value = "";
        this.shadowRoot.querySelector('input[name="name"]').value= "";
        this.shadowRoot.querySelector('input[name="country"]').value= "";
        this.shadowRoot.querySelector('input[name="length"]').value= "";
        this.shadowRoot.querySelector('input[name="laps"]').value= "";
        this.shadowRoot.querySelector('input[name="description"]').value= "";
        this.shadowRoot.querySelector('input[name="img"]').value= "";
    }
    async actualizarData(id,data){
        try {
            const respuesta = await fetch(`http://localhost:3000/circuits/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
    
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            } else {
                console.log("se envio la path info")
            }     
    
        } catch (error) {
            console.error('Error en la solicitud PATCH:', error.message);
        }
    };
}

customElements.define('editar-circuitos', editarCircuitos)
