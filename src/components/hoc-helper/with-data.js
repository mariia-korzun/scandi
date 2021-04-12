import React, { Component } from 'react'
import LoadingIndicator from '../../'


const withData = (Wrapped) => {
    return class extends Component {
        constructor() {
            super()
            this.state = {
                data: null,
                loading: true
            }
        }

        componentDidMount() {
            this.props.fetch()
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
            return <Wrapped data={data} />
        }
    }
}

export default withData