import {
    winCombos,
    checkWinCombo,
    checkFullBoard,
    getCellLabel
} from './board'
import { createBoard } from '../store/reducers'

describe('checkWinCombo', () => {
    it('returns truthy for valid win combos', () => {
        winCombos.forEach(combo => {
            let board = createBoard(3)
            let cellNumber = 0
            let comboIndex = 0

            //Fill board according to each win combo
            board.forEach((row, rowIndex) => {
                row.forEach((_cell, colIndex) => {
                    if (cellNumber === combo[comboIndex]) {
                        board[rowIndex][colIndex] = 'X'
                        comboIndex++
                    }
                    cellNumber++
                })
            })

            expect(checkWinCombo(board, 'X')).toBe('X')
        })
    })
    // TODO: test that it returns undefined for invalid combos
})

describe('checkFullBoard', () => {
    it('returns true for full board only', () => {
        const board = createBoard(3)

        expect(checkFullBoard(board)).toBe(false)

        board.forEach((row, rowIndex) => {
            row.forEach((_cell, colIndex) => {
                board[rowIndex][colIndex] = 'X'
                if (rowIndex === 2 && colIndex === 2)
                    expect(checkFullBoard(board)).toBe(true)
                else expect(checkFullBoard(board)).toBe(false)
            })
        })
    })
})

describe('getCellLabel', () => {
    it('returns correct label for coordinate', () => {
        const board = createBoard(3)

        board.forEach((row, rowIndex) => {
            row.forEach((_cell, colIndex) => {
                switch (rowIndex) {
                    case 0:
                        expect(getCellLabel(rowIndex, colIndex).includes('top')).toBe(true)
                        break
                    case 1:
                        expect(getCellLabel(rowIndex, colIndex).includes('middle')).toBe(true)
                        break
                    case 2:
                        expect(getCellLabel(rowIndex, colIndex).includes('bottom')).toBe(true)
                        break
                    default:
                        break
                }
                switch (colIndex) {
                    case 0:
                        expect(getCellLabel(rowIndex, colIndex).includes('left')).toBe(true)
                        break
                    case 1:
                        expect(getCellLabel(rowIndex, colIndex).includes('middle')).toBe(true)
                        break
                    case 2:
                        expect(getCellLabel(rowIndex, colIndex).includes('right')).toBe(true)
                        break
                    default:
                        break
                }
            })
        })
    })
})
