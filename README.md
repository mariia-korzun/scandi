# Carousel 
Test assignment for Scandiweb 
_____________________________________

# Demo
See application at [demo](https://mariia-korzun.github.io/)
_____________________________________

# Clone repository
### `$ git clone https://github.com/mariia-korzun/mariia-korzun.github.io`
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

For clear demonstration of work with any HTML content was configured and mounted two Carousel components:

- ImageCarousel - carousel component configured with images content component using simulated API - Image Service.
- StarWarCarousel - carousel component configured with Star Wars character component using real API - Swapi Service.

Both components created by high-order-component withData which returns component with common loading data logic and a carousel with a specified content component.

Project was built by Webapck with manual configuration.
