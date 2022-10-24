class minHeap {
    constructor() {
        this.list = [];
    }
    size () {
        return this.list.length;
    }
    swap(a, b) {
        [this.list[a], this.list[b]] = [this.list[b], this.list[a]]
    }
    push (element) {
        this.list.push(element)
        
        let elementIndex = this.list.length - 1;
        let parentIndex = Math.floor((elementIndex - 1) / 2);
        
        while (elementIndex > 0 && this.list[elementIndex][2] < this.list[parentIndex][2]) {
            this.swap(elementIndex, parentIndex);
            elementIndex = parentIndex;
            parentIndex = Math.floor((elementIndex - 1) / 2);
        }
    }
    pop () {
        if (this.list.length === 0) return null;
        const top = this.list[0];
        this.swap(0, this.list.length - 1);
        this.list.pop();

        let elementIndex = 0;
        let leftChildIndex = elementIndex * 2 + 1;
        let rightChildIndex = elementIndex * 2 + 2;
        while (this.list.length > leftChildIndex) {
            if (
                rightChildIndex < this.list.length &&
                this.list[leftChildIndex][2] < this.list[elementIndex][2] &&
                this.list[rightChildIndex][2] < this.list[elementIndex][2]
            ) {
                if (this.list[leftChildIndex][2] < this.list[rightChildIndex][2]) {
                    this.swap(leftChildIndex, elementIndex);
                    elementIndex = leftChildIndex;
                } else {
                    this.swap(rightChildIndex, elementIndex);
                    elementIndex = rightChildIndex;
                }
            } else if (this.list[leftChildIndex][2] < this.list[elementIndex][2]) {
                this.swap(leftChildIndex, elementIndex);
                elementIndex = leftChildIndex;
            } else if (
                rightChildIndex < this.list.length &&
                this.list[rightChildIndex][2] < this.list[elementIndex][2]
            ) {
                this.swap(rightChildIndex, elementIndex);
                elementIndex = rightChildIndex;
            } else {
                break;
            }
            leftChildIndex = elementIndex * 2 + 1;
            rightChildIndex = elementIndex * 2 + 2;
        }
        return top;
    }

    print() {
        console.log(this.list)
    }
}
const file = // require('fs').readFileSync('/dev/stdin').toString().trim();
`5
11 -15 -15
14 -5 -15
-1 -1 -5
10 -4 -1
19 -4 19`;
const input = file.split('\n');

const n = +input[0];

const visited = Array(n + 1).fill(false);
const coords = input.slice(1);
const [xList, yList, zList] = coords.reduce((sum, acc, idx) => {
    const [x, y, z] = acc.split(' ').map(Number);
    sum[0].push([x, idx]);
    sum[1].push([y, idx]);
    sum[2].push([z, idx]);
    return sum;
}, [[], [], []])
xList.sort((a, b) => a[0] - b[0]);
yList.sort((a, b) => a[0] - b[0]);
zList.sort((a, b) => a[0] - b[0]);

const lines = [];
for (let i = 0; i < xList.length - 1; i++) {
    const j = i + 1;
    const [start, end, distance] = [xList[i][1], xList[j][1], xList[j][0] - xList[i][0]]
    lines.push([start, end, distance]);
}
for (let i = 0; i < yList.length - 1; i++) {
    const j = i + 1;
    const [start, end, distance] = [yList[i][1], yList[j][1], yList[j][0] - yList[i][0]]
    lines.push([start, end, distance]);
}
for (let i = 0; i < zList.length - 1; i++) {
    const j = i + 1;
    const [start, end, distance] = [zList[i][1], zList[j][1], zList[j][0] - zList[i][0]]
    lines.push([start, end, distance]);
}

const verticals = lines.reduce((sum, acc) => {
    const [start, end, length] = acc;
    if (!sum[start]) sum[start] = [];
    if (!sum[end]) sum[end] = [];

    sum[start].push([end, length]);
    sum[end].push([start, length]);
    return sum;
}, {})
const mh = new minHeap();
let answer = 0;

visited[1] = true;
verticals[1].forEach((vertical) => {
    mh.push([1, ...vertical])
})

while(mh.size()) {
    const [start, end, length] = mh.pop();
    if (!visited[end]) {
        visited[end] = true;
        answer += Number(length);
        verticals[end].forEach((vertical) => {
            if (!visited[vertical[0]]) {
                mh.push([1, ...vertical])
            }
        })      
    }
}
console.log(answer);
