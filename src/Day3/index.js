import readInput from "../utils/readInput";
import path from 'path';
import displayResults from "../utils/displayResults";

const INPUT_PATH = path.join(__dirname, 'input.txt');
const BASE = 2;
const LENGTH = 12


const getBase = (string) => parseInt(string, BASE);

const calculateRate = ({ first, second}) => {
  const a = getBase(first.join(''))
  const b = getBase(second.join(''))
  return a * b;
}

function getRates(arr) {
  let test = [...new Array(LENGTH)].map((elem) => 0);
  const threshold = arr.length / 2 

  for (let i = 0; i < arr.length; i++) {

    arr[i].forEach(((elem,ind) => {
      const value = parseInt(elem)
      if( value === 0 ) test[ind] = test[ind] + 1;
    }))
    // for (let j = 0; j < arr[0].length; j++) {
    //   const elem = parseInt(arr[i][j]);
    //   if (elem === 0) test[j] = test[j] + 1
    //   if (elem === 1) test[j] = test[j] + 1
    // }
  }

  const list = test.map((elem) => elem / threshold)
  const epsilon = [];
  const gamma = list.map(elem => {
    if (elem > 1 ) {
      epsilon.push(1)
      return 0;
    }

    if (elem < 1 ) {
      epsilon.push(0)
      return 1;
    }
  });

  return calculateRate({ first: gamma, second: epsilon })
}



function getConsumption(data, isOxygen = true) {
  let test = [...new Array(LENGTH)].map((elem) => 0);
  let list = data;

  for (let i = 0; i < test.length; i++) {
    if (list.length === 1 ) break;
    const threshold = list.length / 2
    let value = 0;

    list.forEach((e) => {
      const elem = parseInt(e[i])
      if (elem === 0) value = value + 1
    })

    const test = value / threshold
  
    if(isOxygen) {
      if ( test === 1 ) {
        value = 1
      } else {
        value = test > 1 ? 0 : 1
      }
    } else {
      if ( test === 1 ) {
        value = 0
      } else {
        value = test < 1 ? 0 : 1
      }
    }

    list = list.filter(elem => parseInt(elem[i]) === value)        
  }


  return list[0];
}

function part2(data,  ) {
  const oxygen = getConsumption(data, true)
  const carbon = getConsumption(data, false)

  return calculateRate({ first: oxygen, second: carbon })

}


const parseData = (arr)  =>  arr.map((elem) => elem.split(''))

function Day3() {
  
  const data =  parseData(readInput(INPUT_PATH))
  const star1 = getRates(data);
  const star2 = part2(data) 
  
  displayResults(3, star1, star2)
}

export default Day3;