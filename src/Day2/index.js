import readInput from "../utils/readInput";
import path from 'path';
import displayResults from "../utils/displayResults";

const INPUT_PATH = path.join(__dirname, 'input.txt');

const calculateAnswer = ({x, y})  => x * y;

function calcByAim(arr) {
  const coor = {
    x: 0,
    y: 0,
    aim: 0
  }
  
  arr.forEach(([action, value]) => {
    const valueNum = parseInt(value);
    
    if (action === 'forward') {
      coor.x = coor.x + valueNum;  
      coor.y = coor.y + (coor.aim * valueNum)
    }
    
    if (action === 'down') coor.aim = coor.aim + valueNum
    
    if (action === 'up') coor.aim = coor.aim - valueNum
  })

  return calculateAnswer(coor)
}

function calcByDirection(arr) {
  const coor = {
    x: 0,
    y: 0
  }
  
  arr.forEach(([action, value]) => {
    const valueNum = parseInt(value)
    if (action === 'forward') coor.x  = coor.x + valueNum    
    if (action === 'down') coor.y = coor.y + valueNum
    if (action === 'up') coor.y = coor.y - valueNum
  })

  return calculateAnswer(coor)
}

const parseDirections = (arr)  => arr.map(elem => elem.split(' '))

function Day2() {
  const data = parseDirections(readInput(INPUT_PATH))
  const part1 = calcByDirection(data);
  const part2 = calcByAim(data);
  
  displayResults(2, part1, part2)
}

export default Day2;