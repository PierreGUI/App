/**
 * Controller for index
 *
 * Reset app badge, check for active survey if not load the default surveys page and menu
 *
 * @class Controllers.index
 */

/**
 * Initializes the controller
 */
_.extend($, {
    /**
     * @constructor
     * @method construct
     * @param {Object} config Controller configuration
     */
    construct: function(config) {
        // Reset badge once opening the app
        Titanium.UI.iPhone.setAppBadge(0);

        if (!Ti.Geolocation.locationServicesEnabled) {
            log.error('[surveys] Please enable location services');
        }

        if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
            Ti.App.iOS.registerUserNotificationSettings({
                types: [
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
                    Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
                ]
            });
        }

        // Check if we have an active survey, if so open the app in active survey mode
        if (require('survey').activeSurvey()) {
            Alloy.createController('surveys/survey', {startedFromRoot: true});
            return;
        }

        Alloy.Globals.drawer = $.drawer;
        Alloy.Globals.navigationWindow = $.navigationWindow;
        Alloy.Globals.menu = $.menu;

        $.drawer.open();

        $.drawer.addEventListener('windowDidOpen', function (evt) {
            Ti.App.fireEvent('menuDidOpen');
        });

        $.drawer.addEventListener('windowDidClose', function (evt) {
            Ti.App.fireEvent('menuDidClose');
        });
    },

    /**
     * @method destruct
     * function executed when closing window
     */
    destruct: function() {
    }
});
