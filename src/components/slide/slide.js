import React from "react";
import PropTypes from "prop-types";
import "./slide.css";

const Slide = ({ style, children }) => {
  return (
    <div className="slide" style={style}>
      {children}
    </div>
  );
};

Slide.propTypes = {
  style: PropTypes.object,
  children: PropTypes.element,
};

export default Slide;
