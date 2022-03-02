import createElement from "./createElement.js"

function createReloadButton (){
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $reloadButton = createElement('button', 'button')
    $reloadButton.innerText = 'Restart'
    $reloadWrap.append($reloadButton)

    return $reloadWrap
}
export default createReloadButton