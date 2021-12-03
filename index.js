import prompt from 'prompt';
import Day1 from './src/Day1';
import Day2 from './src/Day2';
import Day3 from './src/Day3';
 

const DAYS = {
  1: Day1,
  2: Day2,
  3: Day3
}

prompt.start()

prompt.get('Day', (err, result) => {
  const dayFunction = DAYS[result.Day];
  if(dayFunction) return dayFunction();

  return 1;
});