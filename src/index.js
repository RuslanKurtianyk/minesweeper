import { createBoard, cleanBoard } from './app/board'
import { getContext } from './app/model'
import './styles/index.scss'

document.addEventListener('DOMContentLoaded', () => { 
    createBoard(getContext())
})

document.getElementById('restart-button').addEventListener('click', () => {
    cleanBoard()
    createBoard(getContext())
});
