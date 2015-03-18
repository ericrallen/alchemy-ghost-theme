;(function($, window, undefined) {

    var site = (function() {
        var pub = {};

        pub.init = function init() {

        };

        pub.ready = function ready() {
            hljs.initHighlightingOnLoad();

            bindEvents();
        };

        pub.loaded = function loaded() {

        };

        function bindEvents() {
            $('#toggle-nav-drawer').on('click', function(e) {
                $('body').toggleClass('drawer-open');
            });
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
