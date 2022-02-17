const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai'],
    attack: function () {
        console.log(`${player1.name} Fight!`)
    }
};

const player2 = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword'],
    attack: function () {
        console.log(`${player2.name} Fight!`)
    }
};

function createElement (tag, className){
    const $tag = document.createElement(tag)
    if (className){
        $tag.classList.add(className)
    }

    return $tag
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
    $img.src = player.img
    $name.innerText = player.name
    $player.append($progressbar, $character)
    $progressbar.append($life, $name)
    $character.appendChild($img)
    $life.style.width = player.hp + '%'

    return $player
}

function changeHp (player){
    const $playerLife = document.querySelector('.player' +player.player+ ' .life')
    playerLifeAfter = Math.ceil(Math.random($playerLife) * 20)
    player.hp -= playerLifeAfter

    $playerLife.style.width = player.hp + '%'

    if (player.hp <= 0){
        $arenas.append(playerLose(player.name))
        player.hp = 0
        $randomButton.disabled = true
    }
}

function playerLose (){
    const $loseTitle = createElement('div', 'loseTitle')
    if (player1.hp < player2.hp){
        $loseTitle.innerText = player2.name + ' Wins!'
    } else {
        $loseTitle.innerText = player1.name + ' Wins!'
    }

    return $loseTitle
}

$arenas.append(createPlayer (player1))
$arenas.append(createPlayer (player2))

$randomButton.addEventListener('click', function (){
    changeHp (player1)
    changeHp (player2)
})