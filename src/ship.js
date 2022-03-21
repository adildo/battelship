const ship = (length) => {
    const shipSize = length;
    const hits = [];
    const shipCords = []

    const addCords = (row, column) => {
        return shipCords.push([row,column])
    }

    const hitLocation = location => {
        return hits.push(location);
    }

    const isSunk = () => {
        return hits.length > shipSize - 1 ? true : false
    }
    return {isSunk, hitLocation, hits, shipSize, addCords, shipCords}
}

export default ship

