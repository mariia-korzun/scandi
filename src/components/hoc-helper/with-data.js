import React, { Component } from 'react'
import LoadingIndicator from '../loading-indicator'

const withData = (fetch) => (Wrapped, contentComponent) => {
    return class extends Component {
        constructor() {
            super()
            this.state = {
                data: null,
                loading: true
            }
        }
        
        componentDidMount() {
            fetch()
                .then(data => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
        }

        render() {
            const { loading, data } = this.state
            if (loading) { return (<LoadingIndicator />) }
            return <Wrapped data={data} contentComponent={contentComponent} />
        }
    }
}

export default withData