class eliminarCarros extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/ `
    <form action="" id="myform">
        <label for="search"> Search by ID:</label><input type="text" id="buscarEditar"> <br>
        <label for="id"> Car ID:</label><input type="text" name="id" disabled> <br>
        <label for="model"> Model:</label><input type="text" name="model"disabled> <br>
        <label for="motor"> Motor:</label><input type="text" name="motor" disabled> <br>
        <label for="img"> Image:</label><input type="text" name="img" disabled> <br>
        <input type="submit" value="submit" class="submitButton"> 
    </form>
        `
        this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            const result = await this.searchCar(textSearch);
            if(result){
                this.editForm(result);
            }else {
                this.clearForm();
            }
        })
        this.shadowRoot.querySelector("#myform").addEventListener('submit', (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            const carID = this.shadowRoot.querySelector('input[name="id"]').value;
            this.deleteCar(carID)
        })
    }

    async searchCar(userInput){
        const url = `http://localhost:3000/cars/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.id.toLowerCase().includes(userInput.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    editForm(product){
        this.shadowRoot.querySelector('input[name="id"]').value = product.id;
        this.shadowRoot.querySelector('input[name="model"]').value= product.model;
        this.shadowRoot.querySelector('input[name="motor"]').value= product.motor;
        this.shadowRoot.querySelector('input[name="img"]').value= product.img;
    }
    clearForm(){
        this.shadowRoot.querySelector('input[name="id"]').value = "";
        this.shadowRoot.querySelector('input[name="model"]').value= "";
        this.shadowRoot.querySelector('input[name="motor"]').value= "";
        this.shadowRoot.querySelector('input[name="img"]').value= "";
    }

    async deleteCar(id){
        try {
            const response = await fetch (`http://localhost:3000/cars/${id}`, {
                method: 'DElETE',
            });
            if(response.ok){
                window.alert(`The car identified with id ${id} has been deleted succesfully! `)
            }
        }catch(error){
            console.error(error);
    
    }

}

}

//customElements.define('eliminar-carros', eliminarCarros)

