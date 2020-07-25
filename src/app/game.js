import {
    GAME_OVER_TEXT,
    WIN_TEXT,
    ICON_BOMB,
    ICON_FLAG,
    BOMB_CLASS,
    FLAG_CLASS,
    CHECKED_CLASS,
    VALID_CLASS,
    ONE_CLASS,
    TWO_CLASS,
    THREE_CLASS,
    FOUR_CLASS,
} from './constants'

const gameOver = (gameContext) => {
    gameContext.result.innerHTML = GAME_OVER_TEXT
    gameContext.isGameOver = true

    gameContext.squares.forEach((square) => {
        if (square.classList.contains(BOMB_CLASS)) {
            square.innerHTML = ICON_BOMB
            square.classList.remove(BOMB_CLASS)
            square.classList.add(CHECKED_CLASS)
        }
    })
}

const checkSquare = (currentId, gameContext) => {
    const isLeftEdge = currentId % gameContext.width === 0
    const isRightEdge = currentId % gameContext.width === gameContext.width - 1

    setTimeout(() => {
        if (currentId > 0 && !isLeftEdge) {
            const newId = gameContext.squares[parseInt(currentId) - 1].id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId > 9 && !isRightEdge) {
            const newId =
                gameContext.squares[parseInt(currentId) + 1 - gameContext.width]
                    .id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId > 10) {
            const newId =
                gameContext.squares[parseInt(currentId - gameContext.width)].id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId > 11 && !isLeftEdge) {
            const newId =
                gameContext.squares[parseInt(currentId) - 1 - gameContext.width]
                    .id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId < 98 && !isRightEdge) {
            const newId = gameContext.squares[parseInt(currentId) + 1].id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId < 90 && !isLeftEdge) {
            const newId =
                gameContext.squares[parseInt(currentId) - 1 + gameContext.width]
                    .id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId < 88 && !isRightEdge) {
            const newId =
                gameContext.squares[parseInt(currentId) + 1 + gameContext.width]
                    .id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
        if (currentId < 89) {
            const newId =
                gameContext.squares[parseInt(currentId) + gameContext.width].id
            const newSquare = document.getElementById(newId)
            onSquareClick(newSquare, gameContext)
        }
    }, 10)
}

const addFlag = (square, context) => {
    if (context.isGameOver) return
    if (
        !square.classList.contains(CHECKED_CLASS) &&
        context.flags < context.bombAmount
    ) {
        if (!square.classList.contains(FLAG_CLASS)) {
            square.classList.add(FLAG_CLASS)
            square.innerHTML = ICON_FLAG
            context.flags++
            context.flagsLeft.innerHTML = context.bombAmount - context.flags
            checkForWin(context)
        } else {
            square.classList.remove(FLAG_CLASS)
            square.innerHTML = ''
            context.flags--
            context.flagsLeft.innerHTML = context.bombAmount - context.flags
        }
    }
}

const checkForWin = (gameContext) => {
    let matches = 0

    for (let i = 0; i < gameContext.squares.length; i++) {
        if (
            gameContext.squares[i].classList.contains(FLAG_CLASS) &&
            gameContext.squares[i].classList.contains(BOMB_CLASS)
        ) {
            matches++
        }
        if (matches === gameContext.bombAmount) {
            gameContext.result.innerHTML = WIN_TEXT
            gameContext.isGameOver = true
        }
    }
}

const onSquareClick = (square, gameContext) => {
    if (
        gameContext.isGameOver ||
        square.classList.contains(CHECKED_CLASS) ||
        square.classList.contains(FLAG_CLASS)
    ) {
        return
    }
    if (square.classList.contains(BOMB_CLASS)) {
        gameOver(gameContext)
    } else {
        let total = +square.getAttribute('data')
        if (total != 0) {
            square.classList.add(CHECKED_CLASS)
            if (total === 1) square.classList.add(ONE_CLASS)
            if (total === 2) square.classList.add(TWO_CLASS)
            if (total === 3) square.classList.add(THREE_CLASS)
            if (total === 4) square.classList.add(FOUR_CLASS)
            square.innerHTML = total
            return
        }
        checkSquare(square.id, gameContext)
    }
    square.classList.add(CHECKED_CLASS)
}

export { addFlag, onSquareClick }
