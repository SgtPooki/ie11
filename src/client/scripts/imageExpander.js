
(function($) {
    'use strict';

    var $window = $(window);
    var $body = $(document.body);
    var marginSize = 80;
    var $overlay = $('<div />')
        .css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            'background-color': '#000000',
            opacity: 0.5
        })
        .hide();

    $body.append($overlay);

    $.fn.ImageExpander = function ImageExpander() {
        return this.each(function (index, element) {
            var $element = $(element);
            var $img = $element.find('img');

            $element.on('click', function () {
                var $expandedImg = $img.clone();

                $overlay.show();

                $overlay.on('click', function () {
                    $expandedImg.remove();
                    $overlay.hide();
                });

                $expandedImg.css({
                    position: 'absolute',
                    width: 0,
                    margin: marginSize,
                    'z-index': 10,
                    transition: 'all .3s ease-in-out',
                    top: $img.offset().top,
                    left: $img.offset().left
                });

                $body.append($expandedImg);

                $expandedImg.css({
                    width: $window.width() - marginSize * 2,
                    top: 0,
                    left: 0,
                })
            });
        });
    };

    $('.js-imageExpander').ImageExpander();
}(jQuery));
