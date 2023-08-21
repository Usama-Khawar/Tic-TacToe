'use strict'
const gridContainer = document.querySelector('.grid-container')
let players = []
let turn
let itemAdded
function start() {
  const startButton = document.getElementById('start')
  startButton.disabled = true
  let p = document.getElementById('currPlayer')
  var x = document.getElementById('mySelect').value
  const play1 = document.getElementById('player1').value
  const play2 = document.getElementById('player2').value
  if (play1.trim() === '' || play2.trim() === '') {
    alert('provide names of players')
    startButton.disabled = false
  } else {
    players = []
    var size = Number(x)
    players.push(play1)
    players.push(play2)
    turn = 0
    itemAdded = 0
    gridContainer.style.display = 'grid'
    gridContainer.style.gap = '5px'
    gridContainer.style.gridTemplateRows = `repeat(${size}, minmax(0, 100px))`
    gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0,100px))`
    const reset = document.getElementById('restart')
    reset.style.display = 'block'
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('data-row', row.toString())
        cell.setAttribute('data-column', col.toString())
        cell.textContent = ''
        p.innerHTML = `${players[turn % 2]}'s turn`
        cell.addEventListener('click', () => {
          mainLogic(cell, size)
        })
        gridContainer.appendChild(cell)
      }
    }
  }
}
function mainLogic(cell, size) {
  let disabled = false
  let p = document.getElementById('currPlayer')
  const row = parseInt(cell.getAttribute('data-row'))
  const col = parseInt(cell.getAttribute('data-column'))
  if (cell.textContent === '' && itemAdded < size * size) {
    cell.textContent = turn % 2 === 0 ? 'x' : 'o'
    itemAdded++
    turn++
    p.innerHTML = `${players[turn % 2]}'s turn`
  }
  if (checkRowCol(row, col, cell.textContent, size)) {
    p.innerHTML = `${players[(turn + 1) % 2]} won`
    disabled = true
    disableGrid()
  }
  if (row === col || row + col === size - 1) {
    if (checkDiagonals(cell.textContent, size)) {
      p.innerHTML = `${players[(turn + 1) % 2]} won`
      disabled = true
      disableGrid()
    }
  }
  if (itemAdded >= size * size) {
    if (!disabled) {
      p.innerHTML = `match drawn`
      disableGrid()
    }
  }
}
function disableGrid() {
  const gridContainer = document.querySelector('.grid-container')
  gridContainer.classList.add('disabled')
}
function resetGame() {
  gridContainer.innerHTML = ''
  gridContainer.classList.remove('disabled')
  const startButton = document.getElementById('start')
  startButton.disabled = false
  document.getElementById('currPlayer').textContent = ''
  players = []
  turn = 0
  itemAdded = 0
  document.getElementById('player1').value = ''
  document.getElementById('player2').value = ''
  const reset = document.getElementById('restart')
  reset.style.display = 'none'
}
function checkRowCol(r, c, symbol, size) {
  let rowCount = 0
  let colCount = 0
  for (let i = 0; i < size; i++) {
    const clickedCellR = document.querySelector(
      `[data-row="${r}"][data-column="${i}"]`
    )
    const rowVal = clickedCellR.textContent
    const clickedCellC = document.querySelector(
      `[data-row="${i}"][data-column="${c}"]`
    )
    const colVal = clickedCellC.textContent
    if (rowVal === symbol) {
      rowCount++
    }
    if (colVal === symbol) {
      colCount++
    }
  }
  if (rowCount === size || colCount === size) {
    return true
  } else return false
}
function checkDiagonals(symbol, size) {
  let mainDiagonalCount = 0
  let antiDiagonalCount = 0
  for (let i = 0; i < size; i++) {
    const diagonalL = document.querySelector(
      `[data-row="${i}"][data-column="${i}"]`
    )
    const valL = diagonalL.textContent
    if (valL === symbol) {
      mainDiagonalCount++
    }
    const diagonalR = document.querySelector(
      `[data-row="${i}"][data-column="${size - i - 1}"]`
    )
    const valR = diagonalR.textContent
    if (valR === symbol) {
      antiDiagonalCount++
    }
  }
  if (mainDiagonalCount === size || antiDiagonalCount === size) {
    return true
  }
  return false
}
