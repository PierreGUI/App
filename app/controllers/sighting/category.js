/**
 * Controller for surveys sighting category
 *
 * @class Controllers.sighting.category
 * @uses utils.log
 */
var log = require('utils/log');

//Internals
var sightingType;

_.extend($, {
    /**
     * @constructor
     * @method construct
     * @param {Object} config Controller configuration
     */
    construct: function(config) {
        sightingType = config.sightingType;
        //Get category based on material
        var data = require('data/category')[config.material];

        // Skip other
        if (data.length <= 1) {
            onClickGrid({source: { componentId: 0}});
            return;
        }

        $.grid.setData(data);
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
    log.info('[sighting/category] Close window');
    $.getView().close({animated: true});
}

/**
 * @method onClickGrid
 * Handle `click` on grid
 * @param  {Object} evt
 */
function onClickGrid (evt) {
    log.info('[sighting/category] Click on grid', evt);
    var category = evt.source.componentId;
    require('event').updateSurveyEventData('sighting', { category: category});
    require('flow').category(sightingType);
}
