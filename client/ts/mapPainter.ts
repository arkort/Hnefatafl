declare var Konva: any;

class BoardCell {
    x: number;
    y: number;
}

function prepareData() {
    var x = 9;
    var y = 9;
    var board = new BoardCell[x][y];

    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            board[i, j] = new BoardCell();
            board[i, j].x = i;
            board[i, j].y = j;
        };
    }

    return board;
}

export function draw() {
    var board = prepareData();

    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

    var layer = new Konva.Layer();

    var rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 50,
        height: 50,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1
    });

    // add the shape to the layer
    layer.add(rect);

    // add the layer to the stage
    stage.add(layer);
}