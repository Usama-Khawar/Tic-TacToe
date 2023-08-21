'use strict'

const gridContainer = document.querySelector('.grid-container') as HTMLElement
const startButton = document.getElementById('start') as HTMLButtonElement
const currPlayerElement = document.getElementById('currPlayer') as HTMLElement
const player1Input = document.getElementById('player1') as HTMLInputElement
const player2Input = document.getElementById('player2') as HTMLInputElement
const restartButton = document.getElementById('restart') as HTMLButtonElement
const sizeSelect = document.getElementById('mySelect') as HTMLSelectElement
let players: [string, string] = ['', '']
let turn = 0
let itemAdded = 0

function start(): void {
  startButton.disabled = true
  const x = sizeSelect.value
  if (player1Input.value.trim() === '' || player2Input.value.trim() === '') {
    alert('Provide names of players')
    startButton.disabled = false
  } else {
    players = [player1Input.value, player2Input.value]
    const size = Number(x)
    turn = 0
    itemAdded = 0
    gridContainer.style.display = 'grid'
    gridContainer.style.gap = '5px'
    gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 100px))`
    gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0,100px))`
    restartButton.style.display = 'block'
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('data-row', row.toString())
        cell.setAttribute('data-column', col.toString())
        cell.textContent = ''
        currPlayerElement.innerHTML = `${players[turn % 2]}'s turn`
        cell.addEventListener('click', () => {
          mainLogic(cell, size)
        })
        gridContainer.appendChild(cell)
      }
    }
  }
}

function mainLogic(cell: HTMLElement, size: number): void {
  let disabled = false
  const row = parseInt(cell.getAttribute('data-row') || '0', 10)
  const col = parseInt(cell.getAttribute('data-column') || '0', 10)
  if (cell.textContent === '' && itemAdded < size * size) {
    cell.textContent = turn % 2 === 0 ? 'x' : 'o'
    itemAdded++
    turn++
    currPlayerElement.innerHTML = `${players[turn % 2]}'s turn`
  }
  if (checkRowCol(row, col, cell.textContent || '', size)) {
    currPlayerElement.innerHTML = `${players[(turn + 1) % 2]} won`
    disabled = true
    disableGrid()
  }
  if (row === col || row + col === size - 1) {
    if (checkDiagonals(cell.textContent || '', size)) {
      currPlayerElement.innerHTML = `${players[(turn + 1) % 2]} won`
      disabled = true
      disableGrid()
    }
  }
  if (itemAdded >= size * size) {
    if (!disabled) {
      currPlayerElement.innerHTML = `Match drawn`
      disableGrid()
    }
  }
}

function disableGrid(): void {
  gridContainer.classList.add('disabled')
}

function resetGame(): void {
  gridContainer.innerHTML = ''
  gridContainer.classList.remove('disabled')
  startButton.disabled = false
  currPlayerElement.textContent = ''
  players = ['', '']
  turn = 0
  itemAdded = 0
  player1Input.value = ''
  player2Input.value = ''
  restartButton.style.display = 'none'
}

function checkRowCol(
  r: number,
  c: number,
  symbol: string,
  size: number
): boolean {
  let rowCount = 0
  let colCount = 0
  for (let i = 0; i < size; i++) {
    const clickedCellR = document.querySelector<HTMLElement>(
      `[data-row="${r}"][data-column="${i}"]`
    )
    const rowVal = clickedCellR?.textContent || ''
    const clickedCellC = document.querySelector<HTMLElement>(
      `[data-row="${i}"][data-column="${c}"]`
    )
    const colVal = clickedCellC?.textContent || ''
    if (rowVal === symbol) {
      rowCount++
    }
    if (colVal === symbol) {
      colCount++
    }
  }
  return rowCount === size || colCount === size
}

function checkDiagonals(symbol: string, size: number): boolean {
  let mainDiagonalCount = 0
  let antiDiagonalCount = 0
  for (let i = 0; i < size; i++) {
    const diagonalL = document.querySelector<HTMLElement>(
      `[data-row="${i}"][data-column="${i}"]`
    )
    const valL = diagonalL?.textContent || ''
    if (valL === symbol) {
      mainDiagonalCount++
    }
    const diagonalR = document.querySelector<HTMLElement>(
      `[data-row="${i}"][data-column="${size - i - 1}"]`
    )
    const valR = diagonalR?.textContent || ''
    if (valR === symbol) {
      antiDiagonalCount++
    }
  }
  return mainDiagonalCount === size || antiDiagonalCount === size
}
