import React from 'react'

import './change-slide-button.css'
import left from '../../../public/images/left-arrow-icon.jpeg'
import right from '../../../public/images/right-arrow-icon.jpeg'


const ChangeSlideButton = ({ onClick, isRight, disabled }) => {
    const img = isRight ? right : left
    const width = 50
    const imgStyle = {
        width: `${width}px`
    }
    const style = {
        left: isRight ? `100%` : '-50px',
    }
    return (
        <button disabled={disabled}
            className="change-slide-button"
            style={style}
            onClick={onClick}>
            <img style={imgStyle } src={img} alt="Arrow" />
        </button>
    )
}

export default ChangeSlideButton