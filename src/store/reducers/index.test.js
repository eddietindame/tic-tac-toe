import { createBoard, board, game } from '.'
import * as Actions from '../actions/moves'

describe('createBoard', () => {
  it('should regenerate a square 2D array of provided length', () => {
    Array(10).fill().map((_, i) => {
      const board = createBoard(i)
      expect(board).toHaveLength(i)
      board.forEach(row => expect(row).toHaveLength(i))
    })
  })
})

describe('board', () => {
  it('should create a default board state of length 3', () => {
    const expectedState = createBoard(3)
    const result = board(undefined, {})

    expect(result).toEqual(expectedState)
  })

  it('should update a co-ordinate to match the currentPlayer', () => {
    const state = createBoard(3)
    const result = board(state, Actions.selectCell('X', 0, 0))

    state[0][0] = 'X'

    expect(result).toEqual(state)
  })

  it('should reset to a default board state of length 3', () => {
    const expectedState = createBoard(3)
    const result = board(undefined, Actions.resetGame())

    expect(result).toEqual(expectedState)
  })
})

describe('game', () => {
  it('should create a default game state with current player, no game over and no winner', () => {
    const expectedState = {
      currentPlayer: 'X',
      isGameOver: false,
      winner: null
    }
    const result = game(undefined, {})

    expect(result).toEqual(expectedState)
  })

  it('should update currentPlayer to match the current player', () => {
    const xState = { currentPlayer: 'X', isGameOver: false, winner: null }
    const oState = { currentPlayer: 'O', isGameOver: false, winner: null }

    const xResult = game(xState, Actions.selectCell('X', 0, 0))
    const oResult = game(oState, Actions.selectCell('X', 0, 0))

    expect(xResult).toEqual(oState)
    expect(oResult).toEqual(xState)
  })

  it('should set game over state', () => {
    const expectedState = {
      currentPlayer: 'X',
      isGameOver: true,
      winner: null
    }
    const result = game(undefined, Actions.gameOver())

    expect(result).toEqual(expectedState)
  })

  it('should set a winner', () => {
    const expectedState = {
      currentPlayer: 'X',
      isGameOver: true,
      winner: 'X'
    }
    const result = game(undefined, Actions.gameOver('X'))

    expect(result).toEqual(expectedState)
  })
})
