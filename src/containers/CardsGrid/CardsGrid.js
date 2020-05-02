import React, { memo, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import Card, { openStateEnum } from '../../components/Card'
import './CardsGrid.scss'

const initiateOpenStates = length => new Array(length).fill(openStateEnum.CLOSED)

const CardGrid = ({ board, getSrcById, onMatch, delay, cardsInRow, cardsInColumn, width, height, cardMargin }) => {
  const [openStates, setOpenStates] = useState(initiateOpenStates(board.length))

  const tmpOpened = openStates.reduce((acc, openState, i) => {
    if (openState === openStateEnum.TMP_OPENED) {
      acc.push(i)
    }
    return acc
  }, [])

  useEffect(() => setOpenStates(initiateOpenStates(board.length)), [board])
  useEffect(() => {
    if (tmpOpened.length === 2) {
      setTimeout(() => defineStateOfTmpOpened(), delay)
    }
  })

  const defineStateOfTmpOpened = () => {
    const newOpenState = board[tmpOpened[0]] === board[tmpOpened[1]] ? openStateEnum.OPENED : openStateEnum.CLOSED
    setOpenStates(openStates.map((openState, i) => tmpOpened.includes(i) ? newOpenState : openState))
    if (newOpenState === openStateEnum.OPENED) {
      onMatch()
    }
  }

  const onCardClick = index => {
    if (openStates[index] || tmpOpened.length === 2) {
      return
    }
    setOpenStates(openStates.map((openState, i) => i === index ? openStateEnum.TMP_OPENED : openState))
  }

  const getCardStyle = () => {
    const margin = cardMargin
    const cardWidth = 100 / cardsInRow - margin + '%'
    const cardHeight = 100 / cardsInColumn - margin + '%'
    return { width: cardWidth, height: cardHeight }
  }

  const cardStyle = getCardStyle()

  return (
    <div className='card-grid' style={ { width: width + 'vw', height: height + 'vh' } } >
      { board.map((id, i) =>
        <Card
          src={ getSrcById(id) }
          index={ i }
          openState={ openStates[i] }
          style={ cardStyle }
          onClick={ onCardClick }
          key={ `${ id }_${ i }` }
        />) }
    </div>
  )
}

CardGrid.defaultProps = {
  board: [],
  getSrcById: () => '',
  onMatch: e => e,
  delay: 800,
  cardsInRow: 1,
  cardsInColumn: 1,
  width: 1000,
  height: 500,
  cardMargin: 1
}

CardGrid.propTypes = {
  board: propTypes.array,
  getSrcById: propTypes.func,
  onMatch: propTypes.func,
  delay: propTypes.number,
  cardsInRow: propTypes.number,
  cardsInColumn: propTypes.number,
  width: propTypes.number,
  height: propTypes.number,
  cardMargin: propTypes.number
}

export default memo(CardGrid)