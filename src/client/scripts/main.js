/**
 * The project gulpfile.js
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

require('./vendor/mousetrap.min');

var $photoSets = $('.carousel.carousel_horizontal > .carouselItem');
var $activeSet = $photoSets.filter('.active');
var activeIndex = $photoSets.index($activeSet);

var setActiveIndex = function setActiveIndex(delta) {
    activeIndex = activeIndex + delta;

    if (activeIndex < 0) {
        activeIndex = activeIndex + $photoSets.length;
    } else if (activeIndex >= $photoSets.length) {
        activeIndex = activeIndex - $photoSets.length;
    }
};

Mousetrap.bind('left', function () {
    var $oldActiveSet = $activeSet;
    var $newActiveSet;

    setActiveIndex(-1);

    $newActiveSet = $photoSets.eq(activeIndex);

    $newActiveSet.show();
    $oldActiveSet.hide();

    $activeSet = $newActiveSet;
});
Mousetrap.bind('right', function () {
    var $oldActiveSet = $activeSet;
    var $newActiveSet;

    setActiveIndex(1);

    $newActiveSet = $photoSets.eq(activeIndex);

    $newActiveSet.show();
    $oldActiveSet.hide();

    $activeSet = $newActiveSet;
});

Mousetrap.bind('up', function () {
    console.log('up');
});
Mousetrap.bind('down', function () {
    console.log('down');
});
