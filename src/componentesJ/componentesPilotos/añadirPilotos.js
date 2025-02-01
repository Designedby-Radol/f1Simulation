export class añadirPilotos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <form action="" id="myform">
        <label for="nombreEquipo"> Buscar</label><input type="text" id="buscarEditar" > <br>
        <label for="idEquipo"> ID equipo</label><input type="text" disabled id="idEquipo" disabled> <br>
        <label for="nombreEquipo"> Nombre Equipo</label><input type="text" id="nombreEquipo" disabled > <br>
        <label for="idPiloto"> ID Piloto</label><input type="text" name="id"> <br>
        <label for="motor"> Nombre Piloto:</label><input type="text" name="nombre"> <br>
        <label for="imagen"> imagen</label><input type="text" name="imagen"> <br>
        <label for="rol"> Rol</label><input type="text" name="rol"> <br>
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
            let data = Object.fromEntries(new FormData(e.target));
            const teamID = this.shadowRoot.querySelector("#idEquipo").value;
            const formattedData = JSON.stringify(data);
            try{
                const response = await fetch(`http://localhost:3000/equipos/${teamID}/`);
                const responseFormatted = await response.json();
                var pilotos = responseFormatted.pilotos;
                pilotos.push(data)
                var finalData = {"pilotos": pilotos};
                fetch(`http://localhost:3000/equipos/${teamID}`,{ 
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(finalData),}
                )
            }catch(error){
                console.error(error)
            }
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
        this.shadowRoot.querySelector("#idEquipo").value = product.id;
        this.shadowRoot.querySelector("#nombreEquipo").value= product.nombre;
    }
    clearForm(){
        this.shadowRoot.querySelector("#idEquipo").value = "";
        this.shadowRoot.querySelector("#nombreEquipo").value= "";
    }
}

// customElements.define('añadir-pilotos', añadirPilotos)