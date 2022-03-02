import { logs } from './log.js'
import { player1, player2 } from './player.js'
import createElement from './createElement.js'
import getRandom from './getRandom.js'
import createReloadButton from './createReloadButton.js'

class Game {
    $arenas
    $randomButton
    $chat 
    $formFight 

    HIT = {
        head: 30,
        body: 20,
        foot: 10,
    }
    ATTACK = ['head', 'body', 'foot']

    playerWins = (name) => {
        const $winTitle = createElement('div', 'loseTitle')
        if (name){
            $winTitle.innerText = name + ' Wins!'
        } else {
            $winTitle.innerText = 'Draw'
        }

        return $winTitle
    }

    start = () => {
        this.$arenas = document.querySelector('.arenas')
        this.$randomButton = document.querySelector('.button')
        this.$chat = document.querySelector('.chat')
        this.$formFight = document.querySelector('.control')
        this.$arenas.append(player1.createPlayer())
        this.$arenas.append(player2.createPlayer())
        this.logMessage('start', player1, player2)
        this.$formFight.addEventListener('submit', this.onSubmit)
    }

    playerAttack = () => {
        const attack = {}
    
        for(let item of this.$formFight){
            if(item.checked && item.name === 'hit'){
                attack.value = getRandom (this.HIT[item.value])
                attack.hit = item.value
            }
            if( item.checked && item.name === 'defence'){
                attack.defence = item.value
            }
    
            item.checked = false
        }
        return attack
    }

    enemyAttack = () => {
        const hit = this.ATTACK[getRandom(3)-1]
        const defence = this.ATTACK[getRandom(3)-1]

        return{
            value: getRandom(this.HIT[hit]),
            hit,
            defence,
        }
    }

    showResult = () => {
        
        if (player1.hp === 0 || player2.hp === 0){
            const $reloadButton = createReloadButton()
            
            $reloadButton.addEventListener('click', function (){
                window.location.reload()
            })

            this.$arenas.append($reloadButton)
            for (let item of this.$formFight) {
                item.disabled = true
        }
        }
        if (player1.hp === 0 && player1.hp < player2.hp){
            this.$arenas.append(this.playerWins(player2.name))
        } else if (player2.hp === 0 && player2.hp < player1.hp){
            this.$arenas.append(this.playerWins(player1.name))
        } else if (player1.hp === 0 && player2.hp === 0){
            this.$arenas.append(this.playerWins())
            draw ('draw')
        }

    }


    draw = (type) => {
        let draw = logs [type]
        const $draw = `<p>${draw}</p>`
        this.$chat.insertAdjacentHTML('afterbegin', $draw)
    }


    generatelogs = (type, player1, player2) => {

        let text = logs [type][getRandom(14)-1]
        .replace('[playerDefence]', player2.name)
        .replace('[playerKick]', player1.name)
        const el = `<p>${text}</p>`
        this.$chat.insertAdjacentHTML('afterbegin', el)

    }

    logMessage = (message,player1,player2) => {

        const getCurrentTime = () => {
            const currentTime = new Date()
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }
            return currentTime.toLocaleTimeString('ru', options)
        }

        const date = new Date()
        const dateString = getCurrentTime()
        
        let output= ''
            
        switch(message){
            case 'start':
                output = logs.start
            break
            case 'end':
                output = logs.end[getRandom(3)]
            break
        }
        output = output.replace('[time]',dateString).replace('[player1]',player1.name).replace('[player2]', player2.name)

        const finalString = `<p>${output}</p>`
        this.$chat.insertAdjacentHTML('afterbegin', finalString)
    }
 
    onSubmit = (e) => {
        e.preventDefault()
        const player = this.playerAttack()
        const enemy = this.enemyAttack()
        
        if (enemy.hit !== player.defence){
            player1.changeHp(enemy.value);
            player1.renderHp( );
            this.generatelogs('hit',player2, player1)

        }
        if (player.hit !== enemy.defence){
            player2.changeHp(player.value);
            player2.renderHp( );
            this.generatelogs('hit',player1, player2);
        }
        if(player.hit == enemy.defence){
            this.generatelogs('defence',player1, player2);
        }
        if(enemy.hit == player.defence){
            this.generatelogs('defence',player2, player1);
        }
    
        this.showResult()
    }
}
export default Game