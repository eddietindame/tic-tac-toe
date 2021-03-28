import { checkFullBoard, checkWinCombo } from '../../helpers/board'

export const SELECT_CELL = 'SELECT_CELL'
export const RESET_GAME = 'RESET_GAME'
export const GAME_OVER = 'GAME_OVER'

export function selectCell(currentPlayer, row, col) {
  return {
    type: SELECT_CELL,
    currentPlayer,
    row,
    col
  }
}

export function gameOver(winner) {
  return {
    type: GAME_OVER,
    winner
  }
}

export function resetGame() {
  return { type: RESET_GAME }
}

/** Check if game is over */
export const checkIfGameOver = () => (dispatch, getState) => {
  const { game, board } = getState()
  // Always check previous player because state automatically changes to next player
  const player = game.currentPlayer === 'X' ? 'O' : 'X'
  const winner = checkWinCombo(board, player)
  const isFullBoard = checkFullBoard(board)
  if (winner || isFullBoard) dispatch(gameOver(winner))
}

/**
 * Check whether cell should be selected
 * @param {*} row - number
 * @param {*} col - number
 */
export const shouldSelectCell = (row, col) => (dispatch, getState) => {
  const { board, game } = getState()
  // Don't overwrite cells or dispatch when game is over
  if (!board[row][col] && !game.isGameOver)
    dispatch(selectCell(game.currentPlayer, row, col))
}
