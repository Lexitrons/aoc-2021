import readInput from "../utils/readInput";
import path, { parse } from 'path';
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

const parseData = (arr) => arr.map((elem) => parseInt(elem));

function Day1() {
  const data = readInput(INPUT_PATH, parseData)
  const part1 = testDepths(data);
  const part2 = testGroups(data)

  displayResults(1, part1, part2)
}

export default Day1;