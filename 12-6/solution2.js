import { FileHelper } from '../fileHelper.js';
const fileHelper = new FileHelper();
const rawInput = fileHelper.readFile('./12-6/input.txt');
const code = rawInput.split('\n');

// const code = $0.textContent.trim().split('\n');
const rows = code.length;
const cols = code[0].length;
const dirs = [[0,-1], [1,0], [0,1], [-1,0]];
let pos = {x:0, y:0, dir: 0};
let startPos = {x:0, y:0, dir:0};
let positions = new Set();
let loopPositions = new Set();
outer: for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if ("^>v<".includes(code[i][j])) {
            startPos = { x: j, y: i, dir: "^>v<".indexOf(code[i][j]) };
            pos = { x: j, y: i, dir: "^>v<".indexOf(code[i][j]) };
            break outer;
        }
    }
}
positions.add(`${pos.x}-${pos.y}`);

while (true) {
    const newx = pos.x + dirs[pos.dir][0];
    const newy = pos.y + dirs[pos.dir][1];
    if (newx < 0 || newx >= cols || newy < 0 || newy >= rows) {
        break;
    }
    if (code[newy][newx] === '#') {
        pos.dir = (pos.dir + 1)%4;
    } else {
        positions.add(`${newx}-${newy}`);
        pos.x = newx;
        pos.y = newy;
    }
}
console.log('Part 1 ->', positions.size);

function simulation(map, start) {
    let pos = {...start};
    let visited = new Set();

    while(true) {
        const state = `${pos.x}-${pos.y}-${pos.dir}`;
        if (visited.has(state)) {
            return true;
        }
        visited.add(state);
        const newx = pos.x + dirs[pos.dir][0];
        const newy = pos.y + dirs[pos.dir][1];
        if (newx < 0 || newx >= map[0].length || newy < 0 || newy >= map.length) {
            return false;
        }
        if (map[newy][newx] === '#') {
            pos.dir = (pos.dir + 1)%4;
        } else {
            pos.x = newx;
            pos.y = newy;
        }
    }
    return false;
    
}

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (code[i][j] === '.') {
            const modMap = code.map(row => row.split(''));
            modMap[i][j] = "#";

            if (simulation(modMap, startPos)) {
                loopPositions.add(`${j}-${i}`);
            }
        }
    }
    
}
console.log('Part 2 ->', loopPositions.size);