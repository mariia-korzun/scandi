import React from 'react'

import './change-slide-button.css'

const ChangeSlideButton = ({ onClick, text }) => {
    return (
        <button className="change-slide-button"
        onClick={onClick}>{text}</button>
    )
}

export default ChangeSlideButton