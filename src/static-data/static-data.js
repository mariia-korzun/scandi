import React from "react";
import ImageComponent from "../components/image-component";
import image_1 from "../../public/images/man-and-dog.jpg";
import image_2 from "../../public/images/mountain.jpg";
import image_3 from "../../public/images/forest.jpg";
import Video from "../components/video";
import video_1 from "../../public/video/cat.mp4";
import video_2 from "../../public/video/night-sky.mp4";
import video_3 from "../../public/video/owl.mp4";

const data = [
  <Video video={video_1} key={1} />,
  <ImageComponent data={{ imgURL: image_1 }} key={2} />,
  <Video video={video_2} key={3} />,
  <ImageComponent data={{ imgURL: image_2 }} key={4} />,
  <Video video={video_3} key={5} />,
  <ImageComponent data={{ imgURL: image_3 }} key={6} />,
];

export default data;
