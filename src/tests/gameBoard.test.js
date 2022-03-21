import gameBoard from "../gameboard"
import ship from "../ship"

test('create a the core of the playing board', () => {
    const clearBoard = gameBoard()
    clearBoard.clearBoard()
    expect(clearBoard.board)
    .toEqual([  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]])
})

test('place a ship horizontally at row 1 item 8-10', () => {
    const clearBoard = gameBoard()
    clearBoard.clearBoard();
    const three = ship(3);
    clearBoard.placeShipHorizontal(three, 1, 7)
    expect(clearBoard.board)
    // .toEqual('g')
    .toEqual([  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, "ship", "ship", "ship"],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]])
    expect(three.shipCords).toEqual([[1,7],[1,8],[1,9]])
    expect(clearBoard.isAllSunk()).toBe(false)

})

test('fail place horizontally due to ship not fitting', () => {
    const clearBoard = gameBoard()
    clearBoard.clearBoard();
    const three = ship(3);
    clearBoard.placeShipHorizontal(three, 10, 8)
    expect(clearBoard.board)
    // .toEqual('g')
    .toEqual([  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]])
})

test('place a ship vertically at row 8-9 item 4', () => {
    const clearBoard = gameBoard()
    clearBoard.clearBoard();
    const three = ship(3);
    clearBoard.placeShipVertical(three, 7, 3)
    clearBoard.receiveAttack(7,3)
    clearBoard.receiveAttack(8,3)
    clearBoard.receiveAttack(9,3)
    clearBoard.receiveAttack(5,6)
    expect(clearBoard.board)
    // .toEqual('g')
    .toEqual([  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                [0, 1, 2, "ship", 4, 5, 6, 7, 8, 9],
                [0, 1, 2, "ship", 4, 5, 6, 7, 8, 9],
                [0, 1, 2, "ship", 4, 5, 6, 7, 8, 9]])
    expect(three.shipCords).toEqual([[7,3],[8,3],[9,3]])
    expect(clearBoard.board[8][3]).toBe('ship')
    expect(clearBoard.placedShips[0].shipCords).toEqual([[7, 3], [8, 3], [9, 3]])
    expect(three.hits).toEqual([[7,3],[8,3],[9,3]])
    expect(clearBoard.missedAttacks).toEqual([[5,6]])
    expect(clearBoard.isAllSunk()).toBe(true)

})

test('fail place vertically due to ship not fitting', () => {
    const clearBoard = gameBoard()
    clearBoard.clearBoard();
    const three = ship(3);
    clearBoard.placeShipVertical(three, 9, 8)
    expect(clearBoard.board)
    // .toEqual('g')
    .toEqual([  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]])
})

test('Check reveiveAttack function', () => {
    const clearBoard = new gameBoard()
    clearBoard.clearBoard();
    const three = ship(3);
    clearBoard.receiveAttack(5,8)
    expect(clearBoard.missedAttacks).toEqual([[5, 8]])
})

