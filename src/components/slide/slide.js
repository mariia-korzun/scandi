import React from 'react'
import './slide.css'

const Slide = ({ style, children }) => {
    return (
        <div className="slide" style={style} >
            {children}
        </div>
    )
}

export default Slide