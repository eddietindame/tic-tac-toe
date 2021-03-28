import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Board } from '../board'
import { checkIfGameOver, resetGame } from '../../store/actions/moves'
import './index.scss'

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

export const Game = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const firstCellRef = useRef()
  const buttonRef = useRef()

  useEffect(() => { dispatch(checkIfGameOver()) }, [board])

  return (
    <div className="game">
      <div className="game__inner">
        {game.isGameOver && <div>GAME OVER</div>}
        {
          game.isGameOver
            ? <div>Winner: {game.winner ? game.winner : 'DRAW'}</div>
            : <div>Player: {game.currentPlayer}</div>
        }
        <span
          tabIndex={1}
          onFocus={() => { buttonRef.current.focus() }}
        />
        <Board firstCellRef={firstCellRef} />
        <button
          className="button"
          aria-label="Reset game"
          tabIndex={3}
          ref={buttonRef}
          onClick={() => { dispatch(resetGame()) }}
        >Reset Game</button>
      </div>
      <span
        tabIndex={4}
        onFocus={() => { firstCellRef.current.focus() }}
      />
    </div>
  )
}
