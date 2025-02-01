export class verEquipos extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    async connectedCallback(){
        this.shadowRoot.innerHTML = /*html*/`
        <div id="teamList"> </div>
        `;

        await this.mostrarEquipos();
    }

    async obtenerEquipos() {
        try {
            const response = await fetch("http://localhost:3000/equipos");
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
    async mostrarEquipos(){
        const data = await this.obtenerEquipos();
        const teamContainer = this.shadowRoot.querySelector('#teamList');
        data.forEach(equipo => {
            const team = document.createElement('team-element')
            team.className = 'teamElement';
            team.innerHTML= /*html*/`
            <p> ${equipo.id}</p>
            <p>${equipo.nombre}</p>
            <p>${equipo.pais}</p>
            <p>${equipo.motor}</p>
            `
            teamContainer.appendChild(team);
        });
    }
}

// customElements.define('ver-equipos', verEquipos)
