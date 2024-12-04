import { FileHelper } from '../fileHelper.js';
const fileHelper = new FileHelper();

const rawInput = fileHelper.readFile('./12-5/input.txt');
const lines = rawInput.split('\n');

lines.forEach((line, index) => {
    console.log(line);
});

