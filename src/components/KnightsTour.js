import { useState } from 'react';
const VISITED = 'VISITED';
const CURRENT = 'CURRENT';
const UNVISITABLE = 'UNVISITABLE';
const VISITABLE = 'VISITABLE'
const VISITABLE1 = 'VISITABLE1'
const INITIAL_BOARD_SIZE = 8;
const INITIAL_BOARD =
  [[VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE],
  [VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1],
  [VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE],
  [VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1],
  [VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE],
  [VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1],
  [VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE],
  [VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1, VISITABLE, VISITABLE1]];


function KnightsTour() {

  const [boardSize, setBoardSize] = useState(INITIAL_BOARD_SIZE);
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);
  const [board, setBoard] = useState(INITIAL_BOARD);

  const isValid = (r, c) => {
    return r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] !== VISITED;
  }

  const resetBoard = (newBoardSize) => {
    setBoardSize(newBoardSize);
    setRow(null);
    setCol(null);
    const newBoard = [];
    for (let i = 0; i < newBoardSize; i++) {
      newBoard.push([]);
      for (let j = 0; j < newBoardSize; j++) {
        newBoard[i].push(VISITABLE);
      }
    }
    setBoard(newBoard);
  }

  const successorFunction = (r, c) => {
    const possibleMoves = [];
    if (isValid(r + 2, c + 1)) possibleMoves.push([r + 2, c + 1]);
    if (isValid(r - 2, c - 1)) possibleMoves.push([r - 2, c - 1]);
    if (isValid(r - 2, c + 1)) possibleMoves.push([r - 2, c + 1]);
    if (isValid(r + 2, c - 1)) possibleMoves.push([r + 2, c - 1]);
    if (isValid(r + 1, c + 2)) possibleMoves.push([r + 1, c + 2]);
    if (isValid(r - 1, c - 2)) possibleMoves.push([r - 1, c - 2]);
    if (isValid(r + 1, c - 2)) possibleMoves.push([r + 1, c - 2]);
    if (isValid(r - 1, c + 2)) possibleMoves.push([r - 1, c + 2]);
    return possibleMoves;
  }

  const applySuccessors = (successors) => {
    // remove previous successors
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === VISITABLE || board[i][j] === VISITABLE1) {
          board[i][j] = UNVISITABLE
        }
      }
    }
    // add new successors to board
    successors.forEach(successor => {
      board[successor[0]][successor[1]] = VISITABLE;
      console.log(board)
    });
  }

  const makeMove = (r, c) => {
    let successorss 
    if (board[r][c] === VISITABLE || board[r][c] === VISITABLE1) {
      if (row != null && col != null)
        board[row][col] = VISITED;
      board[r][c] = CURRENT;
      const successors = successorFunction(r, c);
      console.log(successors);
      applySuccessors(successors);
      setRow(r);
      setCol(c);
      setTimeout(successorss = successors(Math.floor(Math.random* successorFunction(r,c))), 1000)
      makeMove(successorss())
    }
  }

  return (
    <div>
      <br />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          border: '1px black solid',
          gap: 0,
        }}
      >
        {
          board.map((row, i) => {
            return row.map((state, j) => {
              let key = `${i}${j}`;
              let style = {
                paddingTop: '100%',
                margin: 0,
                border: '1px black solid',
              };
              if (state === VISITABLE) style.backgroundColor = '#779556';
              if (state === VISITABLE1) style.backgroundColor = ' #ebecd0';
              if (state === UNVISITABLE) style.backgroundColor = 'white';
              if (state === CURRENT) style.backgroundColor = 'PINK';
              if (state === CURRENT) style.backgroundImage = "url('/assets/knight_b.png')";
              if (state === CURRENT) style.backgroundRepeat = "no-repeat";
              if (state === CURRENT) style.backgroundPosition = "center center";
              if (state === VISITED) style.backgroundColor = 'grey';
              return (
                <div
                  key={key}
                  style={style}
                  onClick={() => makeMove(i, j)}>
                </div>
              )
            })
          })
        }
      </div>

  
     

    </div>
  );
}

export default KnightsTour;