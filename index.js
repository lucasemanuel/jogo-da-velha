class Game {
  constructor() {
    this.player1 = 'X'
    this.player2 = 'O'
    this.player = [this.player1, this.player2][Math.floor(Math.random() * 2)]

    this.cells = document.querySelectorAll('div.cell')
    this.cells.forEach(element => {
      element.addEventListener('click', this.updateGame)
    })

    this.hasWinner = false
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
    if (this.hasWinner === true)
      return

    this.fillCell(e)

    if (this.existWinner()) {
      this.hasWinner = true
      const el = document.querySelector('div.winner')
      el.children[0].innerText = `Vencedor da partida é o "${this.player}"`
      el.style.display = 'flex'
    }

    this.changePlayer()
  }

  existWinner = () => {
    return this.verityColumns() || this.verityRows() || this.verityDiagonal()
  }

  verityColumns = () => {
    for (let i = 0; i < 3; i++) {
      if (this.board[0 + i] !== undefined 
        && this.board[0 + i] === this.board[3 + i]
        && this.board[3 + i] === this.board[6 + i]) {
        return true
      }
    }
  }

  verityRows = () => {
    for (let i = 0; i < 9; i += 3) {
      if (this.board[0 + i] !== undefined 
        && this.board[0 + i] === this.board[1 + i]
        && this.board[1 + i] === this.board[2 + i]) {
        return true
      }
    }
  }

  verityDiagonal = () => {
    return this.board[4] !== undefined
      && ((this.board[0] === this.board[4] && this.board[4] === this.board[8])
      || (this.board[2] === this.board[4] && this.board[4] === this.board[6]))
  }
}

const game = new Game()

document.querySelectorAll('.reset').forEach(el => {
  el.addEventListener('click', e => {
    game.clearCells()
    game.player = [game.player1, game.player2][Math.floor(Math.random() * 2)]
    game.hasWinner = false
    game.board = []
  
    const el = document.querySelector('div.winner');
    el.children[0].innerText = ''
    el.style.display = 'none'
  })
})
