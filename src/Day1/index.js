import readInput from "../utils/readInput";
import path from 'path';
import sumArray from "../utils/sumArray";

const INPUT_PATH = path.join(__dirname, 'input.txt');

const isLarger = (a, b) =>  a > b;

const groupData = (arr) => arr.map((elen, ind) => sumArray([...new Array(3)].map((e, i) => arr[ind + i] )))

function testDepths(data = '') {
  let totalIncreased = 0;

  for (let i = 0; i < data.length; i++) {
    if (i === 0) continue;
    if(isLarger(data[i], data[i - 1])) totalIncreased++ ;
  }

  return totalIncreased;
}

function testGroups(data) {
  const groups = groupData(data)
  return testDepths(groups)
}

function Day1() {
  console.log( INPUT_PATH )
  const data = readInput(INPUT_PATH).map((elem) => parseInt(elem))
  const part1 = testDepths(data);
  const part2 = testGroups(data)
  
  console.log( "DAY 1");
  console.log( "Part 1", part1)
  console.log( "Part 2", part2)
}

export default Day1;