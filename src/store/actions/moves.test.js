import * as Actions from './moves'

describe('selectCell', () => {
  it('should create an action to select a cell', () => {
    const expectedAction = {
      type: Actions.SELECT_CELL,
      currentPlayer: 'X',
      row: 0,
      col: 0
    }
    const result = Actions.selectCell('X', 0, 0)
    expect(result).toEqual(expectedAction)
  })
})

describe('gameOver', () => {
  it('should create an action to end the game if there is a winner', () => {
    const winner = 'X'
    const expectedAction = {
      type: Actions.GAME_OVER,
      winner
    }
    const result = Actions.gameOver(winner)
    expect(result).toEqual(expectedAction)
  })

  it('should create an action to end the game if there is no winner', () => {
    const expectedAction = { type: Actions.GAME_OVER }
    const result = Actions.gameOver()
    expect(result).toEqual(expectedAction)
  })
})

describe('resetGame', () => {
  it('should create an action to reset the game', () => {
    const expectedAction = { type: Actions.RESET_GAME }
    const result = Actions.resetGame()
    expect(result).toEqual(expectedAction)
  })
})
