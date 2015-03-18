module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: ['assets/js/**/*.js', 'assets/js/functions.js'],
                dest: 'assets/js/theme.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: true,
                    compass: false
                },
                files: {
                    'assets/css/theme.css': 'assets/css/scss/theme.scss',
                    'assets/css/post.css': 'assets/css/scss/post.scss'
                }
            }
        },

        watch: {
            scripts: {
                files: ['assets/js/**/*.js'],
                tasks: ['newer:uglify', 'notify:scripts'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['assets/css/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'newer:cssmin', 'notify:sass', 'bs-inject'],
                options: {
                    spawn: false
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    'assets/css/theme.css': 'assets/css/theme.css',
                    'assets/css/post.css': 'assets/css/post.css'
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },

        notify: {
            sass: {
                options: {
                    title: 'Grunt',  // optional
                    message: 'SASS compiled and minified' //required
                }
            },
            scripts: {
                options: {
                    title: 'Grunt',  // optional
                    message: 'JavaScript concatenated and minified'
                }
            }
        }
    });

    // Start BrowserSync via the API
    var bs;

    grunt.registerTask("bs-start", function () {
        var browserSync = require("browser-sync");

        bs = browserSync.init(
            [
                'assets/js/**/*.js',
                '*.html'
            ],
            {
                proxy: 'http://localhost:2368/'
            }
        );
    });

    grunt.registerTask('bs-inject', function () {
        bs.reload('assets/css/theme.min.css');
        bs.reload('assets/css/post.min.css');
    });

    grunt.registerTask('default', ['bs-start', 'watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};
