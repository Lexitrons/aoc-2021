import path from 'path';
import displayResults from "../utils/displayResults";

import { readFileSync } from "fs";
import { off } from 'process';

const readFile = (path = '', cb) => cb(readFileSync(path, "utf8"));

const NUMBERS_PATH = path.join(__dirname, 'numbers.txt');
const BOARDS_PATH = path.join(__dirname, 'boards.txt');

const parseNumbers = (string) => string.split(',')
const parseBoards = (string) => string.split(/\n\s*\n/).map(elem => elem.split(/\n/g).map(e => e.split(' ').filter(a => a !== '')));

function scanBoard(board, number)  {
  let location = false;
  
  for (let i = 0; i < board.length; i++) {
    const element = board[i];
    const index = element.indexOf(number);

    if (index > -1) {
      location =  [i, index];
      break;
    }
  }

  return location
}

function testBoard(board, row, col) {
  const testRow = board[row].filter( e => e === '').length === 5;
  const testCol = board.map(row => row[col]).filter( e => e === '').length === 5;

  return {
    testRow,
    testCol,
  }
}

function calcWinner(board, num) {
  const total = board.reduce((acc, curr) => {
    const rowValue = curr.reduce((a,c) => {
      if (c !== '') a = a + parseInt(c)
      return a
    },0)

    return acc + rowValue
  }, 0)
  return total * parseInt(num)
}

function playBingo(numbers, boards) {
  const winingBoards = []
  const winningValue = []

  for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i];
    
    for (let k = 0; k < boards.length; k++) {
      if (winingBoards.includes(k)) continue;

      const board = boards[k];
      const value = scanBoard(board, element)
      if ( value ) {
        const [row, col] = value
          board[row][col] = '';
          const {testRow, testCol} = testBoard(board, row, col);
          if (testCol || testRow ) {
            winingBoards.push(k)
            winningValue.push(calcWinner(board, element))
          }
        }
      }
  }

  return {
    first: winningValue[0],
    last: winningValue[winningValue.length - 1]
  }
}

function Day4() {
  const numbers = readFile(NUMBERS_PATH, parseNumbers)
  const boards = readFile(BOARDS_PATH, parseBoards)
  const {first, last } = playBingo(numbers, boards);
  
  displayResults(4, first, last)
}

export default Day4;