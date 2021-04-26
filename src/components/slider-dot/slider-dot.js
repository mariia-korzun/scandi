import React from "react";
import PropTypes from "prop-types";
import "./slider-dot.css";

const SliderDot = ({ data, onChange, currentSlideIndex }) => {
  return (
    <form className="slider-dot">
      {data.map((item, index) => {
        let checked = currentSlideIndex === index;
        return (
          <input
            type="radio"
            key={index}
            checked={checked}
            onChange={() => {
              onChange(index);
            }}
          />
        );
      })}
    </form>
  );
};

SliderDot.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  currentSlideIndex: PropTypes.number,
};

export default SliderDot;
