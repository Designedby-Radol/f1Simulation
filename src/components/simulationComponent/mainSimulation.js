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
    }

    connectedCallback() {
        this.render();
        this.addStyles();
    }

    addStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .simulation-container {
                display: grid;
                grid-template-columns: 1fr 1.5fr;
                gap: 20px;
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
                font-family: Arial, sans-serif;
            }

            .left-cards {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .card {
                background: #fff;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .circuit-card, .driver-card {
                height: calc(50% - 10px);
                min-height: 200px;
            }

            .results-card {
                height: 100%;
                min-height: 450px;
            }

            .card-title {
                font-size: 1.5rem;
                margin-bottom: 15px;
                color: #333;
                border-bottom: 2px solid #eee;
                padding-bottom: 10px;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }

            .info-row:hover {
                background-color: #f8f9fa;
            }

            .lap-times {
                max-height: 300px;
                overflow-y: auto;
                padding-right: 10px;
            }

            .lap-times::-webkit-scrollbar {
                width: 8px;
            }

            .lap-times::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }

            .lap-times::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 4px;
            }

            .weather-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .weather-icon {
                font-size: 1.5rem;
            }

            .highlight {
                color: #2196F3;
                font-weight: bold;
            }

            @media (max-width: 768px) {
                .simulation-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    getWeatherIcon(weather) {
        const icons = {
            dry: '☀️',
            rainy: '🌧️',
            extreme: '⛈️'
        };
        return icons[weather] || '☀️';
    }

    render() {
        // Simulación de ejemplo
        const monza = new Circuit("ponza", 3, 5.793, "dry");
        const car = new Car(2.6, 340, 320);
        const driver = new Driver("Max Verstappen", 1, car);
        const race = new SingleDriverRace(monza, driver);
        race.simulate();
        const results = race.getResults();

        this.innerHTML = `
            <div class="simulation-container">
                <div class="left-cards">
                    <div class="card circuit-card">
                        <h2 class="card-title">🏁 Información del Circuito</h2>
                        <div class="info-row">
                            <span>Nombre:</span>
                            <span class="highlight">${monza.name}</span>
                        </div>
                        <div class="info-row">
                            <span>Longitud:</span>
                            <span>${monza.length} km</span>
                        </div>
                        <div class="info-row">
                            <span>Vueltas:</span>
                            <span>${monza.laps}</span>
                        </div>
                        <div class="info-row">
                            <span>Clima:</span>
                            <div class="weather-info">
                                <span>${monza.weather}</span>
                                <span class="weather-icon">${this.getWeatherIcon(monza.weather)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="card driver-card">
                        <h2 class="card-title">🏎️ Información del Piloto</h2>
                        <div class="info-row">
                            <span>Nombre:</span>
                            <span class="highlight">${driver.name}</span>
                        </div>
                        <div class="info-row">
                            <span>Número:</span>
                            <span>#${driver.number}</span>
                        </div>
                        <div class="info-row">
                            <span>Velocidad Máxima:</span>
                            <span>${car.maxSpeed} km/h</span>
                        </div>
                        <div class="info-row">
                            <span>Aceleración:</span>
                            <span>${car.acceleration}s (0-100)</span>
                        </div>
                    </div>
                </div>

                <div class="card results-card">
                    <h2 class="card-title">🏆 Resultados de la Simulación</h2>
                    <div class="info-row">
                        <span>Tiempo Total:</span>
                        <span class="highlight">${results.totalTime}</span>
                    </div>
                    <h3 style="margin: 15px 0;">⏱️ Tiempos por Vuelta:</h3>
                    <div class="lap-times">
                        ${results.lapTimes.map(lap => `
                            <div class="info-row">
                                <span>Vuelta ${lap.lap}</span>
                                <span>${lap.time}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('simulate-card', SimulateCard);