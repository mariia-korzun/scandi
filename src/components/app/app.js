import React from "react";
import ImageCarousel from "../image-carousel";
import StarWarCarousel from "../star-war-carousel";
import staticData from "../../static-data/static-data";
import Carousel from "../carousel";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      <ImageCarousel />
      <StarWarCarousel />
      <Carousel arrayOfElements={staticData} />
    </div>
  );
};

export default App;
