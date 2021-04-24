import React from 'react'
import './person-component.css'

const PersonComponent = ({ data }) => {
    const img = data.getImgURL(data.id)

    return (
        <div className="person">
            <h3 className="person-name">{data.name}</h3>
            <div className="info-container">
                <div className="img-container">
                    <img src={img} className="person-img" alt='Character image' />
                </div>
                <div className="info-list">
                    <p>{`Gender: ${data.gender}`}</p>
                    <p>{`Birthday: ${data.birthYear}`}</p>
                    <p>{`Eye Color: ${data.eyeColor}`}</p>
                </div>
            </div>
        </div>
    )
}

export default PersonComponent