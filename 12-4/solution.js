import { FileHelper } from '../fileHelper.js';
const fileHelper = new FileHelper();

const rawInput = fileHelper.readFile('./12-4/input.txt');
const lines = rawInput.split('\n');
let count = 0;
let xCount = 0;
const part1String = 'MAS';
const directions = [[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,-1],[1,1],[-1,1]];

lines.forEach((line, y) => {
    line = line.trim().split('');

    line.forEach((char, x) => {
        if (char === 'X') {
            directions.forEach(direction => {
                if (checkSpace(part1String, lines, y, x, direction[0], direction[1])) count++;
            });
        } else if (char === 'A') {
            if (checkCorners(['M', 'M', 'S', 'S'], lines, y, x)) xCount++;
            if (checkCorners(['S', 'M', 'S', 'M'], lines, y, x)) xCount++;
            if (checkCorners(['S', 'S', 'M', 'M'], lines, y, x)) xCount++;
            if (checkCorners(['M', 'S', 'M', 'S'], lines, y, x)) xCount++;
        }
    });
});

console.log('Part 1: ' + count);
console.log('Part 2: ' + xCount)

function checkCorners(characters, lines, y, x) {
    characters = ['M', 'M', 'S', 'S'];
    return checkSpace(characters[0], lines, y, x, -1, -1) && checkSpace(characters[1], lines, y, x, 1, -1) && checkSpace(characters[2], lines, y, x, -1, 1) && checkSpace(characters[3], lines, y, x, 1, 1);
}

function checkSpace(string, lines, y, x, xDirection, yDirection) {
    for (let i=1; i<=string.length; i++) {
        let nextCharacter = string.charAt(i-1);
        let isXOutOfBounds = x+(xDirection*(i)) < 0 || x+(xDirection*(i)) > lines[y].length-1;
        let isYOutOfBounds = y+(yDirection*(i)) < 0 || y+(yDirection*(i)) > lines.length-1;

        if (isXOutOfBounds || isYOutOfBounds || lines[y+(yDirection*(i))][x+(xDirection*(i))] !== nextCharacter) return false;
    }
    return true;
}