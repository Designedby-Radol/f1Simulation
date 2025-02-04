import { Application } from '@splinetool/runtime';

class Circuit {
    constructor(name, laps, length, weather) {
        this.name = name;
        this.laps = laps;
        this.length = length;
        this.weather = weather;
    }
}

class Car {
    constructor(acceleration, maxSpeed, normalSpeed) {
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.normalSpeed = normalSpeed;
        this.fuelConsumption = {
            dry: 1.9,
            rainy: 2.1,
            extreme: 2.4
        };
        this.tireWear = {
            dry: 1.5,
            rainy: 0.8,
            extreme: 2.5
        };
    }
}

class Driver {
    constructor(name, number, car) {
        this.name = name;
        this.number = number;
        this.car = car;
        this.lapTimes = [];
        this.totalTime = 0;
    }
}

class SingleDriverRace {
    constructor(circuit, driver) {
        this.circuit = circuit;
        this.driver = driver;
    }

    calculateLapTime() {
        const baseTime = (this.circuit.length / this.driver.car.normalSpeed) * 3600;
        const currentLap = this.driver.lapTimes.length + 1;
        
        const weatherEffect = {
            dry: 1,
            rainy: 1.2,
            extreme: 1.4
        }[this.circuit.weather];
        
        const tireWear = this.driver.car.tireWear[this.circuit.weather] * (currentLap / this.circuit.laps);
        const fuelEffect = this.driver.car.fuelConsumption[this.circuit.weather] * (currentLap / this.circuit.laps);
        const randomFactor = 0.95 + Math.random() * 0.1;

        return baseTime * weatherEffect * (1 + tireWear) * (1 + fuelEffect) * randomFactor;
    }

    simulate() {
        this.driver.lapTimes = [];
        this.driver.totalTime = 0;

        for (let lap = 1; lap <= this.circuit.laps; lap++) {
            const lapTime = this.calculateLapTime();
            this.driver.lapTimes.push(lapTime);
            this.driver.totalTime += lapTime;
        }
    }

    getResults() {
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = (seconds % 60).toFixed(3);
            return `${mins}:${secs.padStart(6, '0')}`;
        };

        return {
            driverName: this.driver.name,
            number: this.driver.number,
            totalTime: formatTime(this.driver.totalTime),
            lapTimes: this.driver.lapTimes.map((time, index) => ({
                lap: index + 1,
                time: formatTime(time)
            }))
        };
    }
}

class SimulateCard extends HTMLElement {
    constructor() {
        super();
        this.isSimulating = false;
        this.currentLap = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
    }

    async connectedCallback() {
        await this.render();
        this.addStyles();
        await this.initializeSplineScenes();
    }

    async initializeSplineScenes() {
        try {
            const carCanvas = this.querySelector('#carCanvas');
            const circuitCanvas = this.querySelector('#circuitCanvas');

            if (!carCanvas || !circuitCanvas) {
                console.error('Canvas elements not found');
                return;
            }

            carCanvas.width = carCanvas.offsetWidth;
            carCanvas.height = carCanvas.offsetHeight;
            circuitCanvas.width = circuitCanvas.offsetWidth;
            circuitCanvas.height = circuitCanvas.offsetHeight;

            const carApp = new Application(carCanvas);
            const circuitApp = new Application(circuitCanvas);

            await Promise.all([
                carApp.load('https://prod.spline.design/Dp7C-Wkt66wsbWGb/scene.splinecode'),
                circuitApp.load('https://prod.spline.design/yPpBOo5turGeSN1X/scene.splinecode')
            ]);
        } catch (error) {
            console.error('Error initializing Spline scenes:', error);
        }
    }

    addStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .simulation-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                padding: 20px;
                max-width: 1400px;
                margin: 0 auto;
                height: 100vh;
                background-color: #121212;
            }

            .left-cards {
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: 100%;
            }

            .canvas-container {
                background: #1E1E1E;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                height: calc(50% - 10px);
                min-height: 300px;
                position: relative;
                overflow: hidden;
                border: 1px solid #333;
            }

            #carCanvas, #circuitCanvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100% !important;
                height: 100% !important;
            }

            .results-card {
                background: #1E1E1E;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: 95.1vh;
                color: #FFFFFF;
                border: 1px solid #333;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #2196F3 #1E1E1E;
            }

            /* Estilos para la scrollbar en Chrome/Safari */
            .results-card::-webkit-scrollbar {
                width: 8px;
            }

            .results-card::-webkit-scrollbar-track {
                background: #1E1E1E;
                border-radius: 4px;
            }

            .results-card::-webkit-scrollbar-thumb {
                background: #2196F3;
                border-radius: 4px;
            }

            .results-card::-webkit-scrollbar-thumb:hover {
                background: #1976D2;
            }

            .simulation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background: #2D2D2D;
                border-radius: 8px;
            }

            .circuit-name, .driver-name {
                font-size: 1.5rem;
                font-weight: bold;
                color: #2196F3;
            }

            .weather-icon {
                font-size: 2rem;
            }

            .time-display {
                font-size: 2.5rem;
                text-align: center;
                font-weight: bold;
                color: #FFFFFF;
                padding: 20px;
                background: #2D2D2D;
                border-radius: 8px;
                margin: 20px 0;
            }

            .simulate-button {
                position: sticky;
                bottom: 0;
                margin-top: 20px;
                padding: 15px 30px;
                font-size: 1.2rem;
                background-color: #2196F3;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }

            .simulate-button:hover {
                background-color: #1976D2;
            }

            .simulate-button:disabled {
                background-color: #424242;
                cursor: not-allowed;
            }

            .lap-times {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background: #2D2D2D;
                border-radius: 4px;
                color: #FFFFFF;
            }

            .completed-lap {
                background-color: #1B5E20;
                color: #FFFFFF;
            }

            .simulation-title {
                font-size: 2rem;
                color: #2196F3;
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
            }

            .info-sections {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }

            .info-section {
                background: #2D2D2D;
                padding: 15px;
                border-radius: 8px;
            }

            .info-section h3 {
                color: #2196F3;
                margin-bottom: 15px;
                font-size: 1.2rem;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px;
                background: #363636;
                border-radius: 4px;
                margin-bottom: 8px;
                color: #FFFFFF;
            }

            .time-display {
                font-size: 3rem;
                text-align: center;
                font-weight: bold;
                color: #FFFFFF;
                padding: 20px;
                background: #2D2D2D;
                border-radius: 8px;
                margin: 20px 0;
                font-family: monospace;
            }

            .completed-lap {
                background-color: #1B5E20;
                color: #FFFFFF;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    async simulateRace() {
        if (this.isSimulating) return;
        
        this.isSimulating = true;
        this.currentLap = 0;
        this.elapsedTime = 0;
        
        const monza = new Circuit("Monza", 32, 0.230, "dry");
        const car = new Car(2.6, 340, 320);
        const driver = new Driver("Max Verstappen", 2, car);
        const race = new SingleDriverRace(monza, driver);
        
        race.simulate();
        const results = race.getResults();
        
        this.updateResults({
            ...results,
            circuit: monza,
            car: car,
            driver: driver,
            currentTime: '0:00.000'
        });
        
        const updateInterval = 100;
        this.intervalId = setInterval(() => {
            this.elapsedTime += updateInterval / 1000;
            
            if (this.currentLap < results.lapTimes.length) {
                const currentLapTime = this.parseTime(results.lapTimes[this.currentLap].time);
                if (this.elapsedTime >= currentLapTime) {
                    this.currentLap++;
                }
            }
            
            this.updateResults({
                ...results,
                circuit: monza,
                car: car,
                driver: driver,
                currentTime: this.formatTime(this.elapsedTime)
            });
            
            if (this.elapsedTime >= this.parseTime(results.totalTime)) {
                clearInterval(this.intervalId);
                this.isSimulating = false;
            }
        }, updateInterval);
    }

    parseTime(timeString) {
        const [mins, secs] = timeString.split(':');
        return parseInt(mins) * 60 + parseFloat(secs);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(3);
        return `${mins}:${secs.padStart(6, '0')}`;
    }

    updateResults(results) {
        const resultsCard = this.querySelector('.results-card');
        if (!resultsCard) return;

        const weatherIcons = {
            dry: '☀️ Seco',
            rainy: '🌧️ Lluvia',
            extreme: '⛈️ Tormenta'
        };

        const lapRows = Array(results.circuit?.laps || 3)
            .fill(0)
            .map((_, index) => `
                <div class="info-row ${this.currentLap > index ? 'completed-lap' : ''}">
                    <span>Vuelta ${index + 1}</span>
                    <span>${this.currentLap > index && results.lapTimes[index] ? results.lapTimes[index].time : '--:--:---'}</span>
                </div>
            `)
            .join('');

        resultsCard.innerHTML = `
            <h2 class="simulation-title">Simulación</h2>
            
            <div class="info-sections">
                <div class="info-section">
                    <h3>🏁 Circuito</h3>
                    <div class="info-row">
                        <span>Nombre:</span>
                        <span>${results.circuit?.name || 'Monza'}</span>
                    </div>
                    <div class="info-row">
                        <span>Longitud:</span>
                        <span>${results.circuit?.length || '5.793'} km</span>
                    </div>
                    <div class="info-row">
                        <span>Vueltas:</span>
                        <span>${results.circuit?.laps || '3'}</span>
                    </div>
                    <div class="info-row">
                        <span>Clima:</span>
                        <span>${weatherIcons[results.circuit?.weather] || weatherIcons.dry}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h3>🏎️ Vehículo</h3>
                    <div class="info-row">
                        <span>Piloto:</span>
                        <span>${results.driver?.name || 'Max Verstappen'}</span>
                    </div>
                    <div class="info-row">
                        <span>Número:</span>
                        <span>#${results.driver?.number || '1'}</span>
                    </div>
                    <div class="info-row">
                        <span>Velocidad Máx:</span>
                        <span>${results.driver?.car?.maxSpeed || '340'} km/h</span>
                    </div>
                    <div class="info-row">
                        <span>Aceleración:</span>
                        <span>${results.driver?.car?.acceleration || '2.6'}s</span>
                    </div>
                </div>
            </div>

            <div class="time-display">${results.currentTime || '0:00.000'}</div>
            
            <div class="lap-times">
                ${lapRows}
            </div>
            
            <button class="simulate-button" ${this.isSimulating ? 'disabled' : ''}>
                ${this.isSimulating ? 'Simulando...' : 'Iniciar Simulación'}
            </button>
        `;

        const button = resultsCard.querySelector('.simulate-button');
        button.addEventListener('click', () => this.simulateRace());
    }

    render() {
        this.innerHTML = `
            <div class="simulation-container">
                <div class="left-cards">
                    <div class="canvas-container">
                        <canvas id="circuitCanvas"></canvas>
                    </div>
                    <div class="canvas-container">
                        <canvas id="carCanvas"></canvas>
                    </div>
                </div>
                <div class="results-card">
                    <h2 class="simulation-title">Simulación</h2>
                    <div class="info-sections">
                        <div class="info-section">
                            <h3>🏁 Circuito</h3>
                            <div class="info-row">
                                <span>Nombre:</span>
                                <span>Monza</span>
                            </div>
                            <div class="info-row">
                                <span>Longitud:</span>
                                <span>5.793 km</span>
                            </div>
                            <div class="info-row">
                                <span>Vueltas:</span>
                                <span>3</span>
                            </div>
                            <div class="info-row">
                                <span>Clima:</span>
                                <span>☀️ Seco</span>
                            </div>
                        </div>

                        <div class="info-section">
                            <h3>🏎️ Vehículo</h3>
                            <div class="info-row">
                                <span>Piloto:</span>
                                <span>Max Verstappen</span>
                            </div>
                            <div class="info-row">
                                <span>Número:</span>
                                <span>#1</span>
                            </div>
                            <div class="info-row">
                                <span>Velocidad Máx:</span>
                                <span>340 km/h</span>
                            </div>
                            <div class="info-row">
                                <span>Aceleración:</span>
                                <span>2.6s</span>
                            </div>
                        </div>
                    </div>
                    <div class="time-display">0:00.000</div>
                    <div class="lap-times">
                        <!-- Las vueltas se añadirán dinámicamente -->
                    </div>
                    <button class="simulate-button">Iniciar Simulación</button>
                </div>
            </div>
        `;

        const button = this.querySelector('.simulate-button');
        button.addEventListener('click', () => this.simulateRace());
    }
}

customElements.define('simulate-card', SimulateCard);