import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import ImageService from './services/image-service'
import SwapiService from './services/swapi-service'

const swapiService = new SwapiService()
const imageSevice = new ImageService()

ReactDOM.render(
    <App swapiService={swapiService} imageSevice={imageSevice} />
    , document.getElementById('root'))

