import './style.css'
import f1LogoW from './f1WhiteLogo.svg'

document.querySelector('#app').innerHTML = `
  <div class="FirstPage">
    <a href="https://www.formula1.com/" target="_blank">
      <img src="${f1LogoW}" class="logo" alt="Vite logo" />
    </a>

    <h1>Hello User!</h1>
    <div class="card">
      <button id="startComponent" type="button">Start Game</button>
    </div>
    <p class="read-the-docs">
      Create teams and play as your favorite team in this interactive F1 game.
    </p>
  </div>
`

const startComponentButton = document.querySelector('#startComponent')
startComponentButton.addEventListener('click' , (e) =>{
  e.preventDefault()
  const component = document.createElement('div')
  document.querySelector('#app').innerHTML = `
  <div class= "card">
    <button id="create">
    Create
    </button>
  </div>
  <div class= "card">
    <button id="play">
    Play
    </button>
  </div>
  `
  const createButton = document.querySelector('#create').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#app').innerHTML = `
    <create-component></create-component>
    `
  })
})
