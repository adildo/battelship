import Player from "../player";


test('check if player chosen a coordinate', () => {
    const newPlayer = new Player('Adi')
    const computer = new Player('computer')
    newPlayer.playerGameBoard.clearBoard()
    computer.playerGameBoard.clearBoard()
    newPlayer.chooseAttackCords(4,8, computer)
    expect(newPlayer.name).toBe('Adi')
    expect(newPlayer.attackCords).toEqual([[4,8]])
    expect(computer.playerGameBoard.missedAttacks).toEqual([[4,8]])
    expect(newPlayer.isAttackDuplicate(4,8)).toBe(true)
})