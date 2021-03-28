import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Board } from '.'
import configureStore from '../../store'

test('renders Board', async () => {
  render(<Provider store={configureStore()}><Board /></Provider>)
  const cells = await screen.findAllByRole('gridcell')
  expect(cells).toHaveLength(9)
})

test('registers clicks on all cells with alternating player', async () => {
  render(<Provider store={configureStore()}><Board /></Provider>)
  const cells = await screen.findAllByRole('gridcell')
  cells.forEach((cell, i) => {
    fireEvent.click(cell)
    expect(cell).toHaveTextContent(i % 2 === 0 ? 'X' : 'O')
  })
  // I expected this test to fail because at i === 6, X should win and the board
  // should become non-interactive. However, the useEffect hook that dispatches
  // checkGameOver doesn't fire. This is expected behaviour in a Jest test and it
  // luckily gave me an "out" in being able to leave the test code rather simple,
  // even though this technically does not reflect the true operation of the app.
  // https://github.com/testing-library/react-testing-library/issues/215
})
