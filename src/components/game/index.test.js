import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, waitForDomChange, screen } from '@testing-library/react'

import { Game } from '.'
import configureStore from '../../store'

test('renders Game text', () => {
  render(<Provider store={configureStore()}><Game /></Provider>)
  const gameText = screen.getByText(/Player/i)
  expect(gameText).toBeInTheDocument()
})

test('renders reset button', async () => {
  render(<Provider store={configureStore()}><Game /></Provider>)
  const button = await screen.findByRole('button')
  expect(button).toBeInTheDocument()
})

test('reset button clears the cells', async () => {
  render(<Provider store={configureStore()}><Game /></Provider>)
  const button = await screen.findByRole('button')
  const cell = await screen.findByLabelText('top left cell')
  fireEvent.click(cell)
  expect(cell).toHaveTextContent('X')
  fireEvent.click(button)
  expect(cell).toHaveTextContent('')
})

test('game over state shown after winning combination entered', async () => {
  render(<Provider store={configureStore()}><Game /></Provider>)
  const cells = await screen.findAllByRole('gridcell')

  expect(() => screen.getByText(/Game Over/i)).toThrow()

  cells.forEach(async (cell, i) => {
    if (i < 6) fireEvent.click(cell)
    if (i === 6) { // This is a diagonal win for X
      fireEvent.click(cell)
      await waitForDomChange() // Allow useEffect hook to fire
      expect(screen.getByText(/Game Over/i)).toBeInTheDocument()
    }
  })
})

test('game over state shown after all cells are filled', async () => {
  render(<Provider store={configureStore()}><Game /></Provider>)
  const cells = await screen.findAllByRole('gridcell')

  expect(() => screen.getByText(/Game Over/i)).toThrow()

  // This combination of clicks is a guaranteed draw
  fireEvent.click(cells[0])
  fireEvent.click(cells[2])
  fireEvent.click(cells[1])
  fireEvent.click(cells[3])
  fireEvent.click(cells[4])
  fireEvent.click(cells[8])
  fireEvent.click(cells[5])
  fireEvent.click(cells[7])
  fireEvent.click(cells[6])

  expect(screen.getByText(/Game Over/i)).toBeInTheDocument()
  expect(screen.getByText(/Draw/i)).toBeInTheDocument()
})

// TODO: Investigate why Jest logs an UnhandledPromiseRejectionWarning to console when both the last two tests are run. Both tests pass and the warning disappears when either of the two tests are skipped.
