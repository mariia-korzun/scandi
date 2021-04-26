import Carousel from "../carousel";
import PersonComponent from "../person-component";
import withData from "../hoc-helper/with-data";
import SwapiService from "../../services/swapi-service";

const swapiService = new SwapiService();

const StarWarCarousel = withData(swapiService.getPeople)(
  Carousel,
  PersonComponent
);

export default StarWarCarousel;
