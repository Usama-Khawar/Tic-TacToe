'use strict'
var gridContainer = document.querySelector('.grid-container')
var startButton = document.getElementById('start')
var currPlayerElement = document.getElementById('currPlayer')
var player1Input = document.getElementById('player1')
var player2Input = document.getElementById('player2')
var restartButton = document.getElementById('restart')
var sizeSelect = document.getElementById('mySelect')
var players = []
var turn = 0
var itemAdded = 0
function start() {
  startButton.disabled = true
  var x = sizeSelect.value
  if (player1Input.value.trim() === '' || player2Input.value.trim() === '') {
    alert('Provide names of players')
    startButton.disabled = false
  } else {
    players = []
    var size_1 = Number(x)
    players.push(player1Input.value)
    players.push(player2Input.value)
    turn = 0
    itemAdded = 0
    gridContainer.style.display = 'grid'
    gridContainer.style.gap = '5px'
    gridContainer.style.gridTemplateRows = 'repeat('.concat(
      size_1,
      ', minmax(0, 100px))'
    )
    gridContainer.style.gridTemplateColumns = 'repeat('.concat(
      size_1,
      ', minmax(0,100px))'
    )
    restartButton.style.display = 'block'
    for (var row = 0; row < size_1; row++) {
      var _loop_1 = function (col) {
        var cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute('data-row', row.toString())
        cell.setAttribute('data-column', col.toString())
        cell.textContent = ''
        currPlayerElement.innerHTML = ''.concat(players[turn % 2], "'s turn")
        cell.addEventListener('click', function () {
          mainLogic(cell, size_1)
        })
        gridContainer.appendChild(cell)
      }
      for (var col = 0; col < size_1; col++) {
        _loop_1(col)
      }
    }
  }
}
function mainLogic(cell, size) {
  var disabled = false
  var row = parseInt(cell.getAttribute('data-row') || '0', 10)
  var col = parseInt(cell.getAttribute('data-column') || '0', 10)
  if (cell.textContent === '' && itemAdded < size * size) {
    cell.textContent = turn % 2 === 0 ? 'x' : 'o'
    itemAdded++
    turn++
    currPlayerElement.innerHTML = ''.concat(players[turn % 2], "'s turn")
  }
  if (checkRowCol(row, col, cell.textContent || '', size)) {
    currPlayerElement.innerHTML = ''.concat(players[(turn + 1) % 2], ' won')
    disabled = true
    disableGrid()
  }
  if (row === col || row + col === size - 1) {
    if (checkDiagonals(cell.textContent || '', size)) {
      currPlayerElement.innerHTML = ''.concat(players[(turn + 1) % 2], ' won')
      disabled = true
      disableGrid()
    }
  }
  if (itemAdded >= size * size) {
    if (!disabled) {
      currPlayerElement.innerHTML = 'Match drawn'
      disableGrid()
    }
  }
}
function disableGrid() {
  gridContainer.classList.add('disabled')
}
function resetGame() {
  gridContainer.innerHTML = ''
  gridContainer.classList.remove('disabled')
  startButton.disabled = false
  currPlayerElement.textContent = ''
  players = []
  turn = 0
  itemAdded = 0
  player1Input.value = ''
  player2Input.value = ''
  restartButton.style.display = 'none'
}
function checkRowCol(r, c, symbol, size) {
  var rowCount = 0
  var colCount = 0
  for (var i = 0; i < size; i++) {
    var clickedCellR = document.querySelector(
      '[data-row="'.concat(r, '"][data-column="').concat(i, '"]')
    )
    var rowVal =
      (clickedCellR === null || clickedCellR === void 0
        ? void 0
        : clickedCellR.textContent) || ''
    var clickedCellC = document.querySelector(
      '[data-row="'.concat(i, '"][data-column="').concat(c, '"]')
    )
    var colVal =
      (clickedCellC === null || clickedCellC === void 0
        ? void 0
        : clickedCellC.textContent) || ''
    if (rowVal === symbol) {
      rowCount++
    }
    if (colVal === symbol) {
      colCount++
    }
  }
  return rowCount === size || colCount === size
}
function checkDiagonals(symbol, size) {
  var mainDiagonalCount = 0
  var antiDiagonalCount = 0
  for (var i = 0; i < size; i++) {
    var diagonalL = document.querySelector(
      '[data-row="'.concat(i, '"][data-column="').concat(i, '"]')
    )
    var valL =
      (diagonalL === null || diagonalL === void 0
        ? void 0
        : diagonalL.textContent) || ''
    if (valL === symbol) {
      mainDiagonalCount++
    }
    var diagonalR = document.querySelector(
      '[data-row="'.concat(i, '"][data-column="').concat(size - i - 1, '"]')
    )
    var valR =
      (diagonalR === null || diagonalR === void 0
        ? void 0
        : diagonalR.textContent) || ''
    if (valR === symbol) {
      antiDiagonalCount++
    }
  }
  return mainDiagonalCount === size || antiDiagonalCount === size
}
