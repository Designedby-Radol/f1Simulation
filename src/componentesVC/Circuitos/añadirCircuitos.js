class añadirCircuito extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <form id="myForm">
        <label for="id"> ID Circuit:</label><input type="text" name="id"> <br>
        <label for="name">Circuit Name:</label><input type="text" name="name"> <br>
        <label for="country"> Country:</label><input type="text" name="country"> <br>
        <label for="length"> Length:</label><input type="text" name="length"> <br>
        <label for="laps"> Laps:</label><input type="text" name="laps"> <br>
        <label for="description"> Description:</label><input type="text" name="description"> <br>
        <label for="img"> Circuit image:</label><input type="text" name="img"> <br>
        <input type="submit" value="submit" class="submitButton"> 
        </form>
        `
        this.shadowRoot.querySelector("#myForm").addEventListener('submit', async (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            data.lap_record= {};
            data.winners = [];
            const formattedData = {
                "id": data.id,
                "name": data.name,
                "country": data.country,
                "length": data.length, 
                "laps": data.laps,
                "description": data.description,
                "img": data.img,
                "lap_record": data.lap_record,
                "winners": data.winners
            }
            const finalData = JSON.stringify(formattedData);
            try{
                const response =  await fetch("http://localhost:3000/circuits", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: finalData
                });
                window.alert("The circuit has been added succesfully!")
            }catch(error){
                console.error(error)
            }

        })
    }
}

// customElements.define('añadir-circuito', añadirCircuito);
