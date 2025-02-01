export class añadirEquipos extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/ `
        <form action="" id="myform">
            <label for="id"> ID equipo</label><input type="text" name="id"> <br>
            <label for="nombre"> Nombre Equipo</label><input type="text" name="nombre"> <br>
            <label for="pais"> pais</label><input type="text" name="pais"> <br>
            <label for="motor"> Motor</label><input type="text" name="motor"> <br>
            <label for="imagen"> Imagen</label><input type="text" name="imagen"> <br>
            <input type="submit" value="submit" class="submitButton"> 
        </form>
        `
        this.shadowRoot.querySelector("#myform").addEventListener("submit", async(e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            data.pilotos = []
            const formattedData = JSON.stringify(data); 
            try {
                const response = await fetch("http://localhost:3000/equipos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: formattedData
                });
                console.log("Producto creado:", formattedData);
                alert("Producto agregado con éxito!");
            } catch (error) {
                console.error("Error al enviar datos:", error);
            }
        })


    }
}

// customElements.define('añadir-equipos', añadirEquipos)

