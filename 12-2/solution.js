import {FileHelper} from '../fileHelper.js';
const fileHelper = new FileHelper();

const rawInput = fileHelper.readFile('./12-2/input.txt');
const reports = rawInput.split('\n');
let safeCount = 0;
let safeCountFixed = 0;

reports.forEach(report => {
    let levels = report.split(' ');

    if (checkReport(levels)) {
        safeCount++;
    } else {
        for (let i=0; i <levels.length; i++) {
            if (checkReport(levels, i)) {
                safeCountFixed++;
                break;
            }
        }
    }
});

console.log('Part 1: ' + safeCount);
console.log('Part 2: ' + (safeCount + safeCountFixed));

  function checkReport(levels, indexToSkip = undefined) {
    let isIncreasing = false;
    let isDecreasing = false;

    for (let i=0; i<levels.length; i++) {
        let currentLevel = Number(levels[i]);
        let nextLevel = (i+1) < levels.length ? Number(levels[i+1]) : null;
        let nextNextLevel = (i+2) < levels.length ? Number(levels[i+2]) : null;
        
        if (i === indexToSkip) {
            if (i === 0 || i === 1) currentLevel = nextLevel;
            nextLevel = nextNextLevel;
        } else if (i === 0 && indexToSkip === 1) {
            nextLevel = nextNextLevel;
        } else if (i > indexToSkip) {
            currentLevel = nextLevel;
            nextLevel = nextNextLevel;
        }

        if (!nextLevel || !currentLevel) break;

        if (currentLevel === nextLevel || (Math.abs(currentLevel - nextLevel) < 1 || Math.abs(currentLevel - nextLevel) > 3)) {
            return false;
        }

        if (nextLevel > currentLevel) isIncreasing = true;
        if (nextLevel < currentLevel) isDecreasing = true;

        if (isIncreasing === isDecreasing) {
            return false;
        }
    }

    return true;
  }
