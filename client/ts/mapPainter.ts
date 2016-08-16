declare var Konva: any;

enum Color {
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
    strokeWidth: 1,
    width: 50,
    height: 50
});

class Figure {
    constructor(public boardCell: BoardCell, public color: Color, public shape: any) {
        this.shape.on('click', function () {
            highlight(boardCell);
        });
    }
}

function highlight(sourceCell: BoardCell) {
    sourceCell.highlight();
}

class BoardCell {
    x: number;
    y: number;
    cell: any; //shape
    isEnd: boolean;
    isHighlighted: boolean;
    figure: Figure;
    top: BoardCell;
    left: BoardCell;
    right: BoardCell;
    bottom: BoardCell;

    public highlight() {
        this.highlightBottom();
        this.highlightLeft();
        this.highlightRight();
        this.highlightTop();
    }

    public highlightRight() {
        if (this.right != null && this.right.figure == null) {
            this.right.isHighlighted = true;
            this.right.cell.fill('yellow');
            this.right.cell.draw();
            this.right.highlightRight();
        }
    }
    public highlightLeft() {
        if (this.left != null && this.left.figure == null) {
            this.left.isHighlighted = true;
            this.left.cell.fill('yellow');
            this.left.cell.draw();
            this.left.highlightLeft();
        }
    }
    public highlightTop() {
        if (this.top != null && this.top.figure == null) {
            this.top.isHighlighted = true;
            this.top.cell.fill('yellow');
            this.top.cell.draw();
            this.top.highlightTop();
        }
    }
    public highlightBottom() {
        if (this.bottom != null && this.bottom.figure == null) {
            this.bottom.isHighlighted = true;
            this.bottom.cell.fill('yellow');
            this.bottom.cell.draw();
            this.bottom.highlightBottom();
        }
    }
}

var x: number = 9;
var y: number = 9;
var startPos: number = 4;
var board: BoardCell[][] = [];

function prepareBoard() {

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
                y: i * 50,
                x: j * 50,
                width: 50,
                height: 50,
                fill: fill,
                stroke: 'black',
                strokeWidth: 1
            });
        }
    }

    for (var i: number = 0; i < x; i++) {
        for (var j: number = 0; j < y; j++) {
            if (i != 0) {
                board[i][j].top = board[i - 1][j];
            }
            if (i != x - 1) {
                board[i][j].bottom = board[i + 1][j];
            }
            if (j != 0) {
                board[i][j].left = board[i][j - 1];
            }
            if (j != y - 1) {
                board[i][j].right = board[i][j + 1];
            }
        }
    }
    

    return board;
}

function prepareFigures() {
    board[4][4].figure = new Figure(board[4][4], Color.White, king);
    board[4][6].figure = new Figure(board[4][6], Color.White, new Konva.Text({
        text: 'F',
        fontSize: 45,
        fontFamily: 'Calibri',
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        width: 50,
        height: 50
    }));
}

function drawFigures(layer: any) {
    for (var i: number = 0; i < x; i++) {
        for (var j: number = 0; j < y; j++) {
            if (board[i][j].figure != null) {
                board[i][j].figure.shape.setY(i * 50);
                board[i][j].figure.shape.setX(j * 50);
                layer.add(board[i][j].figure.shape);
            }
        }
    }

    layer.moveToTop();
}

export function draw() {
    var board = prepareBoard();

    prepareFigures();

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

    drawFigures(figureLayer);
    // add the layer to the stage
    stage.add(boardLayer);
    stage.add(figureLayer);
}