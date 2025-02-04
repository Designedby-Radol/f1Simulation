class MainComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const body = document.querySelector('body');
        body.innerHTML='';
        body.innerHTML = `
            <video src="url('https://drive.google.com/file/d/1hDhhlipD5pnwKerfcMuAN6CaicaBczDO/view?usp=sharing')" autoplay muted loop id="background-video"></video>
        <style>
        @import 'src/css/cardStyle.css'
        </style>
            <main class="main" id="main">
                <a class="card" id="create">
                    <h1>Admin</h1>
                    <p>Modify the content of the game.</p>
                </a>
                <a class="card" id="play">
                    <h1>Player</h1>
                    <p>Play the game.</p>
                </a>
            </main>
            `;        

        const createButton = document.querySelector('#create').addEventListener('click', (e) => {
            e.preventDefault();
            const appMain = document.querySelector('#main');
            appMain.innerHTML = '<management-component></management-component>'
            delete btnBack.dataset.id
        })
    }
}

customElements.define('main-component', MainComponent);