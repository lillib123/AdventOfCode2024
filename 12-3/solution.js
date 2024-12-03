const fs = require('fs');

const rawInput = readFile('./12-3/input.txt');
const muls = rawInput.match(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g);

let sum = 0;
let shouldDo = true;

muls.forEach(mul => {
    if (mul === "don't()") {
        shouldDo = false;
    } else if (mul === "do()") {
        shouldDo = true;
    } else if (mul.startsWith('mul') && shouldDo) {
        const numbers = mul.match(/\d{1,3}/g);
        const product = Number(numbers[0]*Number(numbers[1]));
        sum += product;
    }
});

console.log(sum);

function readFile(filePath) {
    try {
      const data = fs.readFileSync(filePath);
      return data.toString();
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }