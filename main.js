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

function createPlayer (player, player1){
    const $player = document.createElement('div')
    $player.classList.add(player)

    const $progressbar = document.createElement('div')
    $progressbar.classList.add('progressbar')

    const $character = document.createElement('div')
    $character.classList.add('character')

    const $root = document.querySelector('.root')
    $root.append($player)

    const $life = document.createElement('div')
    $life.classList.add('life')

    const $name = document.createElement('div')
    $name.classList.add('name')
    $name.innerText = player1.name

    const $img = document.createElement('img')
    $img.src = player1.img
    
    const $arenas = document.querySelector('.arenas')
    $arenas.append($player)

    $player.append($progressbar, $character)

    $progressbar.append($life, $name)

    $character.appendChild($img)
}

createPlayer ('player1', player1)
createPlayer ('player2', player2)