import { createBoard } from './app/board'

import './styles/index.scss'

document.addEventListener('DOMContentLoaded', () => {
     const gameContext = {
        grid: document.querySelector('.grid'),
        flagsLeft: document.querySelector('#flags-left'),
        result: document.querySelector('#result'),
        width: 10,
        bombAmount: 20,
        flags: 0,
        squares: [],
        isGameOver: false,
    }
  
    createBoard(gameContext)
})
