export const winCombos = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
]

/**
 * Check if a player has won
 * @param {*} board - 3x3 array
 * @param {*} player - string 'X' | 'O'
 * @returns (string 'X' | 'O') | undefined
 */
export const checkWinCombo = (board, player) => {
    const filledCells = []
    let cellNumber = 0
        board.forEach(row => {
        row.forEach(cell => {
            if (cell === player) filledCells.push(cellNumber)
            cellNumber++
        })
    })

    let isWin = false
    winCombos.forEach(combo => {
        if (combo.every(cell => filledCells.includes(cell))) isWin = true
    })

    return isWin ? player : undefined
}

/**
 * Check if board is full
 * @param {*} board - square array
 * @returns boolean
 */
export const checkFullBoard = board => {
    let isFullBoard = true

    board.forEach(row => {
        row.forEach(cell => {
            if (!cell) isFullBoard = false
        })
    })

    return isFullBoard
}

/**
 * Generate label for board cell
 * @param {*} rowIndex - number
 * @param {*} colIndex - number
 * @returns string
 */
export const getCellLabel = (rowIndex, colIndex) => {
    let rowName = 'top',
        colName = 'left'
    if (rowIndex === 1) rowName = 'middle'
    if (rowIndex === 2) rowName = 'bottom'
    if (colIndex === 1) colName = 'middle'
    if (colIndex === 2) colName = 'right'
    return `${rowName} ${colName} cell`
}
