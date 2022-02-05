const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'CHECK',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '<=',
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div')
  rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div')
    tileElement.setAttribute(
      'id',
      'guessRow-' + guessRowIndex + '-tile-' + guessIndex
    )
    tileElement.classList.add('tile')
    rowElement.append(tileElement)
  })
  tileDisplay.append(rowElement)
})

keys.forEach((key) => {
  const buttonElement = document.createElement('button')
  buttonElement.textContent = key
  buttonElement.setAttribute('id', key)
  buttonElement.addEventListener('click', (e) => handleClick(key))
  keyboard.append(buttonElement)
})

const handleClick = (key) => {
  if (key === '<=') {
    deleteLetter()
    return
  }
  if (key === 'CHECK') {
    checkRow()
    return
  }
  addLetter(key)
}

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    )
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
  }
}

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById(
      `guessRow-${currentRow}-tile-${currentTile}`
    )
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
  }
}

const checkRow = () => {
  const guess = guessRows[currentRow].join('')
  flipTile()
  if (currentTile > 4) {
    if (wordle === guess) {
      showMessage('Awesome!!!')
      isGameOver = true
      return
    } else {
      if (currentRow >= 5) {
        isGameOver = true
        showMessage('Game Over')
        return
      }
      if (currentRow < 5) {
        currentRow++
        currentTile = 0
      }
    }
  }
}

const showMessage = (message) => {
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  messageDisplay.append(messageElement)
  setTimeout(() => {
    messageDisplay.removeChild(messageElement)
  }, 3000)
}

const addColorToKey = (keyLetter, className) => {
  const key = document.getElementById(keyLetter)
  key.classList.add(className)
}

const flipTile = () => {
  const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes
  let checkWordle = wordle
  const guess = []

  rowTiles.forEach((title) => {
    guess.push({ letter: title.getAttribute('data'), color: 'grey-overlay' })
  })

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = 'green-overlay'
      checkWordle.replace(guess.letter, '')
    }
  })

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = 'green-overlay'
      checkWordle.replace(guess.letter, '')
    }
  })
  console.log(checkWordle)
  console.log(guess)
  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip')
      tile.classList.add(guess[index].color)
      addColorToKey(guess[index].letter, guess[index].color)
    }, 500 * index)
  })
}

// const dataLetter = tile.getAttribute('data')
// tile.classList.add('flip')
// if (dataLetter == wordle[index]) {
// 	tile.classList.add('green-overlay')
// 	addColorToKey(dataLetter, 'green-overlay')
// } else if (wordle.includes(dataLetter)) {
// 	tile.classList.add('yellow-overlay')
// 	addColorToKey(dataLetter, 'yellow-overlay')
// } else {
// 	tile.classList.add('grey-overlay')
// 	addColorToKey(dataLetter, 'grey-overlay')
// }
