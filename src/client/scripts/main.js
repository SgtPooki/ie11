/**
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var Carousel = require('./carousel.js');

var mainCarousel = new Carousel({
    parentSelector: '.js-outerCarousel',
    itemSelector: '.carousel-item'
});
