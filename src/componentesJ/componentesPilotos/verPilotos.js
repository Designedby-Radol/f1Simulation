export class verPilotos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/ `
        <label for="buscar"> Buscar</label><input type="text" id="buscarEditar"> <br>
        <label for="id"> ID equipo</label><input id="idEquipo"type="text" name="id"disabled> <br>
        <label for="nombre"> Nombre Equipo</label><input id="nombreEquipo" type="text" name="nombre"disabled> <br>
        <button id="submitButton"> buscar</button>
        <div class= "pilotContainer"> </div>
        
        `

        this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async (e)=>{
            let textSearch = e.target.value;
            console.log(textSearch)
            const result = await this.buscarEquipo(textSearch);
            if(result){
                this.editForm(result);
            }else {
                this.clearForm();
            }
        })
        this.shadowRoot.querySelector("#submitButton").addEventListener("click", async ()=>{
            var teamID = this.shadowRoot.querySelector('#idEquipo').value;
            var dataTeam = await this.obtenerEquipos(teamID);
            const pilotos = dataTeam.pilotos;
            pilotos.forEach(piloto=> {
                const pilotContainer = this.shadowRoot.querySelector(".pilotContainer");
                const pilotCard = document.createElement("div")
                pilotCard.innerHTML = /*html*/`
                <p> ${piloto.id}</p>
                <p> ${piloto.nombre}</p>
                <p> ${piloto.imagen}</p>
                <p> ${piloto.rol}</p>
                `
                pilotContainer.appendChild(pilotCard)
            })
            this.shadowRoot.querySelector("#submitButton").disabled = true;    //Esta es una forma de fixear para que no se reproduzcan las tarjetas de pilotos ilimitadamente. 
        }   
    )
    }
    async obtenerEquipos(id) {
        try {
            const response = await fetch(`http://localhost:3000/equipos/${id}`);
            if(!response.ok){
                throw new Error('No se pudieron obtener los equipos')
            }
            return await response.json()
        }
        catch (error){
            console.error(error);
            return []
            
        }
    }
    async buscarEquipo(inputUsuario){
        const url = `http://localhost:3000/equipos/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(producto => producto.nombre.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

     editForm(product){
        this.shadowRoot.querySelector('#idEquipo').value =  product.id;
        this.shadowRoot.querySelector('#nombreEquipo').value = product.nombre;
    }

    clearForm() {
        this.shadowRoot.querySelector('"#idEquipo').value = "";
        this.shadowRoot.querySelector('#nombreEquipo').value = "";
    }

    
}
// customElements.define('ver-pilotos', verPilotos)