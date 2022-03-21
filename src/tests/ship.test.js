import  ship  from "../ship";

test('create 3 piece ship', () => {
    const two = ship(2)
    two.hitLocation(2)
    two.hitLocation(1)
    two.hitLocation(3)
    expect(two.hits).toEqual([2,1,3])
    expect(two.isSunk()).toBe(true)
})
