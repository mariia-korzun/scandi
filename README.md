# Carousel 
Test assignment for Scandiweb 
_____________________________________

# Demo
See application at [demo](https://mariia-korzun.github.io/scandi/)
_____________________________________

# Clone repository
### `$ git clone git@github.com:mariia-korzun/scandi.git`
_____________________________________

# Available Scripts

### `npm start`

Starts the development server.

### `npm run build`

Bundles the app into static files for production.
_____________________________________

# Summary
Created Carousel component provide the following features

required:
- works for mobile and desktop devices 
- supports regular swipes and finger-following swipes
- works for any HTML content
- is animated

considered as advantages:
- supports multiple slides on the screen
- supports infinite option
- supports scrolling to a selected slide

performance optimizations:
- Carousel component always uses only 3 div elements (slides) to prevent situations of lots div elements on page. Used divs synchronously change their positions and display corresponding data. 

Carousel component capable to accept either component which elements will be displayed in carousel (one type of slides per carousel) or array of React elements (opportunity having multiple types of slides per carousel)

For a clear demonstration of work with any HTML content was configured and mounted three Carousel components:

- ImageCarousel - carousel component configured with images content component using simulated API - Image Service.
- StarWarCarousel - carousel component configured with Star Wars character component using real API - Swapi Service.

    Both components created by high-order-component withData which returns component with common loading data logic and a carousel with a specified content component.

- Carousel with an array of React elements passed as props - carousel component display received elements.


The project was built by Webapck with manual configuration.
