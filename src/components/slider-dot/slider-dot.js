import React from 'react'
import './slider-dot.css'

const SliderDot = ({ data, onChange, currentSlideIndex }) => {
    return (
        <form className="slider-dot">
            {data.map((item, index) => {
                let checked = currentSlideIndex === index
                return (
                    <input type="radio" key={index} checked={checked}
                        onChange={() => { onChange(index) }} />
                )
            })}
        </form>
    )
}

export default SliderDot