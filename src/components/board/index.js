import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getCellLabel } from '../../helpers/board'
import { classList } from '../../helpers/util'
import { shouldSelectCell } from '../../store/actions/moves'
import './index.scss'

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

export const Board = ({ firstCellRef }) => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  return (
    <div
      className={classList([
        'board',
        game.isGameOver && 'board--disabled'
      ])}
      role="grid"
    >
    {
      board.map((row, rowIndex) => {
        return row.map((_cell, colIndex) => (
          <div
            key={`${rowIndex},${colIndex}`}
            className="board__cell"
            role="gridcell"
            aria-label={getCellLabel(rowIndex, colIndex)}
            tabIndex={game.isGameOver ? undefined : 2}
            ref={(rowIndex === 0 && colIndex === 0) ? firstCellRef : undefined}
            onClick={() => { dispatch(shouldSelectCell(rowIndex, colIndex)) }}
            onKeyPress={e => {
              if (e.key === 'Enter')
                dispatch(shouldSelectCell(rowIndex, colIndex))
            }}
          >{board[rowIndex][colIndex]}</div>
        ))
      })
    }
    </div>
  )
}
