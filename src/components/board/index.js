import React from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const getRandomCell = (i) => Math.floor(Math.random() * i)

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  return (
    <div className="Board">
      Board: { JSON.stringify(board) }
      <div onClick={() => dispatch(
        selectCell(
          game.currentPlayer,
          getRandomCell(board.length),
          getRandomCell(board.length)
        )
      )}>Player {game.currentPlayer}</div>
    </div>
  )
}
