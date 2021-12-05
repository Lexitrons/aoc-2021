import readInput from "../utils/readInput";
import path, { parse } from 'path';
import displayResults from "../utils/displayResults";
 
const INPUT_PATH = path.join(__dirname, 'input.txt');

 
// builds into array matrix
const parseData = (arr) => arr.map((elem) => elem.replace(' -> ', ',').split(',').map(coor => parseInt(coor)));
const DATA = parseData(readInput(INPUT_PATH))

function buildMap({x, y}) {
  const rows = Array(x + 1 ).fill(0)
  return [...new Array(y + 1).fill().map(() => [...rows])];
}

function createMatrix(arr) {
  const values = {
    x: 0,
    y: 0
  }

  arr.forEach(([x1, y1, x2, y2]) => {
    values.y = Math.max(y1, y2, values.y)
    values.x = Math.max(x1, x2, values.x)
  });

  return buildMap(values);
}

const calcScore = (map) => map.reduce((acc, curr, ind) => {
  const test = curr.filter(a => a > 1).length;
  
  // if (ind < 2) console.log( acc, test, curr)
  return acc + curr.filter(a => a > 1).length
},0)

function parseMap(arr) {
  let map = createMatrix(arr);

  for (let i = 0; i < arr.length; i++) {
    const [x1, y1, x2, y2] = arr[i];

    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        map[y][x1]++;
      }
    } 
    if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x2, x1); x++) {
        map[y1][x]++
      }
    }
  }

  return map;
}

function parseDiag(arr) {
  let map = createMatrix(arr);
  console.log( map.length, map[0].length)

  for (let i = 0; i < arr.length; i++) {
    const [x1, y1, x2, y2] = arr[i];

    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        map[y][x1]++;
      }
    }  else if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x2, x1); x++) {
        map[y1][x]++
      }
    } else {
      const xDelta = x1 < x2 ? 1 : -1;
      const yDelta = y1 < y2 ? 1 : -1;
      
      let x = x1;
      let y = y1;

      map[y1][x1]++;

      while (x !== x2 && y !== y2) {
        x += xDelta;
        y += yDelta;
        map[y][x]++;
      }
    }
  }
  return map;
}
function star1(arr){
  const parsedMap = parseMap(arr);
  return calcScore(parsedMap);
}

function star2(arr) {
  const parseMap = parseDiag(arr)
  return calcScore(parseMap);
}

function Day5() {
  const part1 = star1(DATA)
  const part2 = star2(DATA)

  displayResults(5, part1, part2)
}

export default Day5;