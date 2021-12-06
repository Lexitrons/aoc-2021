import readInput from "../utils/readInput";
import path from 'path';
import displayResults from "../utils/displayResults";
import sumArray from "../utils/sumArray";
 
const INPUT_PATH = path.join(__dirname, 'input.txt');
const DATA = readInput(INPUT_PATH)[0].split(',').map(e => parseInt(e))

function star1(limit) {
  const pop = [...DATA];
  let day = 0;
  
  while (day < limit) {
    pop.forEach((fish, i, arr ) => {
      const val = fish - 1;

      if (val === -1) {
        arr.push(8);
        arr[i] = 6
      } else {
        arr[i] = val;
      }
    })
    day++
  }
}

function star2() {
  const pop = new Array(9).fill(0)
  DATA.forEach((n) => pop[n]++);

  for (let day = 0; day < 256; day++) {
    pop[7] += pop[0];
    pop.push(pop.shift());
  }

  return sumArray(pop)

}

function Day6() {
  const part1 = star1()
  const part2 = star2()
  

  displayResults(6, part1, part2)
}

export default Day6;