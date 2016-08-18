declare var Konva: any;

var x: number = 9;
var y: number = 9;
var startPos: number = 4;
var cellSize: number = 75;
var board: BoardCell[][] = [];

var selectedFigure: Figure;

var kingImg = new Image();
kingImg.src = "../img/king.png";

var whiteFigImg = new Image();
whiteFigImg.src = "../img/white.png";

var blackFigImg = new Image();
blackFigImg.src = "../img/black.png";

var boardLayer = new Konva.Layer();

var figureLayer = new Konva.Layer();

enum Color {
    Black,
    White
}

var blackFigure = new Konva.Image({
    image: blackFigImg,
    width: cellSize,
    height: cellSize
});

function getKingFigure() {
    return new Konva.Image({
        image: kingImg,
        width: cellSize,
        height: cellSize
    });
}

function getWhiteFigure() {
    return new Konva.Image({
        image: whiteFigImg,
        width: cellSize,
        height: cellSize
    });
}

function getBlackFigure() {
    return new Konva.Image({
        image: blackFigImg,
        width: cellSize,
        height: cellSize
    });
}

function deselect() {
    selectedFigure = undefined;

    for (let i: number = 0; i < x; i++) {
        for (let j: number = 0; j < y; j++) {
            board[i][j].dehighlight();
        }
    }
}

class Figure {
    constructor(public boardCell: BoardCell, public color: Color, public shape: any) {
        let _this: Figure = this;
        this.shape.on("click", function () {
            deselect();
            _this.select();
        });
    }

    select() {
        selectedFigure = this;
        this.boardCell.highlightBottom();
        this.boardCell.highlightLeft();
        this.boardCell.highlightRight();
        this.boardCell.highlightTop();
    }

    moveTo(cell: BoardCell) {
        this.boardCell.figure = undefined;
        cell.figure = this;
        this.boardCell = cell;
        this.draw();
        figureLayer.draw();
    }

    draw() {
        this.shape.setX(cellSize * this.boardCell.x);
        this.shape.setY(cellSize * this.boardCell.y);
        this.shape.draw();
    }
}

class BoardCell {
    x: number;
    y: number;
    isStart: boolean;
    isEnd: boolean;
    isHighlighted: boolean;
    figure: Figure;
    top: BoardCell;
    left: BoardCell;
    right: BoardCell;
    bottom: BoardCell;

    constructor(public cell: any) {
        let _this: BoardCell = this;
        this.cell.on("click", function () {

            if (selectedFigure != undefined && _this.isHighlighted) {
                selectedFigure.moveTo(_this);
            }
            deselect();
        });
    }

    public highlightRight() {
        if (this.right != undefined && this.right.figure == undefined) {
            this.right.isHighlighted = true;
            this.right.cell.fill("yellow");
            this.right.cell.draw();
            this.right.highlightRight();
        }
    }
    public highlightLeft() {
        if (this.left != undefined && this.left.figure == undefined) {
            this.left.isHighlighted = true;
            this.left.cell.fill("yellow");
            this.left.cell.draw();
            this.left.highlightLeft();
        }
    }
    public highlightTop() {
        if (this.top != undefined && this.top.figure == undefined) {
            this.top.isHighlighted = true;
            this.top.cell.fill("yellow");
            this.top.cell.draw();
            this.top.highlightTop();
        }
    }
    public highlightBottom() {
        if (this.bottom != undefined && this.bottom.figure == undefined) {
            this.bottom.isHighlighted = true;
            this.bottom.cell.fill('yellow');
            this.bottom.cell.draw();
            this.bottom.highlightBottom();
        }
    }

    public dehighlight() {
        if (!this.isStart && !this.isEnd) {
            this.cell.fill("white");
        }
        else {
            this.cell.fill("gray");
        }
        this.isHighlighted = false;
        this.cell.draw();
    }
}

