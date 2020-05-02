import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CardsGrid from './'
import Card, { openStateEnum } from '../../components/Card'
import { getSrcById, getNewBoard } from '../../tests/utils'
import { WIDTH, HEIGHT, DELAY } from '../../tests/utils/constans'

Enzyme.configure({ adapter: new Adapter() })

// eslint-disable-next-line no-console
const consoleError = console.error

jest.useFakeTimers()
jest.spyOn(console, 'error').mockImplementation((...args) => {
  if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
    consoleError(...args)
  }
})

const props = {
  board: getNewBoard(WIDTH, HEIGHT),
  getSrcById,
  delay: DELAY,
  cardsInRow: WIDTH,
  cardsInColumn: HEIGHT
}

describe('CardsGrid', () => {

  describe('Render', () => {

    describe('Without props', () => {
      const wrapper = shallow(<CardsGrid />)

      it('should not fails to render without props', () => {
        expect(wrapper.find('.card-grid')).toHaveLength(1)
      })

      it('should not render cards', () => {
        expect(wrapper.find(Card)).toHaveLength(0)
      })
    })

    describe('With props', () => {
      const wrapper = shallow(<CardsGrid { ...props } />)
      const cards = wrapper.find(Card)

      it('should not fails to render', () => {
        expect(wrapper.find('.card-grid')).toHaveLength(1)
      })

      it('should not render cards', () => {
        expect(cards).toHaveLength(HEIGHT * WIDTH)
      })

      it('all cards should be closed', () => {
        cards.forEach(card => {
          expect(card.props().openState).toBe(openStateEnum.CLOSED)
        })
      })
    })
  })

  describe('User Interactions', () => {
    const wrapper = mount(<CardsGrid { ...props } />)

    afterAll(() => {
      wrapper.unmount()
    })

    const mockFunc = jest.fn()
    wrapper.setProps({ onMatch: mockFunc })

    const cards = wrapper.find(Card)
    const firstCard = cards.at(0)
    const { src: firstSrc } = firstCard.props()

    let indexOfMatch
    let indexOfMismatch

    cards.forEach(card => {
      const { src, index } = card.props()
      if (firstSrc === src) {
        indexOfMatch = index
      } else {
        indexOfMismatch = index
      }
    })

    describe('on cards click', () => {
      it('should temporary open first card on click', () => {
        firstCard.simulate('click')
        wrapper.update()
        expect(wrapper.find(Card).at(0).props().openState).toBe(openStateEnum.TMP_OPENED)
      })


      it('should temporary open a mismatched card on click', () => {
        cards.at(indexOfMismatch).simulate('click')
        wrapper.update()
        expect(wrapper.find(Card).at(indexOfMismatch).props().openState).toBe(openStateEnum.TMP_OPENED)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), DELAY)
      })

      it('should close cards after delay', () => {
        jest.runAllTimers()
        wrapper.update()
        expect(wrapper.find(Card).at(0).props().openState).toBe(openStateEnum.CLOSED)
        expect(wrapper.find(Card).at(indexOfMismatch).props().openState).toBe(openStateEnum.CLOSED)
      })

      it('should open matched cards after delay', () => {
        const cards = wrapper.find(Card)
        cards.at(0).simulate('click')
        cards.at(indexOfMatch).simulate('click')
        jest.runAllTimers()
        wrapper.update()
        expect(wrapper.find(Card).at(0).props().openState).toBe(openStateEnum.OPENED)
        expect(wrapper.find(Card).at(indexOfMatch).props().openState).toBe(openStateEnum.OPENED)
      })
    })
  })
})