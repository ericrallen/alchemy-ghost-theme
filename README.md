#Alchemy v0.0.1

**Alchemy is still very much a work in progress, it's not ready for use just yet and definitely doesn't deliver on all of its features yet.**

Alchemy is a typographic Ghost theme that's built to be lean, modern, performant, forward-thinking, and beautiful.

Alchemy is optimized for developer blogs where code will be posted, but will work just as well for blogs featuring text and images instead of code.

##Features

Alchemy has (and will have) several features that make it worth checking out, below I've highlighted a few of them.

Many more features are planned for its future.

###Custom Handlebars Helpers

Alchemy uses several custom Handlebars helpers to make the theme more powerful. You'll need to add one line of code to the main `config.js` file to load these helpers and allow Alchemy to register them with Handlebars.

This is the only file that's loaded by Ghost that is currently safe from being overwritten during an upgrade, so we need to hook our helpers in here.

In the future, I'll explore using the Plugin system or the Ghost API to take care of these, but for now, this is what I have to work with.

1. Open `config.js`
2. Add the following code to your Ghost `config.js` just before the line that begins with:  `var path =`, replacing `[ALCHEMY THEME DIRECTORY]` with the name of the folder that has your Alchemy theme files:

    // Load custom Handlebars helpers from Alchemy Theme
    require('./content/themes/[ALCHEMY THEME DIRECTORY]/helpers')();

###Configuration

Many of Alchemy's optional features can easily be toggled via changing values in `config/config.js`.

###Syntax Highlighting (not implemented yet)

Alchemy makes use of highlightjs to syntax highlight your code. You can set which highlightjs theme you'd like to use in `config/config.js`.

###Future-Friendly, Forward-Thinking (in progress)

Not only was Alchemy was built with Ghost's best-practices in mind, it also takes steps to plan ahead for future releases and the features they will bring.

When Ghost starts rendering your Post preview using the theme's `post.css` file, Alchemy will be ready.
