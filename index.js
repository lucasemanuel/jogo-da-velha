const X = 'X'
const O = 'O'
class Game {
  constructor () {
    this.playerX = X
    this.playerO = O
    this.current = this.initPlayer = [this.playerX, this.playerO][
      Math.floor(Math.random() * 2)
    ]

    this.cells = document.querySelectorAll('.board__cell')
    this.cells.forEach((element, index) => {
      element.addEventListener('click', e => {
        if (!this.isWinner()) this.handleClick(e, index)
      })
    })

    this.cellsWinner = []
    this.board = Array(9).fill(undefined)
    this.clearCells()
  }

  handleClick = async (e, index) => {
    this.board[index] = this.current
    this.updateCell(e, index)

    if (this.isWinner()) {
      this.setResult(this.current)
    } else if (this.isTied()) {
      this.setResult()
    } else {
      this.changePlayer()
    }
  }

  setResult = (winner = undefined) => {
    let timer = 1800
    if (winner) {
      const el = document.querySelector('.screen-winner__player')
      el.innerText = winner
      this.cellsWinner.forEach(value => {
        this.cells[value].classList.add('board__cell--winner')
      })
    } else {
      const el = document.querySelector('.screen-winner__title')
      el.innerText = 'EMPATE'
      timer = 500
    }

    setTimeout(() => {
      document
        .querySelector('.screen-winner')
        .classList.add('screen-winner--have-winner')
    }, timer)
  }

  updateCell = e => {
    if (e.target.innerText === '') {
      e.target.innerText = this.current
      e.target.classList.add(`board__cell--player${this.current}`)
    }
  }

  clearCells = () => this.cells.forEach(element => (element.innerText = ''))

  changePlayer = () => (this.current = this.current === X ? O : X)

  isTied = () => this.board.filter(value => value === undefined).length === 0

  isWinner = () => this.inColumns() || this.inRows() || this.inDiagonal()

  inColumns = () => {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i] !== undefined &&
        this.board[i] === this.board[i + 3] &&
        this.board[i + 3] === this.board[i + 6]
      ) {
        this.cellsWinner = [i, i + 3, i + 6]
        return true
      }
    }
  }

  inRows = () => {
    for (let i = 0; i < 9; i += 3) {
      if (
        this.board[i] !== undefined &&
        this.board[i] === this.board[i + 1] &&
        this.board[i + 1] === this.board[i + 2]
      ) {
        this.cellsWinner = [i, i + 1, i + 2]

        return true
      }
    }
  }

  inDiagonal = () => {
    if (
      this.board[4] !== undefined &&
      this.board[0] === this.board[4] &&
      this.board[4] === this.board[8]
    ) {
      this.cellsWinner = [0, 4, 8]
      return true
    } else if (
      this.board[4] !== undefined &&
      this.board[2] === this.board[4] &&
      this.board[4] === this.board[6]
    ) {
      this.cellsWinner = [2, 4, 6]
      return true
    }
  }
}

document
  .querySelector('.screen-winner__reset')
  .addEventListener('click', () => {
    document.location.reload()
  })
const game = new Game()

const date = new Date()
const year = date.getFullYear()
document.querySelector('span.year').innerText = year
