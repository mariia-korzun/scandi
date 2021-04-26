import React from "react";
import PropTypes from "prop-types";
import "./change-slide-button.css";
import left from "../../../public/images/left-arrow-icon.svg";
import right from "../../../public/images/right-arrow-icon.svg";

const ChangeSlideButton = ({ onClick, isRight, disabled }) => {
  const img = isRight ? right : left;
  const width = 35;
  const imgStyle = {
    width: `${width}px`,
  };
  const style = {
    left: isRight ? `100%` : `${-width}px`,
  };
  return (
    <button
      disabled={disabled}
      className="change-slide-button"
      style={style}
      onClick={onClick}
    >
      <img style={imgStyle} src={img} alt="Arrow" />
    </button>
  );
};

ChangeSlideButton.propTypes = {
  onClick: PropTypes.func,
  isRight: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ChangeSlideButton;
