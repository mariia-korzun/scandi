import React from 'react'
import './video.css'
const Video = ({video}) => {
    return (
        <video autoPlay playsInline muted loop className="video">
            <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
        </video >
    )
}

export default Video