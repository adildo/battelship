/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nconst gameBoard = () => {\n    const boardSize = 10;\n    const board = []\n    const placedShips = []\n    const missedAttacks = []\n    const hits = []\n    const clearBoard = () => {\n        for (let i = 0; i < boardSize; i++){\n            board.push([])\n            for (let j = 0; j < boardSize; j++){\n                board[i].push(j);\n            }\n        }\n    }\n\n    const placeShipHorizontal = (ship, row, column) => {\n        \n        if ((parseInt(ship.shipSize) + parseInt(column) > boardSize) || (parseInt(row) > boardSize - 1)) {\n            return \n        }\n        let stack = false\n        for (let i = 0; i < ship.shipSize; i++){\n            if (board[row][parseInt(column) + i] === 'ship'){\n                stack = true\n                break;\n            }\n        }\n        if (stack) return\n        let j = 0\n        while(j < ship.shipSize) {\n            board[row].splice(parseInt(column) + j, 1, \"ship\")\n            ship.addCords(row, parseInt(column) + j)\n            j++\n        }\n        return placedShips.push(ship)\n    }\n    const placeShipVertical = (ship, row, column) => {\n\n        if ((parseInt(ship.shipSize) + parseInt(row) > boardSize) || (parseInt(column) > boardSize - 1)) {\n            return \n        }\n        let stack = false\n        for (let j = 0; j < ship.shipSize; j++){\n            if (board[parseInt(row) + j][column] === 'ship'){\n                stack = true\n                break;\n            }\n        }\n        if (stack) return\n        let i = 0\n        while(i < ship.shipSize) {\n            board[parseInt(row) + i].splice(column, 1, \"ship\")\n            ship.addCords(parseInt(row) + i, column)\n            i++\n        }\n        return placedShips.push(ship)\n    }\n    const placeRandom = (ship) => {\n        let vertOrHor = Math.floor(Math.random() * 2) //0 is horizontal 2 is vertical\n        console.log(vertOrHor)\n        let row = Math.floor(Math.random() * boardSize)\n        let column = Math.floor(Math.random() * boardSize)\n        if (vertOrHor < 1){\n            while (!placeShipHorizontal(ship, row, column)){\n                row = Math.floor(Math.random() * boardSize)\n                column = Math.floor(Math.random() * boardSize)\n                \n            }\n            return console.log('ship size: ', ship.shipSize, 'vertOrHor: ', vertOrHor, 'r :', row,'c: ', column)\n        } else {\n            while (!placeShipVertical(ship, row, column)) {\n                row = Math.floor(Math.random() * boardSize)\n                column = Math.floor(Math.random() * boardSize)\n            }\n            return console.log('ship size: ', ship.shipSize, 'vertOrHor: ', vertOrHor, 'r :', row,'c: ', column)\n        }\n    }\n\n    const receiveAttack = (row, column) => {\n        const attackCords = [row,column]\n        const attackLocation = board[row][column];\n        if (attackLocation === 'ship') {\n            const attackedShip = placedShips.find(ship => JSON.stringify(ship.shipCords).includes(attackCords))\n            attackedShip.hitLocation(attackCords)\n            hits.push(attackCords)\n        }\n        else missedAttacks.push(attackCords)\n    }\n\n    const isAllSunk = () => {\n        return placedShips.every(ship => ship.isSunk() === true) ? true : false\n    }\n\n    return {board, clearBoard, placeRandom, placeShipHorizontal, placeShipVertical, placedShips, receiveAttack, missedAttacks, isAllSunk, boardSize, hits}\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);\n\n//# sourceURL=webpack://battelship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\n\n\nconst board1 = document.querySelector('#player1 .playerboard')\nconst board2 = document.querySelector('#player2 .playerboard')\nconst name1 = document.querySelector('#player1 .name')\nconst name2 = document.querySelector('#player2 .name')\nconst shipSection = document.querySelector('#ships')\nconst winner = document.querySelector('h1#winner')\nconst direction = document.querySelector('.switch input');\nlet draggingShip\nlet removeDiagram\nconst instructions = document.querySelector('#instructions')\n\n\nlet playersReady = false;\nlet playerTurn = 1\n\nconst ships = [\n        {type: \"Aircraft Carrier\", size: 5, count: 1},\n        {type: \"Battleship\", size: 4, count: 1},\n        {type: \"Cruiser\", size: 3, count: 1},\n        {type: \"Destroyer\", size: 2, count: 2},\n        {type: \"Submarine\", size: 1, count: 2}\n]\nconst allShips = []\nconst allShips2 =[]\nships.forEach(shipItem => {\n    let i = 0;\n    while (shipItem.count > i) {\n        const newShip1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shipItem.size)\n        const newShip2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(shipItem.size)\n        allShips.push(newShip1)\n        allShips2.push(newShip2)\n        i++\n    }\n})\n\nships.forEach(ship => {\n    const shipCont = document.createElement('div')\n    shipCont.classList = 'shipCont'\n    const shipType = document.createElement('h3')\n    shipType.dataset.shipType = ship.type\n    shipType.innerText = ship.type\n    shipCont.append(shipType)\n    let i = 0\n    while (i < ship.count){\n        const shipDiagram = document.createElement('button')\n        shipDiagram.draggable = true\n        shipDiagram.classList = 'diagram'\n        for (let i = 0; i < ship.size; i++) {\n            const box = document.createElement('p')\n            box.classList = 'box'\n            box.innerText = 'x'\n            shipDiagram.append(box)\n        }\n        shipCont.append(shipDiagram)\n        shipSection.append(shipCont)\n        i++\n    }\n})\n\ndirection.addEventListener('change', changeDirection)\nconst diagrams = document.querySelectorAll('.diagram')\n\ndiagrams.forEach(diagram => {\n    diagram.addEventListener('dragstart', dragStart)\n    diagram.addEventListener('dragend', dragEnd)\n})\n\n\nfunction changeDirection(e) {\n    diagrams.forEach(diagram => diagram.classList.toggle(\"vertical\"));\n}\n\n\nconst player1 = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('Player')\nname1.textContent = player1.name + \"'s Gameboard\"\nplayer1.playerGameBoard.clearBoard()\nconst player1gameBoard = player1.playerGameBoard.board\n\nconst player2 = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('Computer')\nname2.textContent = player2.name + \"'s Gameboard\"\nplayer2.playerGameBoard.clearBoard()\nconst player2gameBoard = player2.playerGameBoard.board\n\nfunction renderBoard(playerBoard, parent){\n    playerBoard.forEach((row, index) => {\n        const boardRow = document.createElement('div')\n        boardRow.classList = 'row'\n        boardRow.dataset.row = index\n        row.forEach((column, index) => {\n            const boardColumn = document.createElement('button')\n            boardColumn.classList = 'column'\n            boardColumn.dataset.column = index\n            boardRow.appendChild(boardColumn)\n        })\n        parent.append(boardRow)\n    })\n}\nrenderBoard(player1gameBoard, board1)\nrenderBoard(player2gameBoard, board2)\n\nconst player1columns = document.querySelectorAll('#player1 .column')\nplayer1columns.forEach(column => {\n    column.addEventListener('dragenter', dragEnter)\n    column.addEventListener('dragleave', dragLeave)\n    column.addEventListener('dragover', dragOver)\n    column.addEventListener('drop', dropIt)\n})\n\nfunction dragStart(e) {\n    e.target.classList.add('dragging')\n    draggingShip = e.target.children.length\n    removeDiagram = e.target\n    \n}\n\nfunction dragEnd(e) {\n    e.target.classList.remove('dragging')   \n}\n\nfunction dragEnter(e) {\n    this.classList.add('enter')\n}\nfunction dragOver(e) {\n    e.preventDefault()\n}\nfunction dragLeave(e) {\n   this.classList.remove('enter')\n}\n\nfunction dropIt(e) {\n    this.classList.remove('enter')\n    const currentShip = allShips.find(ship => ship.shipSize === draggingShip)\n    if (direction.checked) {\n        if(player1.playerGameBoard.placeShipVertical(currentShip, parseInt(e.target.parentNode.dataset.row), parseInt(e.target.dataset.column))) {\n            for (let i = 0; i < currentShip.shipSize; i++){\n                const column = document.querySelector(`#player1 [data-row=\"${parseInt(e.target.parentNode.dataset.row) + i}\"] [data-column=\"${e.target.dataset.column}\"]`)\n                column.classList.add('placed')\n            }\n            if (removeDiagram.parentNode.children.length < 3) {\n                removeDiagram.parentNode.remove()\n            }\n            removeDiagram.remove()\n            \n        }\n\n        console.table(player1.playerGameBoard.board)\n    } else {\n        if (player1.playerGameBoard.placeShipHorizontal(currentShip, parseInt(e.target.parentNode.dataset.row), parseInt(e.target.dataset.column))) {\n            for (let i = 0; i < currentShip.shipSize; i++){\n                const column = document.querySelector(`#player1 [data-row=\"${e.target.parentNode.dataset.row}\"] [data-column=\"${parseInt(e.target.dataset.column) + i}\"]`)\n                column.classList.add('placed')\n            }\n            if (removeDiagram.parentNode.children.length < 3) {\n                removeDiagram.parentNode.remove()\n            }\n            removeDiagram.remove()   \n        }\n        console.table(player1.playerGameBoard.board)\n    }\n    if (player1.playerGameBoard.placedShips.length === allShips.length){\n        instructions.textContent = ''\n        playersReady = true\n        runGame()\n    }\n}\n\nallShips2.forEach(ship => player2.playerGameBoard.placeRandom(ship))\nconsole.table(player2gameBoard)\n\nconst allBoxes2 = document.querySelectorAll('#player2 .column');\n\nfunction runGame() {\n    for (const item of allBoxes2) {\n        item.addEventListener('click', clickToAttack)\n    }\n}\n\nfunction clickToAttack(e) {\n    if (checkWinner()) return console.log('Game Over')\n\n    const column = parseInt(e.target.dataset.column)\n    const row = parseInt(e.target.parentNode.dataset.row)\n    if (!JSON.stringify(player1.attackCords).includes(JSON.stringify([row,column]))){\n        if (playerTurn === 1) {\n            player1.chooseAttackCords(row, column, player2)\n            if (JSON.stringify(player2.playerGameBoard.hits).includes(JSON.stringify([row,column]))) {\n                e.target.classList.add('hit')\n            }\n            else e.target.classList.add('miss')\n        }\n        playerTurn = 2\n        if (checkWinner()) return console.log('Game Over')\n        computerMove ()\n        checkWinner()\n    }\n}\n\nfunction computerMove () {\n    if (playerTurn === 2) {\n        const player2chosenCords = player2.randomAttack(player1)\n        const computerAttack = document.querySelector(`#player1 [data-row=\"${player2chosenCords[0]}\"] [data-column=\"${player2chosenCords[1]}\"]`)\n        if (JSON.stringify(player1.playerGameBoard.hits).includes(JSON.stringify([player2chosenCords[0],player2chosenCords[1]]))){\n            computerAttack.classList.add('hit')\n        } else computerAttack.classList.add('miss')\n    }\n    playerTurn = 1\n}\n\n\nfunction checkWinner () {\n    if (player1.playerGameBoard.isAllSunk()) {\n        return winner.innerText = `${player2.name} Won!`\n    }\n    else if (player2.playerGameBoard.isAllSunk()) {\n        return winner.innerText = `${player1.name} Won!`\n    }\n    return\n}\n\n//# sourceURL=webpack://battelship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nclass Player {\n    constructor(name){\n        this.name = name\n        this.attackCords = []\n        this.playerGameBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n        \n    }\n    isAttackDuplicate(row, column) {\n        const cords = [row, column]\n        return  JSON.stringify(this.attackCords).includes(cords)\n    }\n    chooseAttackCords(row, column, opponentBoard){\n        if (this.isAttackDuplicate(row, column)) return \n\n        this.attackCords.push([row, column])\n        opponentBoard.playerGameBoard.receiveAttack(row, column)\n        return [row, column]\n    }\n\n    randomAttack(opponentBoard) {\n        let row = Math.floor(Math.random() * this.playerGameBoard.boardSize)\n        let column = Math.floor(Math.random() * this.playerGameBoard.boardSize)\n        while (this.isAttackDuplicate(row, column)) {\n            row = Math.floor(Math.random() * this.playerGameBoard.boardSize)\n            column = Math.floor(Math.random() * this.playerGameBoard.boardSize)\n        }\n        this.chooseAttackCords(row, column, opponentBoard)\n        return [row, column]\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battelship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ship = (length) => {\n    const shipSize = length;\n    const hits = [];\n    const shipCords = []\n\n    const addCords = (row, column) => {\n        return shipCords.push([row,column])\n    }\n\n    const hitLocation = location => {\n        return hits.push(location);\n    }\n\n    const isSunk = () => {\n        return hits.length > shipSize - 1 ? true : false\n    }\n    return {isSunk, hitLocation, hits, shipSize, addCords, shipCords}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);\n\n\n\n//# sourceURL=webpack://battelship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;