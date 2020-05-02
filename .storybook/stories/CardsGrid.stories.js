import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number } from '@storybook/addon-knobs'
import CardsGrid from './../../src/containers/CardsGrid'
import { getNewBoard, getSrcById } from './../../src/tests/utils'

export const Grid = () => (
  <CardsGrid
    board={ getNewBoard(number('Cards in row', 6), number('Cards in column', 5)) }
    getSrcById={ getSrcById }
    onMatch={ action('matched') }
    delay={ number('Delay', 800) }
    cardsInRow={ number('Cards in row', 6) }
    cardsInColumn={ number('Cards in column', 5) }
    width={ number('Width', 70) }
    height={ number('Height', 70) }
    cardMargin={ number('Margin', 0.6) }
  />
)

export default {
  title: 'Cards Grid',
  decorators: [withKnobs]
}