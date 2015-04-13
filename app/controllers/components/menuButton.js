/**
 * Controller for the menu button componenent
 *
 * @class Controllers.components.menuButton
 */
var args = arguments[0];

// Pass through all the properties set on the button, except for meta data and text
$.menuContainer.applyProperties(_.omit(args, 'id', '__parentSymbol', '__itemTemplate', '$model'));

_.extend($, {
    /**
     * @constructor
     * @method construct
     * @param {Object} config Controller configuration
     */
    construct: function(config) {
        Ti.App.addEventListener('menuDidOpen', setCloseIcon);
        Ti.App.addEventListener('menuDidClose', setMenuIcon);
    },

    /**
     * @method destruct
     * function executed when closing window
     */
    destruct: function() {
        Ti.App.addEventListener('menuDidOpen', setCloseIcon);
        Ti.App.addEventListener('menuDidClose', setMenuIcon);

    }
});

/**
 * @method doClickMenu
 * Handle click on menu button
 * @params {Object} evt
 * @return {Trigger} `Click`
 */
function doClickMenu (evt) {
    var buttonClick = _.throttle(function buttonClick () {
        $.menuIcon.opacity = 0.6;
        setTimeout(function () { $.menuIcon.opacity = 1; }, 350);
        Alloy.Globals.drawer.toggleLeftWindow();
        $.trigger('click');
    }, 100);

    buttonClick();
}

/**
 * [setCloseIcon description]
 * @param {[type]} evt [description]
 */
function setCloseIcon (evt) {
    $.menuIcon.image = '/images/navigation/menuIconClose.png';
    $.menuIcon.width = 15;
    $.menuIcon.height = 15;
}

/**
 * [setMenuIcon description]
 * @param {[type]} evt [description]
 */
function setMenuIcon (evt) {
    $.menuIcon.image = '/images/navigation/menuIcon.png';
    $.menuIcon.width = 19;
    $.menuIcon.height = 12;
}



