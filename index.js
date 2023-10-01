board = document.getElementById("board");

// variables
height = window.innerHeight;
width = window.innerWidth;
max_size = Math.min(height, width);
board.style.width = `${max_size}px`;

// pieces
let white_king = document.getElementById("white_king");
let white_queen = document.getElementById("white_queen");
let white_rook = document.getElementById("white_rook");
let white_bishop = document.getElementById("white_bishop");
let white_knight = document.getElementById("white_knight");
let white_pawn = document.getElementById("white_pawn");

let black_king = document.getElementById("black_king");
let black_queen = document.getElementById("black_queen");
let black_rook = document.getElementById("black_rook");
let black_bishop = document.getElementById("black_bishop");
let black_knight = document.getElementById("black_knight");
let black_pawn = document.getElementById("black_pawn");

// sizing pieces
setSize(white_king);
setSize(white_queen);
setSize(white_rook);
setSize(white_bishop);
setSize(white_knight);
setSize(white_pawn);

setSize(black_king);
setSize(black_queen);
setSize(black_rook);
setSize(black_bishop);
setSize(black_knight);
setSize(black_pawn);

function drawSquare(x, y) {
  square = document.createElement("div");
  square.id = `${x}${y}`;
  setSize(square);
  if ((x + y) % 2 != 0) {
    square.style.background = "gray";
  }
  board.append(square);
}

function setSize(element) {
  element.style.width = `${Math.floor(max_size / 8)}px`;
  element.style.height = `${Math.floor(max_size / 8)}px`;
  element.style.fontSize = `${Math.floor(max_size / 8)}px`;
}
// draw a board of 8x8 squares
function drawBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      console.log(1);
      drawSquare(i, j);
    }
  }
}

drawBoard();
