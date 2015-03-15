'use strict';

var hbs = require('express-hbs');
var alchemy = require('../config/config');
var moment = require('moment');

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
    function checkHomePage(context) {
        if(context.indexOf('home') > -1) return true;

        return false;
    }

    //hbs custom function to check if we are on the homepage
    //we use this so that we can add rel="nofollow" to our footer Ghost and Alchemy links for SEO purposes  if this isn't the homepage
    hbs.registerHelper('alchemy-checkHomePage', function alchemyCheckHomePage(options) {
        if(options.data.root.context.indexOf('home') > -1) return options.fn();

        return options.inverse();
    });

    hbs.registerHelper('alchemy-showSubTitle', function alchemyShowSubTitle(options) {
        if(typeof alchemy.sub_title !== 'undefined' && alchemy.sub_title) return new hbs.SafeString('<h2 class="page-title-sub">' + alchemy.sub_title + '</h2>' + "\n" + '<hr />');
    });

    hbs.registerHelper('alchemy-postDate', function alchemyPostDate(date, options) {
        if(typeof alchemy.use_relative_date !== 'undefined' && alchemy.use_relative_date) return new hbs.SafeString('<p class="post-time">posted <time class="post-date" datetime="' + moment(date).format('YYYY-MM-DD') + '">' + moment(date).fromNow() + '</time></p>');

        return new hbs.SafeString('<p class="post-time"><time class="post-date" datetime="' + moment(date).format('YYYY-MM-DD') + '">' + moment(date).format('MMM Do YYYY') + '</time></p>');
    });

    hbs.registerHelper('alchemy-postAuthor', function alchemyPostAuthor(author, type, options) {
        var posted_by = alchemy.posted_by_text ? alchemy.posted_by_text + ' ' : 'Posted by ';

        type = type ? type : 'post';

        if(type === 'preview') {
            if(typeof alchemy.show_author_in_preview !== 'undefined' && alchemy.show_author_in_preview) return new hbs.SafeString('<p class="post-author">' + posted_by + ' <a href="/author/' + author.slug + '" class="post-author-link">' + author.name + '</a></p>');
        } else {
            return new hbs.SafeString('<p class="post-author">' + posted_by + ' <a href="/author/' + author.slug + '" class="post-author-link">' + author.name + '</a></p>');
        }
    });

    hbs.registerHelper('alchemy-poweredByFooter', function alchemyPoweredByFooter(options) {
        var nofollow = ' rel="nofollow"';

        if(checkHomePage(options.data.root.context)) {
            nofollow = '';
        }

        var content = '<section class="blog-footer-poweredby">' +
                            '   Proudly <a href="https://ghost.org"' + nofollow + '>published with Ghost</a> and <a href="https://github.com/ericrallen/alchemy-ghost-theme"' + nofollow + '>built with Alchemy</a>.' +
                            '</section>'
        ;

        return new hbs.SafeString(content);
    });

    hbs.registerHelper('alchemy-syntaxHighlightingStyle', function alchemySyntaxHighlightingStyle(options) {
        var themeUrl;

        if(typeof alchemy.syntax_theme !== 'undefined' && alchemy.syntax_theme) {
            if(typeof alchemy.syntax_theme_custom !== 'undefined' && alchemy.syntax_theme_custom) {
                themeUrl = alchemy.syntax_theme;
            } else {
                themeUrl = '/assets/vendor/highlight/styles/' + alchemy.syntax_theme + '.css';
            }
        } else {
            themeUrl = '/assets/vendor/highlight/styles/github.css';
        }

        if(typeof alchemy.syntax_highlighting && alchemy.syntax_highlighting) return new hbs.SafeString('<link rel="stylesheet" href="' + themeUrl + '" />');
    });

    hbs.registerHelper('alchemy-syntaxHighlightingScript', function alchemySyntaxHighlightingScript(options) {
        if(typeof alchemy.syntax_highlighting && alchemy.syntax_highlighting) return new hbs.SafeString('<script src="/assets/vendor/highlight/highlight.pack.js"></script>');
    });
};
