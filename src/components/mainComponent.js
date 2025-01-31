class MainComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const body = document.querySelector('body');
        body.innerHTML='';
        body.innerHTML = `
            <main id="main">
                <a class="cardInit" id="create">
                    <h1>Admin</h1>
                    <p>Modify the content of the game.</p>
                </a>
                <a class="cardInit" id="play">
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