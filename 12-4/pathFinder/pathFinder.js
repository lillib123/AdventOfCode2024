import {FileHelper} from '../../fileHelper.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var PF = require('pathfinding');
const fileHelper = new FileHelper();
const rawInput = fileHelper.readFile('./pathFinder/path.txt');

const lines = rawInput.split('\n');
let grid = new PF.Grid(lines[0].length, lines.length); 
let start;
let end;
let startCharacter = 'o';
let endCharacter = 'e';
let blockedCharacter = 'x'

lines.forEach((line, yIndex) => {
    line.split('').forEach((char, xIndex) => {
        if (char === blockedCharacter) {
            grid.setWalkableAt(xIndex, yIndex, false);
        } else if (char === startCharacter) {
            start = [xIndex,yIndex];
        } else if (char === endCharacter) {
            end = [xIndex,yIndex];
        }
    })
});

var finder = new PF.AStarFinder();
var path = finder.findPath(start[0], start[1], end[0], end[1], grid);
console.log(JSON.stringify(path));
console.log('Shortest path length including start and end: ' + path.length);

/**
o.........
.xx.......
xxx.......
..........
e.........
 */