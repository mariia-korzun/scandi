import React from 'react'

import './slide.css'

const Slide = ({ style, slideData:data, children }) => {
    // console.log(data)
    return (
        <div className="slide" style={style} >
            {React.cloneElement(children, { data: data })}
        </div>
    )
}

export default Slide