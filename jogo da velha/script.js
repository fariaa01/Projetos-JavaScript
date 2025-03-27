document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');
  const container = document.getElementById('container');
  const twoPlayerBtn = document.getElementById('2-player');
  const aiPlayerBtn = document.getElementById('ai-player');
  const messageBox = document.getElementById('message');
  const scoreXElem = document.getElementById('scoreboar-1');
  const scoreOElem = document.getElementById('scoreboar-2');
  const nameXElem = document.getElementById('x-scoreboard');
  const nameOElem = document.getElementById('o-scoreboard');

  let board = Array(9).fill('');
  let currentPlayer = 'X';
  let gameMode = null;
  let difficulty = 'Fácil';
  let gameOver = false;
  let scoreX = 0, scoreO = 0;
  let playerXName = "Jogador X", playerOName = "IA";

  function choosePlayerNames() {
    playerXName = prompt("Digite o nome do Jogador X:", "Jogador 1") || "Jogador X";
    playerOName = prompt("Digite o nome do Jogador O:", "Jogador 2") || "Jogador O";
    nameXElem.textContent = playerXName;
    nameOElem.textContent = playerOName;
  }

  function chooseDifficulty() {
    const level = prompt("Escolha a dificuldade: Fácil, Médio ou Difícil", "Fácil");
    if (["Fácil", "Médio", "Difícil"].includes(level)) {
      difficulty = level;
    } else {
      difficulty = "Fácil";
    }
  }

  function restartGame() {
    board.fill('');
    currentPlayer = 'X';
    gameOver = false;
    boxes.forEach(box => {
      box.innerHTML = '';
      box.classList.remove('disabled');
    });
    messageBox.classList.add('hide');
  }

  function startGame(mode) {
    gameMode = mode;
    restartGame();
    container.classList.remove('hide');
  }

  function showMessage(msg) {
    messageBox.querySelector('p').textContent = msg;
    messageBox.classList.remove('hide');
    setTimeout(restartGame, 2000);
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => condition.every(index => board[index] === player));
  }

  function checkDraw() {
    return board.every(cell => cell !== '');
  }

  function updateScore(player) {
    if (player === 'X') {
      scoreX++;
      scoreXElem.textContent = scoreX;
    } else {
      scoreO++;
      scoreOElem.textContent = scoreO;
    }
  }

  function handleMove(index, element) {
    if (board[index] !== '' || gameOver) return;
    board[index] = currentPlayer;
    element.innerHTML = `<span class="${currentPlayer === 'X' ? 'x' : 'o'}">${currentPlayer}</span>`;
    element.classList.add('disabled');

    if (checkWin(currentPlayer)) {
      gameOver = true;
      updateScore(currentPlayer);
      showMessage(`Jogador ${currentPlayer === 'X' ? playerXName : playerOName} venceu!`);
      return;
    } else if (checkDraw()) {
      gameOver = true;
      showMessage('Empate!');
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'AI' && currentPlayer === 'O' && !gameOver) {
      aiTurn();
    }
  }

  function aiTurn() {
    let index;
    if (difficulty === 'Fácil') {
      index = aiRandomMove();
    } else if (difficulty === 'Médio') {
      index = aiSmartMove() || aiRandomMove();
    } else {
      index = aiBestMove();
    }
    if (index !== null) {
      const box = document.getElementById(`block-${index + 1}`);
      setTimeout(() => handleMove(index, box), 500);
    }
  }

  function aiRandomMove() {
    const emptyIndices = board.map((val, i) => (val === '' ? i : null)).filter(i => i !== null);
    return emptyIndices.length > 0 ? emptyIndices[Math.floor(Math.random() * emptyIndices.length)] : null;
  }

  function aiSmartMove() {
    for (const player of ['O', 'X']) {
      for (let [a, b, c] of [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]) {
        const line = [board[a], board[b], board[c]];
        if (line.filter(v => v === player).length === 2 && line.includes('')) {
          return [a, b, c].find(i => board[i] === '');
        }
      }
    }
    return null;
  }

  function aiBestMove() {
    const minimax = (newBoard, player) => {
      const empty = newBoard.map((val, i) => (val === '' ? i : null)).filter(i => i !== null);

      if (checkWin('O')) return { score: 10 };
      if (checkWin('X')) return { score: -10 };
      if (empty.length === 0) return { score: 0 };

      let moves = [];
      for (let i of empty) {
        let move = { index: i };
        newBoard[i] = player;
        move.score = player === 'O' ? minimax(newBoard, 'X').score : minimax(newBoard, 'O').score;
        newBoard[i] = '';
        moves.push(move);
      }

      return moves.reduce((best, move) => {
        if ((player === 'O' && move.score > best.score) || (player === 'X' && move.score < best.score)) {
          return move;
        }
        return best;
      }, { score: player === 'O' ? -Infinity : Infinity });
    };

    return minimax([...board], 'O').index;
  }

  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      if (gameOver) return;
      if (gameMode === 'AI' && currentPlayer !== 'X') return;
      handleMove(index, box);
    });
  });

  twoPlayerBtn.addEventListener('click', () => {
    choosePlayerNames();
    startGame('2P');
  });

  aiPlayerBtn.addEventListener('click', () => {
    chooseDifficulty();
    startGame('AI');
  });
});
