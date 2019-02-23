module.exports = function solveSudoku(matrix) {
  function isSafe(sudoku, row, col, n) {
    for (let c = 0; c < sudoku.length; c++) {
      if (sudoku[row][c] === n) {
        return false;
      }
    }

    for (let r = 0; r < sudoku.length; r++) {
      if (sudoku[r][col] === n) {
        return false;
      }
    }

    const gridRow = row - (row % 3);
    const gridCol = col - (col % 3);

    for (let r = gridRow; r < gridRow + 3; r++) {
      for (let c = gridCol; c < gridCol + 3; c++) {
        if (sudoku[r][c] === n) {
          return false;
        }
      }
    }
    return true;
  }

  function solver(sudoku) {
    let empty = true;
    let row = 0;
    let col = 0;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudoku[r][c] === 0) {
          empty = false;
          row = r;
          col = c;
          break;
        }
      }
      if (!empty) break;
    }

    if (empty) return true;

    for (let n = 1; n <= 9; n++) {
      if (isSafe(sudoku, row, col, n)) {
        sudoku[row][col] = n;
        if (solver(sudoku)) {
          return true;
        }
        sudoku[row][col] = 0;
      }
    }
    return false;
  }

  if (solver(matrix)) {
    return matrix;
  }
};
