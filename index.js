class Game {
  constructor() {
    this.player1 = 'X'
    this.player2 = 'O'
    this.player = [this.player1, this.player2][Math.floor(Math.random() * 2)]

    this.cells = document.querySelectorAll('div.cell')
    this.cells.forEach(element => {
      element.addEventListener('click', this.updateGame)
    })

    this.board = []
    this.clearCells()
  }

  clearCells = () => {
    this.cells.forEach(element => element.innerText = '')
  }

  fillCell = e => {
    if (e.target.innerText === '') {
      e.target.innerText = this.player

      const id = e.target.id.substr(-1, 1) 
      this.board[id - 1] = this.player
    }
  }

  changePlayer = () => {
    this.player = this.player === 'X' ? 'O' : 'X'
  }

  updateGame = e => {
    this.fillCell(e)
    this.changePlayer()
    
    if(this.existWinner() || this.verityRows() || this.verityDiagonal()) alert('winnner')
  }

  existWinner = () => {
    return this.verityColumns()
  }

  verityColumns = () => {
    let column = 0

    while (column < 3) {
      if (this.board[0 + column] !== undefined 
        && this.board[0 + column] === this.board[3 + column]
        && this.board[3 + column] === this.board[6 + column]) {
        return true
      }

      column++
    }
  }

  verityRows = () => {
    let column = 0

    while (column < 9) {
      if (this.board[0 + column] !== undefined 
        && this.board[0 + column] === this.board[1 + column]
        && this.board[1 + column] === this.board[2 + column]) {
        return true
      }

      column += 3
    }
  }

  verityDiagonal = () => {
    return this.board[4] !== undefined
      && ((this.board[0] === this.board[4] && this.board[4] === this.board[8])
      || (this.board[2] === this.board[4] && this.board[4] === this.board[6]))
  }
}

new Game()