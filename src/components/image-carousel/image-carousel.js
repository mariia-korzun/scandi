import Carousel from '../carousel'
import ImageComponent from '../image-component'
import withData from '../hoc-helper/with-data'
import ImageService from '../../services/image-service'

const imageService = new ImageService()

 const ImageCarousel =  withData(imageService.getImages)(Carousel, ImageComponent)

 export default ImageCarousel
