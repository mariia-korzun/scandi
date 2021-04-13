import React from 'react'

import './image-component.css'

const ImageComponent = ({data}) => {
    return (
        <img src={data.imgURL} className="slide-img" />
    )
}

export default ImageComponent