function prepareBoard() {

    for (let i: number = 0; i < x; i++) {
        board[i] = [];
        for (let j: number = 0; j < y; j++) {

            board[i][j] = new BoardCell(new Konva.Rect({
                y: i * cellSize,
                x: j * cellSize,
                width: cellSize,
                height: cellSize,
                stroke: "black",
                strokeWidth: 1
            }));

            board[i][j].x = j;
            board[i][j].y = i;

            let fill: string = "white";

            if (i == 0 && (j == 0 || j == y - 1)
                || i == x - 1 && (j == 0 || j == y - 1)) {
                board[i][j].isEnd = true;
                fill = "gray";
            }

            if (i == startPos && j == startPos) {
                board[i][j].isStart = true;
                fill = "gray";
            }

            board[i][j].cell.fill(fill);
        }
    }

    for (let i: number = 0; i < x; i++) {
        for (let j: number = 0; j < y; j++) {
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
    board[4][4].figure = new Figure(board[4][4], Color.White, getKingFigure());

    board[4][2].figure = new Figure(board[4][2], Color.White, getWhiteFigure());
    board[4][3].figure = new Figure(board[4][3], Color.White, getWhiteFigure());
    board[4][5].figure = new Figure(board[4][5], Color.White, getWhiteFigure());
    board[4][6].figure = new Figure(board[4][6], Color.White, getWhiteFigure());
    board[2][4].figure = new Figure(board[2][4], Color.White, getWhiteFigure());
    board[3][4].figure = new Figure(board[3][4], Color.White, getWhiteFigure());
    board[5][4].figure = new Figure(board[5][4], Color.White, getWhiteFigure());
    board[6][4].figure = new Figure(board[6][4], Color.White, getWhiteFigure());

    board[0][3].figure = new Figure(board[0][3], Color.Black, getBlackFigure());
    board[0][4].figure = new Figure(board[0][4], Color.Black, getBlackFigure());
    board[0][5].figure = new Figure(board[0][5], Color.Black, getBlackFigure());
    board[1][4].figure = new Figure(board[1][4], Color.Black, getBlackFigure());

    board[8][3].figure = new Figure(board[8][3], Color.Black, getBlackFigure());
    board[8][4].figure = new Figure(board[8][4], Color.Black, getBlackFigure());
    board[8][5].figure = new Figure(board[8][5], Color.Black, getBlackFigure());
    board[7][4].figure = new Figure(board[7][4], Color.Black, getBlackFigure());

    board[3][0].figure = new Figure(board[3][0], Color.Black, getBlackFigure());
    board[4][0].figure = new Figure(board[4][0], Color.Black, getBlackFigure());
    board[5][0].figure = new Figure(board[5][0], Color.Black, getBlackFigure());
    board[4][1].figure = new Figure(board[4][1], Color.Black, getBlackFigure());

    board[3][8].figure = new Figure(board[3][8], Color.Black, getBlackFigure());
    board[4][8].figure = new Figure(board[4][8], Color.Black, getBlackFigure());
    board[5][8].figure = new Figure(board[5][8], Color.Black, getBlackFigure());
    board[4][7].figure = new Figure(board[4][7], Color.Black, getBlackFigure());
}

function drawFigures(layer: any) {
    for (let i: number = 0; i < x; i++) {
        for (let j: number = 0; j < y; j++) {
            if (board[i][j].figure != undefined) {
                layer.add(board[i][j].figure.shape);
                board[i][j].figure.draw();
            }
        }
    }

    layer.moveToTop();
}

export function draw() {
    let board = prepareBoard();

    let width = window.innerWidth;
    let height = window.innerHeight;

    let stage = new Konva.Stage({
        container: "container",
        width: width,
        height: height
    });

    for (let i: number = 0; i < x; i++) {
        for (let j: number = 0; j < y; j++) {
            boardLayer.add(board[i][j].cell);
        }
    }

    // add the layer to the stage
    stage.add(boardLayer);

    stage.add(figureLayer);

    prepareFigures();
    drawFigures(figureLayer);
}