class agregarCarros extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/`
        <form id="myForm">
        <label for="id"> ID car:</label><input type="text" name="id"> <br>
        <label for="model">Car model:</label><input type="text" name="model"> <br>
        <label for="motor"> Car Motor:</label><input type="text" name="motor"> <br>
        <label for="acceleration_ZtoH"> Acceleration Zero to Hundred</label><input type="text" name="acceleration_ZtoH"> <br>
        <label for="max_speed_kmh"> Max. Speed (Km/h):</label><input type="text" name="max_speed_kmh"> <br>
        <label for="average_Speed"> Average Speed (Km/h):</label><input type="text" name="average_Speed"> <br>
        <label for="fuel_consumption_dry"> Fuel consumption (dry):</label><input type="text" name="fuel_consumption_dry"> <br>
        <label for="fuel_consumption_rainy"> Fuel consumption (rainy):</label><input type="text" name="fuel_consumption_rainy"> <br>
        <label for="fuel_consumption_extreme"> Fuel consumption (extreme):</label><input type="text" name="fuel_consumption_extreme"> <br>
        <label for="tire_wear_dry"> Tire Wear (dry):</label><input type="text" name="tire_wear_dry"> <br>
        <label for="tire_wear_rainy"> Tire Wear (rainy):</label><input type="text" name="tire_wear_rainy"> <br>
        <label for="tire_wear_extreme"> Tire Wear (extreme):</label><input type="text" name="tire_wear_extreme"> <br>
        <label for="img"> Car image:</label><input type="text" name="img"> <br>
        <input type="submit" value="submit" class="submitButton"> 
        </form>
        `        
        this.shadowRoot.querySelector("#myForm").addEventListener("submit", async(e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            const formattedData = {
                "id": data.id,
                "model": data.model,
                "motor": data.motor,
                "performance": {
                    "acceleration_ZtoH": data.acceleration_ZtoH,
                    "max_speed_kmh": data.max_speed_kmh,
                    "average_Speed": data.average_Speed,
                    "fuel_consumption": {
                        "dry": data.fuel_consumption_dry,
                        "rainy": data.fuel_consumption_rainy,
                        "extreme": data.fuel_consumption_extreme
                    },
                    "tire_wear": {
                        "dry": data.tire_wear_dry,
                        "rainy": data.tire_wear_rainy,
                        "extreme": data.tire_wear_extreme,
                    }
                },
                "image": data.img,
            };
            const finalData = JSON.stringify(formattedData)
            try{
                const response = await fetch("http://localhost:3000/cars",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: finalData
                });
                window.alert("Car was added succesfully!")
            }catch(error){
                console.error(error)
            }
        })
    } 

}
// customElements.define("agregar-vehiculos", agregarCarros)
