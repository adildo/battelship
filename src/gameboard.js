import ship from "./ship";

const gameBoard = () => {
    const boardSize = 10;
    const board = []
    const placedShips = []
    const missedAttacks = []
    const hits = []
    const clearBoard = () => {
        for (let i = 0; i < boardSize; i++){
            board.push([])
            for (let j = 0; j < boardSize; j++){
                board[i].push(j);
            }
        }
    }

    const placeShipHorizontal = (ship, row, column) => {
        
        if ((parseInt(ship.shipSize) + parseInt(column) > boardSize) || (parseInt(row) > boardSize - 1)) {
            return 
        }
        let stack = false
        for (let i = 0; i < ship.shipSize; i++){
            if (board[row][parseInt(column) + i] === 'ship'){
                stack = true
                break;
            }
        }
        if (stack) return
        let j = 0
        while(j < ship.shipSize) {
            board[row].splice(parseInt(column) + j, 1, "ship")
            ship.addCords(row, parseInt(column) + j)
            j++
        }
        return placedShips.push(ship)
    }
    const placeShipVertical = (ship, row, column) => {

        if ((parseInt(ship.shipSize) + parseInt(row) > boardSize) || (parseInt(column) > boardSize - 1)) {
            return 
        }
        let stack = false
        for (let j = 0; j < ship.shipSize; j++){
            if (board[parseInt(row) + j][column] === 'ship'){
                stack = true
                break;
            }
        }
        if (stack) return
        let i = 0
        while(i < ship.shipSize) {
            board[parseInt(row) + i].splice(column, 1, "ship")
            ship.addCords(parseInt(row) + i, column)
            i++
        }
        return placedShips.push(ship)
    }
    const placeRandom = (ship) => {
        let vertOrHor = Math.floor(Math.random() * 2) //0 is horizontal 2 is vertical
        console.log(vertOrHor)
        let row = Math.floor(Math.random() * boardSize)
        let column = Math.floor(Math.random() * boardSize)
        if (vertOrHor < 1){
            while (!placeShipHorizontal(ship, row, column)){
                row = Math.floor(Math.random() * boardSize)
                column = Math.floor(Math.random() * boardSize)
                
            }
            return console.log('ship size: ', ship.shipSize, 'vertOrHor: ', vertOrHor, 'r :', row,'c: ', column)
        } else {
            while (!placeShipVertical(ship, row, column)) {
                row = Math.floor(Math.random() * boardSize)
                column = Math.floor(Math.random() * boardSize)
            }
            return console.log('ship size: ', ship.shipSize, 'vertOrHor: ', vertOrHor, 'r :', row,'c: ', column)
        }
    }

    const receiveAttack = (row, column) => {
        const attackCords = [row,column]
        const attackLocation = board[row][column];
        if (attackLocation === 'ship') {
            const attackedShip = placedShips.find(ship => JSON.stringify(ship.shipCords).includes(attackCords))
            attackedShip.hitLocation(attackCords)
            hits.push(attackCords)
        }
        else missedAttacks.push(attackCords)
    }

    const isAllSunk = () => {
        return placedShips.every(ship => ship.isSunk() === true) ? true : false
    }

    return {board, clearBoard, placeRandom, placeShipHorizontal, placeShipVertical, placedShips, receiveAttack, missedAttacks, isAllSunk, boardSize, hits}

}

export default gameBoard