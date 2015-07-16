#alchemy-ghost v0.1.5

**Alchemy is still very much a work in progress, it's not ready for use just yet and definitely doesn't deliver on all of its features yet.**

Alchemy is a typographic Ghost theme that's built to be lean, modern, performant, forward-thinking, responsive, and beautiful.

Alchemy is optimized for developer blogs where code will be posted, but will work just as well for blogs featuring text and images instead of code.

It is currently only optimized for dislay on mobile devices, but larger screen sizes will be taken into account soon.

##Features

Alchemy has (and will have) several features that make it worth checking out, below I've highlighted a few of them.

Many more features are planned for its future.

###Custom Handlebars Helpers

Alchemy uses several custom Handlebars helpers to make the theme more powerful. You'll need to add one line of code to the main `config.js` file to load these helpers and allow Alchemy to register them with Handlebars.

These helpers let Alchemy perform a lot of magic behind the scenes.

This is the only file that's loaded by Ghost that is currently safe from being overwritten during an upgrade, so we need to hook our helpers in here.

In the future, I'll explore using the Plugin system or the Ghost API to take care of these, but for now, this is what I have to work with.

1. Open `config.js`
2. Add the following code to your Ghost `config.js` just before the line that begins with:  `var path =`, replacing `[ALCHEMY THEME DIRECTORY]` with the name of the folder that has your Alchemy theme files:

    // Load custom Handlebars helpers from Alchemy Theme
    require('./content/themes/[ALCHEMY THEME DIRECTORY]/helpers')();

###Configuration

Many of Alchemy's optional features can easily be toggled via changing values in `config/config.js`.

This includes multiple Skins, which change the appearance of the theme.

###Syntax Highlighting

Alchemy makes use of highlightjs to syntax highlight your code. You can set which highlightjs theme you'd like to use in `config/config.js`.

###Future-Friendly, Forward-Thinking (in progress)

Alchemy was built with Ghost's best-practices in mind where possible, and as few hacks as necessary to achieve ifs functionality, it also takes steps to plan ahead for future releases and the features they will bring.

When Ghost starts rendering your Post preview using the theme's `post.css` file, Alchemy will be ready.

###3rd-Party Integrations

Alchemy supports easy integration of a simple MailChimp newsletter signup form and Disqus commenting system.

In the future it will support easy integration of FeedPress, Google Analytics, Webmaster Tools, and other useful, but optional, 3rd-party integrations.

A plugin will be released alongside Alchemy's final version which will aim to let you replace the RSS feed `<link>` tag in the `ghost_head` helper so that users can correctly subscribe to your FeedPress or other hosted RSS feed with just your site's URL.

###Accessibility (in progress)

Alchemy has been built to be accessible to all users. If you find accessibility issues while using Alchemy, please report them so that I can get them taken care of.
