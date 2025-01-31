import f1LogoW from './f1WhiteLogo.svg'
import './css/style.css'
import './css/start.css'


// Components


import './components/managementComponent.js'

import './components/circuitComponents/managementCircuit.js'
import './components/circuitComponents/createCircuitComponent.js';
import './components/circuitComponents/editCircuit.js';
import './components/circuitComponents/deleteCircuit.js'

import './components/teamComponents/managementTeam.js'
import './components/teamComponents/createTeamComponent.js';
import './components/teamComponents/editTeam.js';
import './components/teamComponents/deleteTeam.js'

import './components/pilotsComponents/managementPilots.js'
import './components/pilotsComponents/createPilotComponent.js';
import './components/pilotsComponents/editPilot.js';
import './components/pilotsComponents/deletePilot.js'


document.querySelector('body').innerHTML = `
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
`;

const startComponentButton = document.querySelector('#startComponent')
startComponentButton.addEventListener('click' , (e) =>{
  e.preventDefault()
  document.body.classList.add("fade-out")

  setTimeout(() => {
    const body = document.querySelector('body');
  }, 1000);

  const body = document.querySelector('body');
  body.innerHTML='';

  body.innerHTML = `
  <header class="header">
  <a id="btnBack"></a>
  </header>
  

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

  })
})