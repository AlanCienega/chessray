board = document.getElementById("board");
buttons = document.querySelectorAll(".btn");
body = document.querySelector("body");

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

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    changeTheme(event.target.classList[1]);
  });
});

function changeTheme(theme) {
  body.style.background = theme.split("-")[1];
}

function hideEnemyShadows(piece) {
  const [color, type] = piece.split("_");
  const enemy = color === "white" ? "black" : "white";

  const enemies = document.querySelectorAll(`[class^="${enemy}_"]`);
  enemies.forEach((enemyPiece) => {
    enemyPiece.style.display = "none";
  });

  const myShadows = document.querySelectorAll(`[class^="${color}_"]`);
  myShadows.forEach((shadow) => {
    shadow.style.display = "inherit";
  });
}

function dropShadows(piece_name) {
  let shadows = document.querySelectorAll(`.${piece_name}_class`);
  shadows.forEach((shadow) => shadow.remove());
}
function addDraggingClass(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
    hideEnemyShadows(element.id);
    dropShadows(element.id);
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

function fillSquare(element, x, y) {
  if ((x + y) % 2 != 0) {
    element.style.background = "#a0a0a0";
  } else {
    element.style.background = "#e0e0e0";
  }
}

function drawSquare(x, y) {
  square = document.createElement("div");
  square.classList.add("square");
  square.style.position = "inherit";

  square.id = `${x},${y}`;
  setSize(square);
  fillSquare(square, x, y);
  board.append(square);
}
function drawShadow(color, piece_name) {
  shadow = document.createElement("div");
  shadow.classList.add(`${piece_name}_class`);
  shadow.style.background = getTransparentColorPiece(color);
  shadow.style.position = "inherit";
  setSize(shadow);
  return shadow;
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
      drawSquare(j, i);
    }
  }
}

drawBoard();

// get cells

function getHorizontalVerticalCells(x, y) {
  let cells = [];
  for (let i = x - 1; i >= 0; i--) {
    cells.push({ x: i, y: y });
  }
  for (let i = x + 1; i < 8; i++) {
    cells.push({ x: i, y: y });
  }
  for (let i = y - 1; i >= 0; i--) {
    cells.push({ x: x, y: i });
  }
  for (let i = y + 1; i < 8; i++) {
    cells.push({ x: x, y: i });
  }
  return cells;
}

function getDiagonalCells(x, y) {
  let cells = [];
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    cells.push({ x: i, y: j });
  }
  for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
    cells.push({ x: i, y: j });
  }
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
    cells.push({ x: i, y: j });
  }
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
    cells.push({ x: i, y: j });
  }
  return cells;
}

function getKnightNeighboringCells(x, y) {
  const cells = [
    { x: x - 1, y: y - 2 },
    { x: x + 1, y: y - 2 },
    { x: x - 2, y: y - 1 },
    { x: x - 2, y: y + 1 },
    { x: x + 2, y: y - 1 },
    { x: x + 2, y: y + 1 },
    { x: x - 1, y: y + 2 },
    { x: x + 1, y: y + 2 },
  ];
  return cells;
}

function getKingNeighboringCells(x, y) {
  const cells = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;
      cells.push({ x: x + i, y: y + j });
    }
  }
  return cells;
}
function getTransparentColorPiece(color) {
  let rgba_color = `rgba( ${color == "black" ? "255" : "0"}, 0, ${
    color == "white" ? "255" : "0"
  }, 0.3)`;
  return rgba_color;
}

function handleKingNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  const neighbors = getKingNeighboringCells(x, y);
  neighbors.forEach((neighbor) => {
    const element = document.getElementById(`${neighbor.x},${neighbor.y}`);
    element.append(drawShadow(color, piece.id));
  });
}

function handlePawnNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  let offsetY = color == "white" ? -1 : 1;
  let left_cell = document.getElementById(`${x - 1},${y + offsetY}`);
  let right_cell = document.getElementById(`${x + 1},${y + offsetY}`);

  if (left_cell) {
    left_cell.append(drawShadow(color, piece.id));
  }
  if (right_cell) {
    right_cell.append(drawShadow(color, piece.id));
  }
}

function handleKnightNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  const neighbors = getKnightNeighboringCells(x, y);

  neighbors.forEach((neighbor) => {
    const element = document.getElementById(`${neighbor.x},${neighbor.y}`);
    if (element) {
      element.append(drawShadow(color, piece.id));
    }
  });
}

function handleRookNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  const neighbors = getHorizontalVerticalCells(x, y);
  neighbors.forEach((neighbor) => {
    const element = document.getElementById(`${neighbor.x},${neighbor.y}`);
    element.append(drawShadow(color, piece.id));
  });
}

function handleBishopNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  const neighbors = getDiagonalCells(x, y);
  neighbors.forEach((neighbor) => {
    const element = document.getElementById(`${neighbor.x},${neighbor.y}`);
    element.append(drawShadow(color, piece.id));
  });
}
function handleQueenNeighboringCells(x, y, piece) {
  const color = piece.id.split("_")[0];
  const neighbors = [
    ...getHorizontalVerticalCells(x, y),
    ...getDiagonalCells(x, y),
  ];

  neighbors.forEach((neighbor) => {
    const element = document.getElementById(`${neighbor.x},${neighbor.y}`);
    element.append(drawShadow(color, piece.id));
  });
}
squares = document.querySelectorAll(".square");
squares.forEach((square) => {
  square.addEventListener("dragover", (e) => {
    e.preventDefault();
    const current_piece = document.querySelector(".dragging");
    current_piece.style.display = "inherit";

    const color_piece = current_piece.id.split("_")[0];
    // keep color piece
    current_piece.style.color = color_piece;

    const rgba = getTransparentColorPiece(color_piece);

    current_piece.style.background = rgba;

    square.append(current_piece);
  });
  square.addEventListener("drop", (e) => {
    const piece = e.target;
    const piece_name = e.target.id.split("_")[1];
    let coords = e.originalTarget.parentElement.id.split(",");
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);

    if (piece_name == "king") {
      handleKingNeighboringCells(x, y, piece);
    } else if (piece_name == "pawn") {
      handlePawnNeighboringCells(x, y, piece);
    } else if (piece_name == "knight") {
      handleKnightNeighboringCells(x, y, piece);
    } else if (piece_name == "rook") {
      handleRookNeighboringCells(x, y, piece);
    } else if (piece_name == "bishop") {
      handleBishopNeighboringCells(x, y, piece);
    } else if (piece_name == "queen") {
      handleQueenNeighboringCells(x, y, piece);
    }
  });
});
