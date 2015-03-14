'use strict';

var hbs = require('express-hbs');
var alchemy = require('../config/config');

/*----------------------------------------------------------------------------------------
 Because Ghost doesn't allow a simple method of defining helpers,
 we need to have users add a line to their config.js file to utilize our helpers.

 This isn't ideal, but it's the only real solution right now

 To be added to config:

        // Load custom Handlebars helpers from Alchemy Theme
        require('./content/themes/alchemy/helpers')();

 REFERENCE:
 http://zackehh.com/safely-creating-custom-handlebars-helpers/
----------------------------------------------------------------------------------------*/

//define our custom handlebars helpers
module.exports = function() {
    //hbs custom function to check if we are on the homepage
    //we use this so that we can add rel="nofollow" to our footer Ghost and Alchemy links for SEO purposes  if this isn't the homepage
    hbs.registerHelper('checkHomePage', function checkPage(options) {
        if(options.data.root.context.indexOf('home') > -1) return options.fn();

        return options.inverse();
    });

    hbs.registerHelper('showSubTitle', function checkPage(options) {
        if(typeof alchemy.sub_title !== 'undefined' && alchemy.sub_title) return new hbs.SafeString('<h2 class="page-title-sub">' + alchemy.sub_title + '</h2>');
    });
};
