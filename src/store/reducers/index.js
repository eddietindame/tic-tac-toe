import { combineReducers } from 'redux'
import {
  SELECT_CELL,
  GAME_OVER,
  RESET_GAME
} from '../actions/moves'

const initialGameState = {
  currentPlayer: 'X',
  winner: null,
  isGameOver: false
}

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map(_ =>
      Array(i)
        .fill(null)
    )

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state))
      newBoard[action.row][action.col] = action.currentPlayer
      return newBoard
    }
    case RESET_GAME:
      return createBoard(3)
    default:
      return state
  }
}

export const game = (state = initialGameState, action) => {
  switch (action.type) {
    case SELECT_CELL: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
      }
    }
    case GAME_OVER:
      return {
        ...state,
        isGameOver: true,
        winner: action.winner ? action.winner : state.winner
      }
    case RESET_GAME:
      return initialGameState
    default:
      return state
  }
}

export default combineReducers({
  board,
  game
})
