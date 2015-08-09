/**
 *
 * @fileOverview
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

var ACTIVE_CLASS = 'active';
var NEXT_CLASS = 'next';
var PREV_CLASS = 'prev';

var ARROW_LEFT = 37;
var ARROW_UP = 38;
var ARROW_RIGHT = 39;
var ARROW_DOWN = 40;

var Carousel = module.exports = function Carousel(configOptions) {

    this.$parent = $(configOptions.parentSelector);
    this.$allItems = this.$parent.children(configOptions.itemSelector);
    this.$activeItem = this.$allItems.filter('.' + ACTIVE_CLASS);
    this.activeIndex = this.$allItems.index(this.$activeItem);

    this.init();
};

Carousel.prototype.isEnabled = false;
Carousel.prototype.$parent = null;
Carousel.prototype.$activeItem = null;
Carousel.prototype.$allItems = null;
Carousel.prototype.$subItems = null;
Carousel.prototype.activeIndex = null;
Carousel.prototype.prevKeyCode = ARROW_LEFT;
Carousel.prototype.nextKeyCode = ARROW_RIGHT;
Carousel.prototype.subPrevKeyCode = ARROW_UP;
Carousel.prototype.subNextKeyCode = ARROW_DOWN;

Carousel.prototype.init = function init() {

    this.setSubItems();
    this.preloadImages();

    this.setImageSrc(this.$activeSubItem);

    this.setupHandlers()
        .bindHandlers()
        .enable();
};

Carousel.prototype.setupHandlers = function setupHandlers() {

    this.onKeydownHandler = this.onKeydown.bind(this);

    return this;
};

Carousel.prototype.bindHandlers = function bindHandlers(isOn) {
    var onOrOff = 'off';
    var $document = $(document);

    if (isOn) {
        onOrOff = 'on';
    }

    $document[onOrOff]('keydown', this.onKeydownHandler);

    return this;
};

Carousel.prototype.enable = function enable() {
    if (this.isEnabled) {
        return this;
    }
    this.isEnabled = true;

    this.bindHandlers(true);

    return this;
};

Carousel.prototype.disable = function disable() {
    if (!this.isEnabled) {
        return this;
    }
    this.isEnabled = false;

    this.bindHandlers(false);

    return this;
};

Carousel.prototype.setImageSrc = function setImageSrc($element) {
    var $img = $element.find('img');

    if (!$img.attr('src')) {
        $img.attr('src', $img.data('src'));
    }
};

Carousel.prototype.getItemByIndexDelta = function getItemByIndexDelta(indexDelta) {
    var itemIndex = this.normalizeIndex(this.activeIndex + indexDelta, this.$allItems);

    return this.$allItems.eq(itemIndex);
};

Carousel.prototype.getSubItemByIndexDelta = function getSubItemByIndexDelta(indexDelta) {
    var itemIndex = this.normalizeIndex(this.getActiveSubIndex() + indexDelta, this.$subItems);

    return this.$subItems.eq(itemIndex);
};

Carousel.prototype.getActiveSubIndex = function getActiveSubIndex($item) {
    $item = $item || this.$activeItem;

    return $item.data('activeSubIndex') || 0;
};

Carousel.prototype.normalizeIndex = function normalizeIndex(index, items) {
    var totalItemLength = items.length;

    if (index < 0) {
        index = index + totalItemLength;
    } else if (index >= totalItemLength) {
        index = index - totalItemLength;
    }

    return index;
};

Carousel.prototype.transition = function transition(indexDelta) {
    var $oldItem = this.$activeItem;
    var $newItem = this.getItemByIndexDelta(indexDelta);

    $newItem.addClass(ACTIVE_CLASS);
    $oldItem.removeClass(ACTIVE_CLASS);

    this.$activeItem = $newItem;
    this.activeIndex = this.normalizeIndex(this.activeIndex + indexDelta, this.$allItems);
    this.setSubItems();
};

Carousel.prototype.subTransition = function subTransition(indexDelta) {
    var $oldItem = this.$activeSubItem;
    var $newItem = this.getSubItemByIndexDelta(indexDelta);

    $newItem.addClass(ACTIVE_CLASS);
    $oldItem.removeClass(ACTIVE_CLASS);

    this.$activeSubItem = $newItem;
    this.activeSubIndex = this.normalizeIndex(this.activeSubIndex + indexDelta, this.$subItems);
    this.$activeItem.data('activeSubIndex', this.activeSubIndex);
};

Carousel.prototype.setSubItems = function setSubItems() {
    this.activeSubIndex = this.getActiveSubIndex();

    this.$subItems = this.getSubItems();
    this.$activeSubItem = this.$subItems.eq(this.activeSubIndex);

    this.$activeSubItem.addClass(ACTIVE_CLASS);
};

Carousel.prototype.getSubItems = function getSubItems($item) {
    $item = $item || this.$activeItem;

    return $item.find('.carousel-item_nested');
};

Carousel.prototype.preloadImages = function preloadImages() {

    this.$allItems.each(function (index, item) {
        var activeSubIndex;
        var $subItems;
        var $item = $(item);

        if ($item !== this.$activeItem) {
            activeSubIndex = this.getActiveSubIndex($item);
            $subItems = this.getSubItems($item);

            this.setImageSrc($subItems.eq(activeSubIndex));
        }
    }.bind(this));

    this.setImageSrc(this.getSubItemByIndexDelta(1));
    this.setImageSrc(this.getSubItemByIndexDelta(-1));
};

Carousel.prototype.onKeydown = function onKeyDown($event) {
    var keyCode = $event.which;
    var isValidKey = false;

    switch(keyCode) {
        case this.prevKeyCode:
            isValidKey = true;
            this.transition(-1);

        break;
        case this.nextKeyCode:
            isValidKey = true;
            this.transition(1);
        break;
        case this.subPrevKeyCode:
            isValidKey = true;
            this.subTransition(-1);
        break;
        case this.subNextKeyCode:
            isValidKey = true;
            this.subTransition(1);
        break;
        default:
        break;
    }

    if (isValidKey) {
        this.preloadImages();
        $event.preventDefault();
    }
};
