import { logs } from "./log.js"
import createElement from "./createElement.js"
import getRandom from "./getRandom.js"
import playerWins from "./playerWins.js"
import createReloadButton from "./createReloadButton.js"
import showResult from "./showResult.js"

const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $chat = document.querySelector('.chat')
const $formFight = document.querySelector('.control')
const HIT = {
    head: 30,
    body: 20,
    foot: 10,
}
const ATTACK = ['head', 'body', 'foot']

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai'],
    attack,
    changeHp,
    elHp,
    renderHp,
}

const player2 = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword'],
    attack,
    changeHp,
    elHp,
    renderHp,
}

function attack (){
    console.log(`${this.name} Fight!`)
}

function createPlayer (player){
    const $player = createElement('div', 'player' + player.player)
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $img = createElement('img')
    const $root = document.querySelector('.root')
    
    $root.append($player)
    $player.append($progressbar, $character)
    $progressbar.append($life, $name)
    $character.appendChild($img)

    $img.src = player.img
    $name.innerText = player.name
    $life.style.width = player.hp + '%'

    return $player
}

function changeHp (damage){
    this.hp -= damage

    if (this.hp <= 0){
        this.hp = 0
    }
}

function elHp (){
    return document.querySelector('.player' +this.player+ ' .life')
}

function renderHp (){
    return this.elHp().style.width = this.hp + '%'
}

$arenas.append(createPlayer (player1))
$arenas.append(createPlayer (player2))

function enemyAttack (){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack (){
    const attack = {};

    for(let item of $formFight){
        if(item.checked && item.name === 'hit'){
            attack.value = getRandom (HIT[item.value]);
            attack.hit = item.value;
        }
        if( item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }
 
        item.checked = false;
    }
    return attack
}

function generateLogs (type, player1, player2){
    let text = logs[type][getRandom(14)]
    .replace('[playerKick]', player1.name)
    .replace('[playerDefence]', player2.name)

    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin', el)
}

function logMessage (message, player1, player2){

    const getCurrentTime = () => {
        const currentTime = new Date();
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        return currentTime.toLocaleTimeString('ru', options)
    }
    const date = new Date()
    const dateString = getCurrentTime()
    
    let output = ''
         
    switch(message){
        case 'start':
            output = logs.start
        break
        case 'end':
            output = logs.end[getRandom(3)]
        break
    }
    output = output
    .replace('[time]',dateString)
    .replace('[player1]',player1.name)
    .replace('[player2]', player2.name)
    .replace('[playerWins]',player1.name)
    .replace('[playerLose]', player2.name)

    const finalString = `<p>${output}</p>`
    $chat.insertAdjacentHTML('afterbegin', finalString)
}

function draw (type){
    let draw = logs [type]
    const $draw = `<p>${draw}</p>`
    $chat.insertAdjacentHTML('afterbegin', $draw)
}

logMessage('start', player1, player2)

$formFight.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const enemy = enemyAttack()
    const player = playerAttack()
    
    if (player.hit !== enemy.defence){
        player2.changeHp(player.value)
        player2.renderHp()
        generateLogs('hit', player1, player2)
    }
    if (enemy.hit !== player.defence){
        player1.changeHp(enemy.value)
        player1.renderHp()
        generateLogs('hit', player2, player1)
    }
    if (player.hit == enemy.defence){
        generateLogs('defence', player1, player2)
    }
    if (enemy.hit == player.defence){
        generateLogs('defence', player2, player1)
    }

    showResult()
})