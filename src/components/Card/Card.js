import React, { memo } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { openStateEnum } from './enums'
import './Card.scss'

const Card = ({ src, index, openState, style, onClick }) =>
  <div className={ classNames('card', { opened: !!openState, transparent: openState === openStateEnum.OPENED }) }
    style={ style }
    onClick={ () => onClick(index) }>
    <img src={ src } className='card-image' alt={ 'card' } />
  </div>

Card.defaultProps = {
  onClick: e => e
}

Card.propTypes = {
  id: propTypes.any,
  index: propTypes.number,
  openState: propTypes.number,
  style: propTypes.object,
  onClick: propTypes.func
}

export default memo(Card)
