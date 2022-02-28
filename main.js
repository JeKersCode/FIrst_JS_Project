const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $chat = document.querySelector('.chat')
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerWins] - убийца, [playerLose] - жертва'
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
}
const $formFight = document.querySelector('.control');
const HIT = {
    head: 30,
    body: 20,
    foot: 10,
}
const ATTACK = ['head', 'body', 'foot'];

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
};

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
};

function attack (){
    console.log(`${this.name} Fight!`)
}

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
    $player.append($progressbar, $character)
    $progressbar.append($life, $name)
    $character.appendChild($img)

    $img.src = player.img
    $name.innerText = player.name
    $life.style.width = player.hp + '%'

    return $player
}

function getRandom (num){
    return Math.ceil(Math.random() * num)
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

function playerWins (name){
    const $winTitle = createElement('div', 'loseTitle')
    if (name){
        $winTitle.innerText = name + ' Wins!'
    } else {
        $winTitle.innerText = 'Draw'
    }

    return $winTitle
}

function createReloadButton (){
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $reloadButton = createElement('button', 'button')
    $reloadButton.innerText = 'Restart'
    $reloadWrap.append($reloadButton)

    return $reloadWrap
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

function showResult (){
    if (player1.hp === 0 || player2.hp === 0){
        const $reloadButton = createReloadButton()
        
        $reloadButton.addEventListener('click', function (){
            window.location.reload()
        })

        $arenas.append($reloadButton)
        for (let item of $formFight) {
            item.disabled = true;
       }
    }
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.append(playerWins(player2.name))
        logMessage('end', player2, player1)
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.append(playerWins(player1.name))
        logMessage('end', player1, player2)
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.append(playerWins())
        draw('draw')
    }
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

$formFight.addEventListener('submit', function(e){
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