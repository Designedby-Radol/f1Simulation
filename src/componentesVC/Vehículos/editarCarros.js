class editarCarros extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback(){
        this.shadowRoot.innerHTML= /*html*/ `
        <form id="myForm">
        <label for="search"> Search by ID:</label><input type="text" id="buscarEditar"> <br>
        <label for="id"> ID car:</label><input type="text" name="id" disabled> <br>
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
        this.shadowRoot.querySelector("#buscarEditar").addEventListener('input', async(e)=>{
            let textSearch = e.target.value;
            const result = await this.searchCar(textSearch);
            if(result){
                this.editForm(result);
            } else {
                this.clearForm();
            }
        })

        this.shadowRoot.querySelector("#myForm").addEventListener('submit', (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            var carID = this.shadowRoot.querySelector('input[name="id"]').value;
            const structuredData = {
                "id": carID,
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
            }
            this.actualizarData(carID, structuredData)
        })
    }

    async searchCar(userInput){
        const url = `http://localhost:3000/cars/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(car => car.id.toLowerCase().includes(userInput.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    editForm(car) {
        this.shadowRoot.querySelector('input[name="id"]').value = car.id;
        this.shadowRoot.querySelector('input[name="model"]').value= car.model;
        this.shadowRoot.querySelector('input[name="motor"]').value= car.motor;
        this.shadowRoot.querySelector('input[name="img"]').value= car.img;
        this.shadowRoot.querySelector('input[name="acceleration_ZtoH"]').value= car.performance.acceleration_ZtoH;
        this.shadowRoot.querySelector('input[name="max_speed_kmh"]').value= car.performance.max_speed_kmh;
        this.shadowRoot.querySelector('input[name="average_Speed"]').value= car.performance.average_Speed;
        this.shadowRoot.querySelector('input[name="fuel_consumption_dry"]').value= car.performance.fuel_consumption.dry;
        this.shadowRoot.querySelector('input[name="fuel_consumption_rainy"]').value= car.performance.fuel_consumption.rainy;
        this.shadowRoot.querySelector('input[name="fuel_consumption_dry"]').value= car.performance.fuel_consumption.dry;
        this.shadowRoot.querySelector('input[name="fuel_consumption_extreme"]').value= car.performance.fuel_consumption.extreme;
        this.shadowRoot.querySelector('input[name="tire_wear_dry"]').value= car.performance.tire_wear.dry;
        this.shadowRoot.querySelector('input[name="tire_wear_rainy"]').value= car.performance.tire_wear.rainy;
        this.shadowRoot.querySelector('input[name="tire_wear_extreme"]').value= car.performance.tire_wear.extreme;
    }

    clearForm(){
        this.shadowRoot.querySelector('input[name="id"]').value = "";
        this.shadowRoot.querySelector('input[name="model"]').value= "";
        this.shadowRoot.querySelector('input[name="motor"]').value= "";
        this.shadowRoot.querySelector('input[name="img"]').value= "";
        this.shadowRoot.querySelector('input[name="acceleration_ZtoH"]').value= "";
        this.shadowRoot.querySelector('input[name="max_speed_kmh"]').value= "";
        this.shadowRoot.querySelector('input[name="average_Speed"]').value= "";
        this.shadowRoot.querySelector('input[name="fuel_consumption_dry"]').value= "";
        this.shadowRoot.querySelector('input[name="fuel_consumption_rainy"]').value= "";
        this.shadowRoot.querySelector('input[name="fuel_consumption_dry"]').value= "";
        this.shadowRoot.querySelector('input[name="fuel_consumption_extreme"]').value= "";
        this.shadowRoot.querySelector('input[name="tire_wear_dry"]').value= "";
        this.shadowRoot.querySelector('input[name="tire_wear_rainy"]').value= "";
        this.shadowRoot.querySelector('input[name="tire_wear_extreme"]').value= "";    
    }

    async actualizarData(id,data){
        try {
            const respuesta = await fetch(`http://localhost:3000/cars/${id}`, {
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

customElements.define ('editar-carros', editarCarros)
