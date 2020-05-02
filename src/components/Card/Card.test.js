import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Card, { openStateEnum } from './'
import { getSrcById } from '../../tests/utils'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  src: getSrcById(0),
  index: 3,
  openState: openStateEnum.OPENED,
  style: { width: 100, height: 100 }
}

describe('Card', () => {

  describe('Render', () => {

    describe('Without props', () => {
      const wrapper = shallow(<Card/>)
      const card = wrapper.find('.card')

      it('should not fails to render without props', () => {
        expect(card).toHaveLength(1)
        const img = wrapper.find('img')
        expect(img).toHaveLength(1)
        expect(img.hasClass('card-image')).toBeTruthy()
      })

      it('should not be opened', () => {
        expect(card.hasClass('opened')).toBeFalsy()
      })

      it('should not be transparent', () => {
        expect(card.hasClass('transparent')).toBeFalsy()
      })
    })

    describe('With props', () => {
      const wrapper = shallow(<Card { ...props } />)
      const card = wrapper.find('.card')

      it('should not fails to render', () => {
        expect(card).toHaveLength(1)
        const img = wrapper.find('img')
        expect(img).toHaveLength(1)
        expect(img.hasClass('card-image')).toBeTruthy()
      })

      it('should be opened', () => {
        expect(card.hasClass('opened')).toBeTruthy()
      })

      it('should be transparent', () => {
        expect(card.hasClass('transparent')).toBeTruthy()
      })
    })
  })

  describe('User Interactions', () => {
    const wrapper = shallow(<Card { ...props } />)
    const mockFunc = jest.fn()
    wrapper.setProps({ onClick: mockFunc })

    it('should call mockFunc on click', () => {
      const card = wrapper.find('.card')
      card.simulate('click')
      expect(mockFunc).toHaveBeenCalledTimes(1)
      expect(mockFunc).toHaveBeenCalledWith(props.index)
    })
  })
})