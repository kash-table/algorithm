const file = // require('fs').readFileSync('/dev/stdin').toString().trim();
`7 12
1 2 3
1 3 2
3 2 1
2 5 2
3 4 4
7 3 6
5 1 5
1 6 2
6 4 1
6 5 3
4 5 3
6 7 4`;
const input = file.split('\n');

const [n, m] = input[0].split(' ').map(Number);

const roots = Array(n + 1).fill().map((_, i) => i);
const lines = input.slice(1).map(line => line.split(' ')).sort((a, b) => a[2] - b[2]);

function findRoot (child) {
    if (child === roots[child]) return child;
    roots[child] = findRoot(roots[child]);
    return findRoot(roots[child]);
};

let answer = 0;
let lastValue = 0;
for (let i = 0; i < lines.length; i++) {
    const [start, end, size] = lines[i];
    const startRoot = findRoot(start);
    const endRoot = findRoot(end);
    if (startRoot !== endRoot) {
        lastValue = size;
        if (startRoot < endRoot) {
            roots[endRoot] = startRoot;
        } else {
            roots[startRoot] = endRoot;
        }
        answer += Number(size);
    }
}
console.log(answer - lastValue);