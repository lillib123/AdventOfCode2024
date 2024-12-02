const fs = require('fs');

const rawInput = readFile('./12-1/input.txt');
const lessRawInput = rawInput.split('\n');
const leftList = [];
const rightList = [];

lessRawInput.forEach(line => {
    numbers = line.split(/\s+/);
    leftNumber = numbers[0];
    rightNumber = numbers[1];

    leftList.push(leftNumber);
    rightList.push(rightNumber);
});

const sortedLeft = leftList.sort((a,b) => a-b);
const sortedRight = rightList.sort((a,b) => a-b);

let sum = 0;
let newSum = 0;

for (let i=0; i<sortedLeft.length; i++) {
    sum+=Math.abs(sortedLeft[i]-sortedRight[i]);
    let occurencesInRightList = sortedRight.filter(number => number === sortedLeft[i]).length;
    newSum += sortedLeft[i]*occurencesInRightList;
}

console.log('Part 1: ' + sum);
console.log('Part 2: ' + newSum);

function readFile(filePath) {
    try {
      const data = fs.readFileSync(filePath);
      return data.toString();
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }