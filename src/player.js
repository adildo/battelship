import gameBoard from "./gameboard"

class Player {
    constructor(name){
        this.name = name
        this.attackCords = []
        this.playerGameBoard = gameBoard()
        
    }
    isAttackDuplicate(row, column) {
        const cords = [row, column]
        return  JSON.stringify(this.attackCords).includes(cords)
    }
    chooseAttackCords(row, column, opponentBoard){
        if (this.isAttackDuplicate(row, column)) return 

        this.attackCords.push([row, column])
        opponentBoard.playerGameBoard.receiveAttack(row, column)
        return [row, column]
    }

    randomAttack(opponentBoard) {
        let row = Math.floor(Math.random() * this.playerGameBoard.boardSize)
        let column = Math.floor(Math.random() * this.playerGameBoard.boardSize)
        while (this.isAttackDuplicate(row, column)) {
            row = Math.floor(Math.random() * this.playerGameBoard.boardSize)
            column = Math.floor(Math.random() * this.playerGameBoard.boardSize)
        }
        this.chooseAttackCords(row, column, opponentBoard)
        return [row, column]
    }
}

export default Player