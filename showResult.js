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
export default showResult