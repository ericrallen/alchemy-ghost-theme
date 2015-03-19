;(function($, window, undefined) {

    var site = (function() {
        var pub = {};

        pub.init = function init() {
            //initial declaration of  paramters for module here
        };

        pub.ready = function ready() {
            hljs.initHighlightingOnLoad();

            bindEvents();
        };

        pub.loaded = function loaded() {
            //call methods that require fully loaded DOM
        };

        function bindEvents() {
            $('#toggle-nav-drawer')
                .on('click', function(e) {
                    $('body').toggleClass('drawer-open');
                })
                .on('keyup', function(e) {
                    if(e.which === 13) {
                        if(e.preventDefault) {
                            e.preventDefault()
                        }

                        $('body').toggleClass('drawer-open');
                    }
                })
            ;
        }

        return pub;
    }());

    site.init();

    $(document).ready(function() {
        site.ready();
    });

    $(window).load(function() {
        site.loaded();
    })

}(window.jQuery, window));
