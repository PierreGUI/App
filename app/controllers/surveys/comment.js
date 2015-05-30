/**
 * Controller for surveys comments
 *
 * @class Controllers.surveys.comment
 * @uses utils.log
 */
var log = require('utils/log');

// Internals
var type = "SURVEY";

_.extend($, {
    /**
     * @constructor
     * @method construct
     * @param {Object} config Controller configuration
     */
    construct: function(config) {
        if (config.sightingType) {
            type = config.sightingType;
        }

        require('windowManager').openWinWithBack($.getView());
    },

    /**
     * @method destruct
     * function executed when closing window
     */
    destruct: function() {
    }
});

/**
 * @method onClickBackButton
 * Handle `click` on backButton
 */
function onClickBackButton () {
    $.getView().close({animated: true});
}


/**
 * @method doClickPostComment
 * Handle `click` on post comment button, storing the comment and final event.
 */
function doClickPostComment () {
    var comment = $.commentTextArea.value.trim();

    if (type !== "SURVEY") {
        require('event').updateSurveyEventData('sighting', {comment: comment});
        require('flow').multiComment();
        return;
    }

    var endTime = new Date().getTime();
    // Request location from system
    require('utils/location').getCurrentLatLng(function (error, locationObject) {
        var dataObject = {};
        // Add time to object
        dataObject.comment = comment;
        dataObject.endTime = endTime;
        dataObject.endLocation = locationObject;
        // Track event
        require('event').saveSurveyEvent('finishSurvey', dataObject);
        // Update the flo
        require('flow').comment();
    });
}
