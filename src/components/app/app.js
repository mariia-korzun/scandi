import React from 'react'

import ImageCarousel from '../image-carousel'
import StarWarCarousel from '../star-war-carousel'

import './app.css'

const App = () => {

    return (
        <div className="app">
            <ImageCarousel />
            <StarWarCarousel />
        </div>
    )
}

export default App