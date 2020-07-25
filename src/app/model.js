import { GRID_SELECTOR, FLAGS_LEFT_SELECTOR, RESULT_SELECTOR } from './constants'

export const gameContext = {
    grid: document.querySelector(GRID_SELECTOR),
    flagsLeft: document.querySelector(FLAGS_LEFT_SELECTOR),
    result: document.querySelector(RESULT_SELECTOR),
    width: 10,
    bombAmount: 20,
    flags: 0,
    squares: [],
    isGameOver: false,
}
