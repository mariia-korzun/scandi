import React from "react";
import PropTypes from "prop-types";
import "./video.css";

const Video = ({ video }) => {
  return (
    <video autoPlay playsInline muted loop className="video">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

Video.propTypes = {
  video: PropTypes.string,
};

export default Video;
