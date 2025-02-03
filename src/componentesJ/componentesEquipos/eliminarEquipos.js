export class eliminarEquipos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <form action="" id="myform">
            <label for="buscar"> Buscar</label><input type="text" id="buscarEditar"> <br>
            <label for="id"> ID equipo</label><input type="text" name="id"> <br>
            <label for="nombre"> Nombre Equipo</label><input type="text" name="nombre"disabled> <br>
            <label for="pais"> pais</label><input type="text" name="pais" disabled> <br>
            <label for="motor"> Motor</label><input type="text" name="motor" disabled> <br>
            <label for="imagen"> Imagen</label><input type="text" name="imagen" disabled> <br>
            <input type="submit" value="submit" class="submitButton"> 
        </form>
    `
    this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async (e)=>{
        let textSearch = e.target.value;
        const result = await this.buscarEquipo(textSearch);
        if(result){
            this.editForm(result);
        }else {
            this.clearForm();
        }
    })

    this.shadowRoot.querySelector("#myform").addEventListener('submit', async (e)=>{
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target))
        const teamID = data.id;
        this.deleteTeam(teamID);
    })

    }

    async buscarEquipo(inputUsuario){
        const url = `http://localhost:3000/equipos/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    editForm(product){
        this.shadowRoot.querySelector('input[name="id"]').value = product.id;
        this.shadowRoot.querySelector('input[name="nombre"]').value= product.nombre;
        this.shadowRoot.querySelector('input[name="pais"]').value= product.pais;
        this.shadowRoot.querySelector('input[name="motor"]').value= product.motor;
        this.shadowRoot.querySelector('input[name="imagen"]').value= product.imagen;
    }
    clearForm(){
        this.shadowRoot.querySelector('input[name="id"]').value = "";
        this.shadowRoot.querySelector('input[name="nombre"]').value= "";
        this.shadowRoot.querySelector('input[name="pais"]').value= "";
        this.shadowRoot.querySelector('input[name="motor"]').value= "";
        this.shadowRoot.querySelector('input[name="imagen"]').value= "";
    }



    async deleteTeam(id){
        try{
            const response = await fetch(`http://localhost:3000/equipos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log(`Equipo con ID ${id} eliminado`);
                this.cargarProductos();
            } else {
                console.error(`Error al eliminar el equipo con ID ${id}`);
            }
        }catch(error){
            console.error('Error al realizar la eliminación:', error);
        }
    }
}

 //customElements.define('eliminar-equipo', eliminarEquipos)