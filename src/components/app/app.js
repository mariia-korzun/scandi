import React, { Component } from 'react'

import Carousel from '../carousel'
import './app.css'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            data: null,
            loading: true
        }
    }

    componentDidMount() {
        this.props.imageSevice.fetchCarouselData()
            .then(data => {
                this.setState({
                    data,
                    loading: false
                })
            })
    }

    render() {
        const { loading, data } = this.state
        if (loading) { return (<div>Loading images...</div>) }
        return <Carousel data={data} />
    }
}