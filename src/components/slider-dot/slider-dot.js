import React from 'react'

import './slider-dot.css'

const SliderDot = ({ data, onChange, sliderDotIndex }) => {

    return (
        <form className="slider-dot">

            {data.map((item, index) => {
                let checked = sliderDotIndex === index
                return (
                    <input type="radio" key={item.id} checked={checked}
                        onChange={() => { onChange(index) }} />
                )
            }
            )}

        </form>

    )
}

export default SliderDot