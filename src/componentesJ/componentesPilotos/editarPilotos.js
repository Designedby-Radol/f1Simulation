export class editarPilotos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML = /*html*/ `
        <label>Buscar Equipo<input type="text" id="buscarEquipo"></label><br>  
        <label>Codigo Equipo: <input type="text" id="idEquipo" disabled></label><br>
        <label>Nombre Equipo: <input type="text" id="nombreEquipo" disabled></label><br>
        <label>BuscarJugador <input type="text" id="buscarJugador"></label><br>
        <form id="myForm">
        <label>Codigo Jugador: <input type="text" id="codigoPiloto" name="id" disabled></label><br>
        <label>Nombre Jugador: <input type="text" id="nombrePiloto" name="nombre"></label><br>
        <label> Imagen Jugador: <input type="text" id="imagenPiloto" name="imagen"></label><br>
        <label> Rol Jugador: <input type="text" id="nombreRol" name="rol"></label><br>
        <input type="submit" value="submit" class="submitButton">
        </form>
        `
        this.shadowRoot.querySelector("#buscarEquipo").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            const result = await this.buscarEquipo(textSearch);
            if(result){
                this.editTeam(result);
            }else {
                this.clearTeam();
            }
        })

        this.shadowRoot.querySelector("#buscarJugador").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            const ID= this.shadowRoot.querySelector('#idEquipo').value 
            const result = await this.buscarPilotos(textSearch, ID)
            if(result){
                this.editPilots(result);
            } else {
                this.clearPilots();
            }
            
        })
        this.shadowRoot.querySelector('#myForm').addEventListener('submit', async(e)=>{
            e.preventDefault()
            const ID= this.shadowRoot.querySelector('#idEquipo').value
            let dataForm = Object.fromEntries(new FormData(e.target));
            console.log(dataForm)
            try{
                const pilotId = this.shadowRoot.querySelector('#codigoPiloto').value;
                const response = await fetch(`http://localhost:3000/equipos/${ID}/`)
                const responseFormatted = await response.json();
                var pilotos = responseFormatted.pilotos;
                    pilotos.forEach(piloto=>{
                        if(piloto.id==pilotId){
                            piloto.nombre = dataForm.nombre;
                            piloto.imagen = dataForm.imagen;
                            piloto.rol = dataForm.rol;
                        }
                    })
                var finalData = {"pilotos": pilotos};
                fetch(`http://localhost:3000/equipos/${ID}`,{ 
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(finalData),}
                    )
            }catch(error){
                console.error(error);
            }
            
        })
    }
    editTeam(product){
        this.shadowRoot.querySelector('#idEquipo').value =  product.id;
        this.shadowRoot.querySelector('#nombreEquipo').value = product.nombre;
    }

    clearTeam() {
        this.shadowRoot.querySelector('"#idEquipo').value = "";
        this.shadowRoot.querySelector('#nombreEquipo').value = "";
    }
    editPilots(pilot){
        this.shadowRoot.querySelector('#codigoPiloto').value= pilot.id;
        this.shadowRoot.querySelector('#nombrePiloto').value= pilot.nombre;
        this.shadowRoot.querySelector('#imagenPiloto').value= pilot.imagen;
        this.shadowRoot.querySelector('#nombreRol').value= pilot.rol;
    }
    clearPilots(){
        this.shadowRoot.querySelector('#codigoPiloto').value= "";
        this.shadowRoot.querySelector('#nombrePiloto').value= "";
        this.shadowRoot.querySelector('#imagenPiloto').value= "";
        this.shadowRoot.querySelector('#nombreRol').value = "";
    }

    async buscarEquipo(inputUsuario){
        const url = `http://localhost:3000/equipos/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    async buscarPilotos(inputUsuario, id){
        const url = `http://localhost:3000/equipos/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const pilotos = data.pilotos
        const result = pilotos.filter(piloto => piloto.nombre.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
        
    }
}
// customElements.define('editar-pilotos', editarPilotos)