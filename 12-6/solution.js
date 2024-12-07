import { FileHelper } from '../fileHelper.js';

const fileHelper = new FileHelper();
const rawInput = fileHelper.readFile('./12-6/input.txt');
const lines = rawInput.split('\n');
const columns = lines[0].length;
const rows = lines.length;
const obstacles = new Set();
let position = {x: 0, y: 0, direction: 0};
let visitedPositions = new Set();
const directions = [[0,-1], [1,0], [0,1], [-1,0]];

lines.forEach((line, y) => {
    line = line.trim().split('');
    line.forEach((char, x) => {
        if (char === '^') {
            position.x = x;
            position.y = y;
            position.xStart = x;
            position.yStart = y;
        } else if (char === '#') {
            obstacles.add(`${y},${x}`);
        }
    });
});

runMap();
let loopCount = 0;
visitedPositions.forEach(position => {
    if(runMap(position)) loopCount++
});

console.log('Part 1: ' + visitedPositions.size);
console.log('Part 2: ' + loopCount);

function runMap(fakeObstacle) {
    let hitObstacles = new Set();
    position.x = position.xStart;
    position.y = position.yStart;
    position.direction = 0;
    while (true) {
        const nextX = position.x + directions[position.direction][0];
        const nextY = position.y + directions[position.direction][1];
        if (!isInBounds(nextX,nextY)) break;
        if (lines[nextY][nextX] === '#' || `${nextX},${nextY}` === fakeObstacle) {
            if (hitObstacles.has(`${[nextY]},${[nextX]},${position.direction}`)) {
                return true;
            } else {
                hitObstacles.add(`${[nextY]},${[nextX]},${position.direction}`);
            }
            position.direction = (position.direction + 1) % 4;
        } else {
            position.x = nextX;
            position.y = nextY;
            if (!fakeObstacle) visitedPositions.add(`${position.x},${position.y}`);
        }
    }
}

function isInBounds(x,y) {
    return x >= 0 && x < columns && y >= 0 && y < rows;
}
