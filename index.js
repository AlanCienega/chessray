board = document.getElementById("board");

// variables
height = window.innerHeight;
width = window.innerWidth;
max_size = Math.min(height, width);
board.style.width = `${max_size}px`;

// pieces
const white_king = document.getElementById("white_king");
const white_queen = document.getElementById("white_queen");
const white_rook = document.getElementById("white_rook");
const white_bishop = document.getElementById("white_bishop");
const white_knight = document.getElementById("white_knight");
const white_pawn = document.getElementById("white_pawn");

const black_king = document.getElementById("black_king");
const black_queen = document.getElementById("black_queen");
const black_rook = document.getElementById("black_rook");
const black_bishop = document.getElementById("black_bishop");
const black_knight = document.getElementById("black_knight");
const black_pawn = document.getElementById("black_pawn");

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

function addDraggingClass(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });
  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });
}

addDraggingClass(white_king);
addDraggingClass(white_queen);
addDraggingClass(white_rook);
addDraggingClass(white_bishop);
addDraggingClass(white_knight);
addDraggingClass(white_pawn);

addDraggingClass(black_king);
addDraggingClass(black_queen);
addDraggingClass(black_rook);
addDraggingClass(black_bishop);
addDraggingClass(black_knight);
addDraggingClass(black_pawn);

function drawSquare(x, y) {
  square = document.createElement("div");
  square.classList.add("square");
  square.id = `${x},${y}`;
  setSize(square);
  if ((x + y) % 2 != 0) {
    square.style.background = "gray";
  }
  board.append(square);
}

function setSize(element) {
  element.style.width = `${Math.floor(max_size / 8)}px`;
  element.style.height = `${Math.floor(max_size / 8)}px`;
  element.style.fontSize = `${Math.floor(max_size / 10)}px`;
}
// draw a board of 8x8 squares
function drawBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      drawSquare(i, j);
    }
  }
}

drawBoard();

squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("dragover", (e) => {
    e.preventDefault();
    const current_piece = document.querySelector(".dragging");
    current_piece.style.display = "inline-block";
    const color_piece = current_piece.id.split("_")[0];
    current_piece.style.color = color_piece;

    current_piece.style.background = `rgba( ${
      color_piece == "black" ? "255" : "0"
    }, 0, ${color_piece == "white" ? "255" : "0"}, 0.3)`;

    let coords = e.target.id.split(",");
    let x, y;
    if (coords.length > 1) {
      x = parseInt(coords[0]);
      y = parseInt(coords[1]);
    }
    square.append(current_piece);
  });
});
