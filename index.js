import prompt from 'prompt';
import Day1 from './src/Day1';
 

const DAYS = {
  1: Day1,
}

prompt.start()

prompt.get('Day', (err, result) => {
  const dayFunction = DAYS[result.Day];
  if(dayFunction) return dayFunction();

  return 1;
});