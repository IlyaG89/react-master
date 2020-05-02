import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import CardsGrid from '../../../src/containers/CardsGrid'
import { getNewBoard, getSrcById } from '../../../src/tests/utils'

export const AllProps = () => (
  <CardsGrid
    board={ getNewBoard(number('Cards in row', 6), number('Cards in column', 5)) }
    getSrcById={ getSrcById }
    onMatch={ action('matched') }
    delay={ number('Delay', 800) }
    cardsInRow={ number('Cards in row', 6) }
    cardsInColumn={ number('Cards in column', 5) }
    style={ { width: text('Width', '50vw'), height: text('Height', '30vw') } }
    cardMargin={ number('Margin', 0.6) }
  />
)

export default {
  title: 'Cards Grid',
  decorators: [withKnobs]
}