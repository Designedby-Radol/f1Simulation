class eliminarCircuitos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML=/*html*/`
        <form id="myForm">
        <label for="search"> Search by name:</label><input type="text" id="buscarEditar"> <br>
        <label for="id"> ID Circuit:</label><input type="text" name="id" disabled> <br>
        <label for="name">Circuit Name:</label><input type="text" name="name" disabled> <br>
        <label for="country"> Country:</label><input type="text" name="country" disabled> <br>
        <label for="length"> Length:</label><input type="text" name="length" disabled> <br>
        <label for="laps"> Laps:</label><input type="text" name="laps" disabled> <br>
        <input type="submit" value="submit" class="submitButton"> 
        </form>
        `
        this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            const result = await this.searchCircuit(textSearch);
            if(result){
                this.editForm(result);
            }else {
                this.clearForm();
            }
        })
        this.shadowRoot.querySelector("#myForm").addEventListener('submit', (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            const circuitID = this.shadowRoot.querySelector('input[name="id"]').value;
            this.deleteCircuit(circuitID);
        })
    }

    editForm(product){
        this.shadowRoot.querySelector('input[name="id"]').value = product.id;
        this.shadowRoot.querySelector('input[name="name"]').value= product.name;
        this.shadowRoot.querySelector('input[name="country"]').value= product.country;
        this.shadowRoot.querySelector('input[name="length"]').value= product.length;
        this.shadowRoot.querySelector('input[name="laps"]').value= product.laps;
    }
    clearForm(){
        this.shadowRoot.querySelector('input[name="id"]').value = "";
        this.shadowRoot.querySelector('input[name="name"]').value= "";
        this.shadowRoot.querySelector('input[name="country"]').value= "";
        this.shadowRoot.querySelector('input[name="length"]').value= "";
        this.shadowRoot.querySelector('input[name="laps"]').value= "";
    }

    async searchCircuit(userInput){
        const url = `http://localhost:3000/circuits/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(circuit => circuit.name.toLowerCase().includes(userInput.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    async deleteCircuit(ID){
        try{
            const response = await fetch(`http://localhost:3000/circuits/${ID}`, {
                method: 'DELETE',
            })
            window.alert("The circuit has been deleted succesfully!")
        }catch(error){
            console.log(error)
        }
    }
}

// customElements.define('eliminar-circuitos', eliminarCircuitos)

