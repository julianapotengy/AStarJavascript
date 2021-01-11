var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxRows = 9;
var maxCols = maxRows;
var nodeSize = canvas.width / maxRows;
var grid;
var openList, closedList = [];
var start, end;
var path = [];
var normalWeight = 10;

function node(i, j) {
    this.i = i;
    this.j = j;
    this.g = 0;
    this.h = 0;
    this.f = this.g + this.h;
    this.neighbors = [];
    this.cameFrom = undefined;
    this.isWall = false;
    
    for(var a = 3; a <= 5; a++) {
        if(this.i == a && this.j == 4) {
            this.isWall = true;
        }
    }
    
    this.draw = function(color) {
        ctx.beginPath();
        ctx.rect(this.i * nodeSize, this.j * nodeSize, nodeSize, nodeSize);
        ctx.strokeStyle = "#0000FF";
        ctx.stroke();
        if(this.isWall) {
            ctx.fillStyle = "#000000";
        } else {
            ctx.fillStyle = color;
        }
        ctx.fill();
        ctx.closePath();
    }
    
    this.getNeighbors = function() {
        if(i < maxCols - 1) {
            this.neighbors.push(grid[this.i + 1][this.j]);
        }
        if(i > 0) {
            this.neighbors.push(grid[this.i - 1][this.j]);
        }
        if(j < maxRows - 1) {
            this.neighbors.push(grid[this.i][this.j + 1]);
        }
        if(j > 0) {
            this.neighbors.push(grid[this.i][this.j - 1]);
        }
    }
}

function createGrid() {
    grid = new Array(maxRows);
    
    for(var i = 0; i < maxCols; i++) {
        grid[i] = new Array(maxCols);
        for(var j = 0; j < maxRows; j++) {
            grid[i][j] = new node(i, j);
        }
    }
    
    start = grid[4][2];
    end = grid[4][6];
    
    for(var i = 0; i < maxCols; i++) {
        for(var j = 0; j < maxRows; j++) {
            grid[i][j].getNeighbors();
        }
    }
    
    openList = [];
    openList.push(start);
    
    return grid;
}

function aStar() {
    while(openList.length > 0) {
        var winner = 0;
        for(var i = 0; i < openList.length; i++) {
            if(openList[i].f < openList[winner].f) {
                winner = i;
            }
        }
        
        current = openList[winner];
        //console.log(current);
        
        if(current === end) {
            console.log("Chegou!");
            path = [];
            var temp = current;
            while(temp.cameFrom) {
                path.push(temp.cameFrom);
                temp = temp.cameFrom;
            }
            break;
        }
        
        for(var i = openList.length - 1; i >= 0; i--) {
            if(openList[i] == current) {
                openList.splice(i, 1);
            }
        }
        closedList.push(current);
        
        var neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++) {
            var actualNeighbor = neighbors[i];
            
            if(!closedList.includes(actualNeighbor) && !actualNeighbor.isWall) {
                var tempG = current.g + 1;
                if(openList.includes(actualNeighbor)) {
                    if(tempG < actualNeighbor.g) {
                        actualNeighbor.g = tempG;
                    }
                }
                else {
                    actualNeighbor.g = tempG;
                    openList.push(actualNeighbor);
                }
                
                actualNeighbor.h = manhattan(actualNeighbor, end) * normalWeight;
                actualNeighbor.f = actualNeighbor.g + actualNeighbor.h;
                actualNeighbor.cameFrom = current;
            }
        }
    }
    
    for(var i = 0; i < maxCols; i++) {
        for(var j = 0; j < maxRows; j++) {
            grid[i][j].draw("#eee");
        }
    }
    
    for(var i = 0; i < closedList.length; i++) {
        closedList[i].draw("#FFFF00");
    }
    
    for(var i = 0; i < openList.length; i++) {
        openList[i].draw("#FF00FF");
    }
    
    for(var i = 0; i < path.length; i++) {
        path[i].draw("#00FFFF");
    }
    
    start.draw("#00FF00");
    end.draw("#FF0000");
}

function manhattan(nodeA, nodeB) {
    var d1 = Math.abs(nodeA.i - nodeB.i);
    var d2 = Math.abs(nodeA.j - nodeB.j);
    return d1 + d2;
}
