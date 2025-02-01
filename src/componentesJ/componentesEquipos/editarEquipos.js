export class editarEquipos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    async connectedCallback(){
        this.shadowRoot.innerHTML = /*html*/`
        <form id="editTeamsForm">
            <label>Buscar <input type="text" id="buscarEditar"></label>
            <label>Codigo <input type="text" name="id" disabled></label>
            <label>Nombre <input type="text" name="nombre"></label>
            <label>País <input type="text" name="pais"></label>
            <label>Motor <input type="text" name="motor"></label>
            <label>Imagen <input type="text" name="imagen"></label>
            <button type="submit">Enviar</button>
        </form>
        `
        this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async (e) => {
            let textSearch = e.target.value;
            const result = await this.buscarEquipo(textSearch);
            if(result){
                this.editForm(result);
            }else {
                this.clearForm();
            }
        });

        this.shadowRoot.querySelector("#editTeamsForm").addEventListener('submit', (e)=>{
            e.preventDefault()
            const formData = Object.fromEntries(new FormData(e.target)); 
            var teamID = this.shadowRoot.querySelector('input[name="id"]').value;
            this.actualizarData(teamID, formData)
        })
    }

    editForm(product){
        this.shadowRoot.querySelector('input[name="id"]').value = product.id;
        this.shadowRoot.querySelector('input[name="nombre"]').value = product.nombre;
        this.shadowRoot.querySelector('input[name="motor"]').value = product.motor;
        this.shadowRoot.querySelector('input[name="pais"]').value = product.pais;
        this.shadowRoot.querySelector('input[name="imagen"]').value = product.imagen;
    }

    clearForm() {
        this.querySelector('input[name="id"]').value = "";
        this.querySelector('input[name="nombre"]').value = "";
        this.querySelector('input[name="pais"]').value = "";
        this.querySelector('input[name="motor"]').value = "";
        this.querySelector('input[name="imagen"]').value = "";
    }

    async buscarEquipo(inputUsuario){
        const url = `http://localhost:3000/equipos/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    async actualizarData(id,data){
        try {
            const respuesta = await fetch(`http://localhost:3000/equipos/${id}`, {
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

// customElements.define('editar-equipo', editarEquipos)
