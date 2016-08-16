declare var Konva: any;

enum CellColor {
    Black,
    White
}

var figure = new Konva.Text({
    text:'F'
});

var king = new Konva.Text({
    text: 'K',
    fontSize: 45,
    fontFamily: 'Calibri',
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1
});

class Figure {
    constructor(public boardCell: BoardCell, public color: CellColor, public shape: any) {
    }
}

class BoardCell {
    x: number;
    y: number;
    cell: any;
    isEnd: boolean;
    figure: Figure;
}

var x: number = 9;
var y: number = 9;
var startPos: number = 4;

function prepareBoard() {
    var board: BoardCell[][] = [];

    for (var i: number = 0; i < x; i++) {
        board[i] = [];
        for (var j: number = 0; j < y; j++) {
            board[i][j] = new BoardCell();
            board[i][j].x = i;
            board[i][j].y = j;

            var fill: string = 'white';

            if (i == 0 && (j == 0 || j == y - 1)
                || i == x - 1 && (j == 0 || j == y - 1)
                || i == startPos && j == startPos) {
                board[i][j].isEnd = true;
                fill = 'gray';
            }

            board[i][j].cell = new Konva.Rect({
                x: i * 50,
                y: j * 50,
                width: 50,
                height: 50,
                fill: fill,
                stroke: 'black',
                strokeWidth: 1
            });
        }
    }

    return board;
}

function prepareFigures(board: BoardCell[][]) {
    board[4][4].figure = new Figure(board[4][4], CellColor.White, king);
}

function drawFigures(board: BoardCell[][], layer: any) {
    for (var i: number = 0; i < x; i++) {
        for (var j: number = 0; j < y; j++) {
            if (board[i][j].figure != null) {
                board[i][j].figure.shape.setX(i * 50);
                board[i][j].figure.shape.setY(j * 50);
                layer.add(board[i][j].figure.shape);
            }
        }
    }

    layer.moveToTop();
}

export function draw() {
    var board = prepareBoard();

    prepareFigures(board);

    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

    var boardLayer = new Konva.Layer();

    for (var i: number = 0; i < x; i++) {
        for (var j: number = 0; j < y; j++) {
            boardLayer.add(board[i][j].cell);
        }
    }

    var figureLayer = new Konva.Layer();

    drawFigures(board, figureLayer);
    // add the layer to the stage
    stage.add(boardLayer);
    stage.add(figureLayer);
}