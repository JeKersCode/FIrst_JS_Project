import createElement from "./createElement.js"

function playerWins (name){
    const $winTitle = createElement('div', 'loseTitle')
    if (name){
        $winTitle.innerText = name + ' Wins!'
    } else {
        $winTitle.innerText = 'Draw'
    }

    return $winTitle
}
export default playerWins