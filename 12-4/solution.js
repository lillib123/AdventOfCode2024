import { FileHelper } from '../fileHelper.js';
const fileHelper = new FileHelper();

const rawInput = fileHelper.readFile('./12-4/input.txt');
const lines = rawInput.split('\n');
let count = 0;
let xCount = 0;

lines.forEach((line, y) => {
    line = line.trim().split('');

    line.forEach((char, x) => {
        if (char === 'X') {
            let right = x+1 <= line.length-1 ? line[x+1] : null;
            let rightRight = x+2 <= line.length-1 ? line[x+2] : null;
            let rightRightRight = x+3 <= line.length-1 ? line[x+3] : null;
            if (right === 'M' && rightRight === 'A' && rightRightRight === 'S') count++;
    
            let left = x-1 >= 0 ? line[x-1] : null;
            let leftLeft = x-2 >= 0 ? line[x-2] : null;
            let leftLeftLeft = x-3 >= 0 ? line[x-3] : null;
            if (left === 'M' && leftLeft === 'A' && leftLeftLeft === 'S') count++;
    
            let up = y-1 >= 0 ? lines[y-1][x] : null;
            let upUp = y-2 >= 0 ? lines[y-2][x] : null;
            let upUpUp = y-3 >= 0 ? lines[y-3][x] : null;
            if (up === 'M' && upUp === 'A' && upUpUp === 'S') count++;
    
            let down = y+1 <= lines.length-1 ? lines[y+1][x] : null;
            let downDown = y+2 <= lines.length-1 ? lines[y+2][x] : null;
            let downDownDown = y+3 <= lines.length-1 ? lines[y+3][x]: null;
            if (down === 'M' && downDown === 'A' && downDownDown === 'S') count++;
    
            let upRight = x+1 <= line.length-1 && y-1 >= 0 ? lines[y-1][x+1] : null;
            let upRightUpRight = x+2 <= line.length-1 && y-2 >= 0 ? lines[y-2][x+2] : null;
            let upRightUpRightUpRight = x+3 <= line.length-1 && y-3 >= 0 ? lines[y-3][x+3] : null;
            if (upRight === 'M' && upRightUpRight === 'A' && upRightUpRightUpRight === 'S') count++;
    
            let upLeft = x-1 >= 0 && y-1 >= 0 ? lines[y-1][x-1] : null;
            let upLeftUpLeft = x-2 >= 0 && y-2 >= 0 ? lines[y-2][x-2] : null;
            let upLeftUpLeftUpLeft = x-3 >= 0 && y-3 >= 0 ? lines[y-3][x-3] : null;
            if (upLeft === 'M' && upLeftUpLeft === 'A' && upLeftUpLeftUpLeft === 'S') count++;
    
            let downRight = x+1 <= line.length-1 && y+1 <= lines.length-3 ? lines[y+1][x+1] : null;
            let downRightDownRight = x+2 <= line.length-1 && y+1 <= lines.length-2 ? lines[y+2][x+2] : null;
            let downRightDownRightDownRight = x+3 <= line.length-1 && y+3 <= lines.length-1 ? lines[y+3][x+3] : null;
            if (downRight === 'M' && downRightDownRight === 'A' && downRightDownRightDownRight === 'S') count++;
    
            let downLeft = x-1 >= 0 && y+1 <= lines.length-1 ? lines[y+1][x-1] : null;
            let downLeftDownLeft = x-2 >= 0 && y+2 <= lines.length-1 ? lines[y+2][x-2] : null;
            let downLeftDownLeftDownLeft = x-3 >= 0 && y+3 <= lines.length-1 ? lines[y+3][x-3] : null;
            if (downLeft === 'M' && downLeftDownLeft === 'A' && downLeftDownLeftDownLeft === 'S') count++;
        } else if (char === 'A') {
            let upRight = x+1 <= line.length-1 && y-1 >= 0 ? lines[y-1][x+1] : null;
            let upLeft = x-1 >= 0 && y-1 >= 0 ? lines[y-1][x-1] : null;
            let downRight = x+1 <= line.length-1 && y+1 <= lines.length-1 ? lines[y+1][x+1] : null;
            let downLeft = x-1 >= 0 && y+1 <= lines.length-1 ? lines[y+1][x-1] : null;

            if (upLeft === 'M' && upRight === 'M' && downLeft === 'S' && downRight === 'S') xCount++;
            if (upLeft === 'S' && upRight === 'M' && downLeft === 'S' && downRight === 'M') xCount++;
            if (upLeft === 'S' && upRight === 'S' && downLeft === 'M' && downRight === 'M') xCount++;
            if (upLeft === 'M' && upRight === 'S' && downLeft === 'M' && downRight === 'S') xCount++;
        }
    });
});

console.log('Part 1: ' + count);
console.log('Part 2: ' + xCount)
