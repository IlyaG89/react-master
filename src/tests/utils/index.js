import { NUMBER_OF_INDEXES, MIX_FACTOR } from './constans'

const getArrayOfAllIndexes = () => {
  const allIndexes = []
  let i = 0
  // eslint-disable-next-line no-empty
  while (allIndexes.push(i++) < NUMBER_OF_INDEXES) {}
  return allIndexes
}

const getRandomIndexes = (width, height) => {
  const randomIndexes = []
  const allIndexes = getArrayOfAllIndexes()
  let indexesToGet = width * height / 2
  while (indexesToGet--) {
    const randomIndex = allIndexes.splice(Math.floor(Math.random() * allIndexes.length), 1)[0]
    randomIndexes.push(randomIndex, randomIndex)
  }
  return randomIndexes
}

const randomSwap = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const randomIndex2 = Math.floor(Math.random() * arr.length)
  const tmp = arr[randomIndex]
  arr[randomIndex] = arr[randomIndex2]
  arr[randomIndex2] = tmp
}

export const getNewBoard = (width, height) => {
  const newBoard = getRandomIndexes(width, height)
  let numberOfMixes = width * height * MIX_FACTOR
  while (numberOfMixes--) {
    randomSwap(newBoard)
  }
  return newBoard
}

export const getSrcById = id => `https://www.memozor.com/jeux/jquery/objects_diy/image${id}.jpg`