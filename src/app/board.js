import { BOMB_CLASS, VALID_CLASS, DIV_ELEMENT, ID_ATTRIBUTE, DATA_ATTRIBUTE, CLICK_EVENT } from './constants'
import { addFlag, onSquareClick } from './game'

const createBoard = (gameContext) => {
    gameContext.flagsLeft.innerHTML = gameContext.bombAmount

    const bombsArray = Array(gameContext.bombAmount).fill(BOMB_CLASS)
    const emptyArray = Array(
        gameContext.width * gameContext.width - gameContext.bombAmount
    ).fill(VALID_CLASS)
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    for (let i = 0; i < gameContext.width * gameContext.width; i++) {
        const square = document.createElement(DIV_ELEMENT)
        square.setAttribute(ID_ATTRIBUTE, i)
        square.classList.add(shuffledArray[i])
        gameContext.grid.appendChild(square)
        gameContext.squares.push(square)

        square.addEventListener(CLICK_EVENT, () => {
            onSquareClick(square, gameContext)
        })

        square.oncontextmenu = e => {
            e.preventDefault()
            addFlag(square, gameContext)
        }
    }

    for (let i = 0; i < gameContext.squares.length; i++) {
        let total = 0
        const isLeftEdge = i % gameContext.width === 0
        const isRightEdge = i % gameContext.width === gameContext.width - 1

        if (gameContext.squares[i].classList.contains(VALID_CLASS)) {
            if (
                i > 0 &&
                !isLeftEdge &&
                gameContext.squares[i - 1].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i > 9 &&
                !isRightEdge &&
                gameContext.squares[
                    i + 1 - gameContext.width
                ].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i > 10 &&
                gameContext.squares[i - gameContext.width].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i > 11 &&
                !isLeftEdge &&
                gameContext.squares[
                    i - 1 - gameContext.width
                ].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i < 98 &&
                !isRightEdge &&
                gameContext.squares[i + 1].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i < 90 &&
                !isLeftEdge &&
                gameContext.squares[
                    i - 1 + gameContext.width
                ].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i < 88 &&
                !isRightEdge &&
                gameContext.squares[
                    i + 1 + gameContext.width
                ].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            if (
                i < 89 &&
                gameContext.squares[i + gameContext.width].classList.contains(BOMB_CLASS)
            ) {
                total++
            }
            gameContext.squares[i].setAttribute(DATA_ATTRIBUTE, total)
        }
    }
}

export { createBoard }
