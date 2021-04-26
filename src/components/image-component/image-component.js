import React from "react";
import PropTypes from "prop-types";
import "./image-component.css";

const ImageComponent = ({ data }) => {
  return <img src={data.imgURL} className="slide-img" />;
};

ImageComponent.propTypes = {
  data: PropTypes.shape({
    imgURL: PropTypes.string,
  }),
};

export default ImageComponent;
