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
`3
1.0 1.0
2.0 2.0
2.0 4.0`;
const input = file.split('\n');

const n = +input[0];

const visited = Array(n + 1).fill(false);
const coords = input.slice(1);
const lines = [];
for (let i = 0; i < coords.length; i++) {
    const [x1, y1] = coords[i].split(' ').map(Number);
    for (let j = 0; j < coords.length; j++) {
        if (i === j) continue;
        const [x2, y2] = coords[j].split(' ').map(Number);
        const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        lines.push([i, j, distance]);
    }
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
console.log(answer.toFixed(2));
