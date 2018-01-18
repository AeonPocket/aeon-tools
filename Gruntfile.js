module.exports = function (grunt) {
    //Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mkdir: {
            all: {
                options: {
                    create: ['build']
                }
            }
        },
        vulcanize: {
            default: {
                options: {
                    // Task-specific options go here.
                    inlineScripts: true,
                    inlineCss: true
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    "build/index.html": "src/main/webapp/index.html"
                }
            }
        },
        htmlmin: {
            src: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: "src/main/webapp/images/", src: ['**'], dest: 'build/images/'},
                    {expand: true, cwd: "src/main/webapp/templates/", src: ['**'], dest: 'build/templates/'},
                    {expand: true, cwd: "src/main/webapp/", src: ['favicon.ico'], dest: 'build/'}
                ]
            }
        }
    });

    // Load the plugin that provides the "mkdir" task.
    grunt.loadNpmTasks('grunt-mkdir');

    // Load the plugin that provides the "vulcanize" task.
    grunt.loadNpmTasks('grunt-vulcanize');

    // Load the plugin that provides the "html-minifier" task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('build', ['mkdir', 'vulcanize', 'htmlmin', 'copy']);
}
