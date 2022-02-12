const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai'],
    attack: function () {
        console.log(`${player1.name} Fight!`)
    }
};

const player2 = {
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword'],
    attack: function () {
        console.log(`${player2.name} Fight!`)
    }
};

function createPlayer (player, name, hp){
    const $player1 = document.createElement('div')
    $player1.classList.add('player1')

    const $player2 = document.createElement('div')
    $player2.classList.add('player2')

    const $progressbar = document.createElement('div')
    $progressbar.classList.add('progressbar')

    const $character = document.createElement('div')
    $character.classList.add('character')

    const $root = document.querySelector('.root')
    $root.append($player1, $player2)

    const $life = document.createElement('div')
    $life.classList.add('life')

    const $name = document.createElement('div')
    $name.classList.add('name')

    const $img = document.createElement('img')
    $img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'

    const $arenas = document.querySelector('.arenas')
    $arenas.append($player1, $player2)

    $player1.append($progressbar, $character)

    $player2.append($progressbar, $character)

    $progressbar.append($life, $name)

    $character.appendChild($img)
}

createPlayer ('player1', 'Scorpion', 50)
createPlayer ('player2', 'Sub Zero', 80)