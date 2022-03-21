import ship from "./ship";
import gameBoard from "./gameboard";
import Player from "./player";

const board1 = document.querySelector('#player1 .playerboard')
const board2 = document.querySelector('#player2 .playerboard')
const name1 = document.querySelector('#player1 .name')
const name2 = document.querySelector('#player2 .name')
const shipSection = document.querySelector('#ships')
const winner = document.querySelector('h1#winner')
const direction = document.querySelector('.switch input');
let draggingShip
let removeDiagram
const instructions = document.querySelector('#instructions')


let playersReady = false;
let playerTurn = 1

const ships = [
        {type: "Aircraft Carrier", size: 5, count: 1},
        {type: "Battleship", size: 4, count: 1},
        {type: "Cruiser", size: 3, count: 1},
        {type: "Destroyer", size: 2, count: 2},
        {type: "Submarine", size: 1, count: 2}
]
const allShips = []
const allShips2 =[]
ships.forEach(shipItem => {
    let i = 0;
    while (shipItem.count > i) {
        const newShip1 = ship(shipItem.size)
        const newShip2 = ship(shipItem.size)
        allShips.push(newShip1)
        allShips2.push(newShip2)
        i++
    }
})

ships.forEach(ship => {
    const shipCont = document.createElement('div')
    shipCont.classList = 'shipCont'
    const shipType = document.createElement('h3')
    shipType.dataset.shipType = ship.type
    shipType.innerText = ship.type
    shipCont.append(shipType)
    let i = 0
    while (i < ship.count){
        const shipDiagram = document.createElement('button')
        shipDiagram.draggable = true
        shipDiagram.classList = 'diagram'
        for (let i = 0; i < ship.size; i++) {
            const box = document.createElement('p')
            box.classList = 'box'
            box.innerText = 'x'
            shipDiagram.append(box)
        }
        shipCont.append(shipDiagram)
        shipSection.append(shipCont)
        i++
    }
})

direction.addEventListener('change', changeDirection)
const diagrams = document.querySelectorAll('.diagram')

diagrams.forEach(diagram => {
    diagram.addEventListener('dragstart', dragStart)
    diagram.addEventListener('dragend', dragEnd)
})


function changeDirection(e) {
    diagrams.forEach(diagram => diagram.classList.toggle("vertical"));
}


const player1 = new Player('Player')
name1.textContent = player1.name + "'s Gameboard"
player1.playerGameBoard.clearBoard()
const player1gameBoard = player1.playerGameBoard.board

const player2 = new Player('Computer')
name2.textContent = player2.name + "'s Gameboard"
player2.playerGameBoard.clearBoard()
const player2gameBoard = player2.playerGameBoard.board

function renderBoard(playerBoard, parent){
    playerBoard.forEach((row, index) => {
        const boardRow = document.createElement('div')
        boardRow.classList = 'row'
        boardRow.dataset.row = index
        row.forEach((column, index) => {
            const boardColumn = document.createElement('button')
            boardColumn.classList = 'column'
            boardColumn.dataset.column = index
            boardRow.appendChild(boardColumn)
        })
        parent.append(boardRow)
    })
}
renderBoard(player1gameBoard, board1)
renderBoard(player2gameBoard, board2)

const player1columns = document.querySelectorAll('#player1 .column')
player1columns.forEach(column => {
    column.addEventListener('dragenter', dragEnter)
    column.addEventListener('dragleave', dragLeave)
    column.addEventListener('dragover', dragOver)
    column.addEventListener('drop', dropIt)
})

function dragStart(e) {
    e.target.classList.add('dragging')
    draggingShip = e.target.children.length
    removeDiagram = e.target
    
}

function dragEnd(e) {
    e.target.classList.remove('dragging')   
}

function dragEnter(e) {
    this.classList.add('enter')
}
function dragOver(e) {
    e.preventDefault()
}
function dragLeave(e) {
   this.classList.remove('enter')
}

function dropIt(e) {
    this.classList.remove('enter')
    const currentShip = allShips.find(ship => ship.shipSize === draggingShip)
    if (direction.checked) {
        if(player1.playerGameBoard.placeShipVertical(currentShip, parseInt(e.target.parentNode.dataset.row), parseInt(e.target.dataset.column))) {
            for (let i = 0; i < currentShip.shipSize; i++){
                const column = document.querySelector(`#player1 [data-row="${parseInt(e.target.parentNode.dataset.row) + i}"] [data-column="${e.target.dataset.column}"]`)
                column.classList.add('placed')
            }
            if (removeDiagram.parentNode.children.length < 3) {
                removeDiagram.parentNode.remove()
            }
            removeDiagram.remove()
            
        }

        console.table(player1.playerGameBoard.board)
    } else {
        if (player1.playerGameBoard.placeShipHorizontal(currentShip, parseInt(e.target.parentNode.dataset.row), parseInt(e.target.dataset.column))) {
            for (let i = 0; i < currentShip.shipSize; i++){
                const column = document.querySelector(`#player1 [data-row="${e.target.parentNode.dataset.row}"] [data-column="${parseInt(e.target.dataset.column) + i}"]`)
                column.classList.add('placed')
            }
            if (removeDiagram.parentNode.children.length < 3) {
                removeDiagram.parentNode.remove()
            }
            removeDiagram.remove()   
        }
        console.table(player1.playerGameBoard.board)
    }
    if (player1.playerGameBoard.placedShips.length === allShips.length){
        instructions.textContent = ''
        playersReady = true
        runGame()
    }
}

allShips2.forEach(ship => player2.playerGameBoard.placeRandom(ship))
console.table(player2gameBoard)

const allBoxes2 = document.querySelectorAll('#player2 .column');

function runGame() {
    for (const item of allBoxes2) {
        item.addEventListener('click', clickToAttack)
    }
}

function clickToAttack(e) {
    if (checkWinner()) return console.log('Game Over')

    const column = parseInt(e.target.dataset.column)
    const row = parseInt(e.target.parentNode.dataset.row)
    if (!JSON.stringify(player1.attackCords).includes(JSON.stringify([row,column]))){
        if (playerTurn === 1) {
            player1.chooseAttackCords(row, column, player2)
            if (JSON.stringify(player2.playerGameBoard.hits).includes(JSON.stringify([row,column]))) {
                e.target.classList.add('hit')
            }
            else e.target.classList.add('miss')
        }
        playerTurn = 2
        if (checkWinner()) return console.log('Game Over')
        computerMove ()
        checkWinner()
    }
}

function computerMove () {
    if (playerTurn === 2) {
        const player2chosenCords = player2.randomAttack(player1)
        const computerAttack = document.querySelector(`#player1 [data-row="${player2chosenCords[0]}"] [data-column="${player2chosenCords[1]}"]`)
        if (JSON.stringify(player1.playerGameBoard.hits).includes(JSON.stringify([player2chosenCords[0],player2chosenCords[1]]))){
            computerAttack.classList.add('hit')
        } else computerAttack.classList.add('miss')
    }
    playerTurn = 1
}


function checkWinner () {
    if (player1.playerGameBoard.isAllSunk()) {
        return winner.innerText = `${player2.name} Won!`
    }
    else if (player2.playerGameBoard.isAllSunk()) {
        return winner.innerText = `${player1.name} Won!`
    }
    return
}