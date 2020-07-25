import { createBoard } from './app/board'
import { gameContext } from './app/model';
import './styles/index.scss'

document.addEventListener('DOMContentLoaded', () => { 
    createBoard(gameContext)
})
