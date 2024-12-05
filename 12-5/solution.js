import { FileHelper } from '../fileHelper.js';
const fileHelper = new FileHelper();

const rawInput = fileHelper.readFile('./12-5/input.txt');
const inputLines = rawInput.split('\n');
const rawRules = fileHelper.readFile('./12-5/rules.txt');
const ruleLines = rawRules.split('\n');

const rules = ruleLines.map(rule => {
    const [before, after] = rule.split('|');
    return [parseInt(before), parseInt(after)];
});

const updates = inputLines.map(update => 
    update.split(',').map(num => parseInt(num))
);

function isValid(rules, update) {
    const rulesToUse = rules.filter(([before, after]) => update.includes(before) && update.includes(after));
    
    for (let [before, after] of rulesToUse) {
        if (update.indexOf(before) > update.indexOf(after)) {
            return false;
        }
    }
    return true;
}

const disorderedUpdates = [];
let sum = 0;
for (let update of updates) {
    if (isValid(rules, update)) { 
        sum += update[Math.floor(update.length / 2)];
    } else {
        disorderedUpdates.push(update);
    }
}
console.log('Part 1: ', sum);

function buildGraph(numbers, rules) {
    const graph = new Map();
    const inDegree = new Map();
    
    numbers.forEach(n => {
        graph.set(n, []);
        inDegree.set(n, 0);
    });
    
    rules.filter(([b, a]) => numbers.includes(b) && numbers.includes(a))
            .forEach(([b, a]) => {
            graph.get(b).push(a);
            inDegree.set(a, inDegree.get(a) + 1);
            });
    
    return { graph, inDegree };
}

function topologicalSort(numbers, rules) {
    const { graph, inDegree } = buildGraph(numbers, rules);
    const result = [];
    const queue = [];
    
    numbers.forEach(n => {
        if (inDegree.get(n) === 0) queue.push(n);
    });
    
    while (queue.length) {
        const current = queue.shift();
        result.push(current);
        
        for (const next of graph.get(current)) {
            inDegree.set(next, inDegree.get(next) - 1);
            if (inDegree.get(next) === 0) {
                queue.push(next);
            }
        }
    }
    
    return result;
}

let sum2 = 0;
for (let update of disorderedUpdates) {
    const sorted = topologicalSort(update, rules);
    sum2 += sorted[Math.floor(sorted.length / 2)];
}
console.log('Part 2: ', sum2);