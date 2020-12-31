var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxNodes = 10;
var nodeSize = canvas.width / maxNodes;
var normalWeight = 10;
var manhattan, nodeA, nodeB;
var grid = new Grid(10, 10, 0);
var nodes;

function Node(x, y, weight, i, j) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.i = i;
    this.j = j;
    
    ctx.beginPath();
    ctx.rect(x, y, nodeSize, nodeSize);
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();
    ctx.closePath();
}

function isWall(node) {
    node.weight = 0;
    ctx.beginPath();
    ctx.rect(node.x, node.y, nodeSize, nodeSize);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function isNodeA(node) {
    node.weight = 0;
    ctx.beginPath();
    ctx.rect(node.x, node.y, nodeSize, nodeSize);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function isNodeB(node) {
    node.weight = 0;
    ctx.beginPath();
    ctx.rect(node.x, node.y, nodeSize, nodeSize);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function canWalkIn(i, j) {
    if(this.nodes[i][j].weight > 0) {
        return true;
    }
    else return false;
}

function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.nodes = buildNodes(width, height);
}

function buildNodes(width, height) {
    var i, j;
    nodes = new Array(height);
    
    for (i = 0; i < maxNodes; i++) {
        nodes[i] = new Array(width);
        for (j = 0; j < maxNodes; j++) {
            nodes[i][j] = new Node(i * nodeSize, j * nodeSize, normalWeight, i, j);
            if(i == maxNodes / 2 && j == maxNodes / 2) {
                isWall(nodes[i][j]);
            }
            else if(i == (maxNodes / 2) - 1 && j == maxNodes / 2) {
                isWall(nodes[i][j]);
            }
            else if(i == (maxNodes / 2) - 2 && j == maxNodes / 2) {
                isWall(nodes[i][j]);
            }
            else if(i == (maxNodes / 2) - 1 && j == (maxNodes / 2) - 2) {
                isNodeA(nodes[i][j]);
                nodeA = nodes[i][j];
            }
            else if(i == (maxNodes / 2) - 1 && j == (maxNodes / 2) + 2) {
                isNodeB(nodes[i][j]);
                nodeB = nodes[i][j];
            }
        }
    }
    getNeighbors(nodeA);
    return nodes;
}

function getNeighbors(node) {
    var neighbors = [];
    var i = node.i;
    var j = node.j;
    
    // left
    if(canWalkIn(i - 1, j)) {
        neighbors.push(nodes[i - 1][j]);
    }
    // right
    if(canWalkIn(i + 1, j)) {
        neighbors.push(nodes[i + 1][j]);
    }
    // up
    if(canWalkIn(i, j - 1)) {
        neighbors.push(nodes[i][j - 1]);
    }
    // down
    if(canWalkIn(i, j + 1)) {
        neighbors.push(nodes[i][j + 1]);
    }
    console.log(neighbors);
    return neighbors;
}