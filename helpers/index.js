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

    function checkPostsList(context) {
        if(context.indexOf('index') > -1) return true;
    }

    function alchemyCheckHomePage(options) {
        if(options.data.root.context.indexOf('home') > -1) return options.fn();

        return options.inverse();
    }

    function alchemyShowSubTitle(options) {
        if(typeof alchemy.sub_title !== 'undefined' && alchemy.sub_title) return new hbs.SafeString('<h2 class="page-title-sub">' + alchemy.sub_title + '</h2>' + "\n" + '<hr />');
    }

    function alchemyPostDate(date, options) {
        if(typeof alchemy.use_relative_date !== 'undefined' && alchemy.use_relative_date) return new hbs.SafeString('<p class="post-time">posted <time class="post-date" datetime="' + moment(date).format('YYYY-MM-DD') + '">' + moment(date).fromNow() + '</time></p>');

        return new hbs.SafeString('<p class="post-time"><time class="post-date" datetime="' + moment(date).format('YYYY-MM-DD') + '">' + moment(date).format('MMM Do YYYY') + '</time></p>');
    }

    function alchemyPostAuthor(author, type, options) {
        var posted_by = alchemy.posted_by_text ? alchemy.posted_by_text + ' ' : 'Posted by ';

        type = type ? type : 'post';

        if(type === 'preview') {
            if(typeof alchemy.show_author_in_preview !== 'undefined' && alchemy.show_author_in_preview) return new hbs.SafeString('<p class="post-author">' + posted_by + ' <a href="/author/' + author.slug + '" class="post-author-link">' + author.name + '</a></p>');
        } else {
            return new hbs.SafeString('<p class="post-author">' + posted_by + ' <a href="/author/' + author.slug + '" class="post-author-link">' + author.name + '</a></p>');
        }
    }

    function alchemyPoweredByFooter(options) {
        var nofollow = ' rel="nofollow"';

        if(checkHomePage(options.data.root.context)) {
            nofollow = '';
        }

        var content = '<section class="blog-footer-poweredby cf">' +
                            '   <p><a href="https://ghost.org"' + nofollow + '>Powered by Ghost</a> | <a href="https://github.com/ericrallen/alchemy-ghost-theme"' + nofollow + '>Built with Alchemy</a></p>' +
                            '</section>'
        ;

        return new hbs.SafeString(content);
    }

    function alchemySyntaxHighlightingStyle(options) {
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
    }

    function alchemySyntaxHighlightingScript(options) {
        if(typeof alchemy.syntax_highlighting && alchemy.syntax_highlighting) return new hbs.SafeString('<script src="/assets/vendor/highlight/highlight.pack.js"></script>');
    }

    function alchemyPageTitle(blogTitle, metaTitle, options) {
        var titleString;

        var title = '';
        var subTitle = '';
        var sep = '|';
        var showBlogTitle = alchemy.show_blow_name_in_title ? alchemy.show_blow_name_in_title : false;

        if(showBlogTitle) {
            subTitle = blogTitle;
        }

        if(!metaTitle) {
            if(typeof options.data.root.post !== 'undefined' && options.data.root.post.title) {
                metaTitle = options.data.root.post.title;
            } else if(typeof options.data.root.author !== 'undefined' && options.data.root.author.name) {
                metaTitle = options.data.root.author.name;
            } else if(typeof options.data.root.tag !== 'undefined' && options.data.root.tag.name) {
                metaTitle = 'Posts Tagged: ' + options.data.root.tag.name;
            } else {
                metaTitle = '';
                showBlogTitle = true;
            }
        }

        if(typeof alchemy.title_separator !== 'undefined' && sep !== '') {
            if(alchemy.title_separator === '') {
                sep = ' ';
            } else if(alchemy.title_separator === ' ') {
                sep = alchemy.title_separator;
            } else {
                sep = ' ' + alchemy.title_separator + ' ';
            }
        }

        if(checkHomePage(options.data.root.context) || checkPostsList(options.data.root.context)) {
            if(typeof alchemy.homepage_title !== 'undefined' && alchemy.homepage_title) {
                title = alchemy.homepage_title;
            } else if(typeof alchemy.sub_title !== 'undefined' && alchemy.sub_title) {
                title = alchemy.sub_title;
            } else {
                title = blogTitle;
                showBlogTitle = false;
            }

            titleString = title;

            if(showBlogTitle && subTitle) {
                titleString += sep + subTitle;
            }

            return new hbs.SafeString('<meta name="title" content="' + titleString + '" />' + "\n" + '<title>' + titleString + '</title>');
        } else {
            titleString = metaTitle;

            if(showBlogTitle && subTitle) {
                titleString += sep + subTitle;
            }

            return new hbs.SafeString('<meta name="title" content="' + titleString + '" />' + "\n" + '<title>' + titleString + '</title>');
        }
    }

    function alchemyMailChimpForm(options) {
        if(typeof alchemy.mailchimp_action_url === 'undefined' || !alchemy.mailchimp_action_url) return false;

        var form = '<div id="mc_embed_signup" class="newsletter-signup">' + "\n" +
                    '   <form action="/' + alchemy.mailchimp_action_url + '" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="newsletter-signup-form" target="_blank">' + "\n" +
                    '       <div id="mc_embed_signup_scroll">' + "\n" +
                    '           <h2 class="newsletter-signup-header">Newsletter</h2>' + "\n" +
                    '           <div class="mc-field-group">' + "\n" +
                    '               <label for="mce-EMAIL" class="accessible-text">Email Address</label>' + "\n" +
                    '               <input type="email" placeholder="Email Address" value="" name="EMAIL" class="required email" id="mce-EMAIL">' + "\n" +
                    '           </div>' + "\n" +
                    '           <div id="mce-responses" class="clear">' + "\n" +
                    '               <div class="response" id="mce-error-response" style="display:none"></div>' + "\n" +
                    '               <div class="response" id="mce-success-response" style="display:none"></div>' + "\n" +
                    '           </div>' + "\n" +
                    '           <div style="position: absolute; left: -5000px;"><input type="text" name="b_94bd5b357b8df8d6a0754c9bb_06b5870484" tabindex="-1" value=""></div>' + "\n" +
                    '           <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>' + "\n" +
                    '       </div>' + "\n" +
                    '   </form>' + "\n" +
                    '</div>'
        ;

        return new hbs.SafeString(form);
    }

    function alchemyBlogFooter(options) {
        var formClass = '';

        if(typeof alchemy.mailchimp_action_url !== 'undefined' && alchemy.mailchimp_action_url) {
           formClass = ' has-form';
        }

        var content = '<footer class="blog-footer' + formClass + '">' + "\n" +
                    alchemyMailChimpForm(options) + "\n" +
                    alchemyPoweredByFooter(options) + "\n" +
                '</footer>'
        ;

        return new hbs.SafeString(content);
    }

    function alchemySocialMediaLinks(options) {
        var links = '';

        if(typeof alchemy.social_media_links !== 'undefined' && alchemy.social_media_links.length) {
            links = '<p>Where to find me:<ul class="blog-intro-social">';

            var linkArray = alchemy.social_media_links;

            linkArray.reverse();

            var i = linkArray.length;

            while(i--) {
                links += '<li class="blog-intro-social-item"><a href="' + linkArray[i].url + '"><span class="accessible-text">Find me on </span>' + linkArray[i].name + '</a></li>';
            }
        }

        links += '</ul></p>';

        return new hbs.SafeString(links);
    }

    function alchemyDisqusComments(postId, options) {
        var content = '';

        if(typeof alchemy.disqus_shortname !== 'undefined' && alchemy.disqus_shortname) {
            content = '<div id="disqus_thread"></div>' + "\n" +
                    '<script type="text/javascript">' + "\n" +
                        'var disqus_shortname = "' + alchemy.disqus_shortname +'";' + "\n" +
                        'var disqus_identifier = ' + postId + ';' + "\n" +
                        '(function() {' + "\n" +
                            'var dsq = document.createElement("script"); dsq.type = "text/javascript"; dsq.async = true;' + "\n" +
                            'dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";' + "\n" +
                            '(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq);' + "\n" +
                        '})();' + "\n" +
                    '</script>' + "\n" +
                    '<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>' + "\n" +
                    '<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>'
            ;
        }

        return new hbs.SafeString(content);
    }

    //conditional: are we on homepage?
    hbs.registerHelper('alchemy-checkHomePage', alchemyCheckHomePage);

    //add sub-title text to header
    hbs.registerHelper('alchemy-showSubTitle', alchemyShowSubTitle);

    //convert post date into relative date
    hbs.registerHelper('alchemy-postDate', alchemyPostDate);

    //format author
    hbs.registerHelper('alchemy-postAuthor', alchemyPostAuthor);

    //display powered by and built with message
    hbs.registerHelper('alchemy-poweredByFooter', alchemyPoweredByFooter);

    //add highlight.js CSS & JS
    hbs.registerHelper('alchemy-syntaxHighlightingStyle', alchemySyntaxHighlightingStyle);
    hbs.registerHelper('alchemy-syntaxHighlightingScript', alchemySyntaxHighlightingScript);

    //create page title based on config
    hbs.registerHelper('alchemy-pageTitle', alchemyPageTitle);

    //add mailchimp form
    hbs.registerHelper('alchemy-mailchimpForm', alchemyMailChimpForm);

    //build website footer
    hbs.registerHelper('alchemy-blogFooter', alchemyBlogFooter);

    //build social media links from config
    hbs.registerHelper('alchemy-socialMediaLinks', alchemySocialMediaLinks);

    //disqus comments
    hbs.registerHelper('alchemy-disqusComments', alchemyDisqusComments);
};
