const file = // require('fs').readFileSync('/dev/stdin').toString().trim();
`6
9
1 2 5
1 3 4
2 3 2
2 4 7
3 4 6
3 5 11
4 5 3
4 6 8
5 6 8`;
const input = file.split('\n');

const n = Number(input[0]);
const m = Number(input[1]);

const roots = Array(n + 1).fill().map((_, i) => i);
const lines = input.slice(2).map(line => line.split(' ')).sort((a, b) => a[2] - b[2]);

function findRoot (child) {
    if (child === roots[child]) return child;
    roots[child] = findRoot(roots[child]);
    return findRoot(roots[child]);
};

let answer = 0;
for (let i = 0; i < lines.length; i++) {
    const [start, end, size] = lines[i];
    const startRoot = findRoot(start);
    const endRoot = findRoot(end);
    
    if (startRoot !== endRoot) {
        if (startRoot < endRoot) {
            roots[endRoot] = startRoot;
        } else {
            roots[startRoot] = endRoot;
        }
        answer += Number(size);
    }
}
console.log(answer);