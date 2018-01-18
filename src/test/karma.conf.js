// Karma configuration
// Generated on Thu Jul 13 2017 14:26:21 GMT+0530 (IST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            "../main/webapp/bower_components/angular/angular.min.js",
            "../main/webapp/bower_components/angular-ui-router/release/angular-ui-router.min.js",
            "../main/webapp/bower_components/angular-ui-router/release/stateEvents.min.js",
            "../main/webapp/bower_components/angular-animate/angular-animate.min.js",
            "../main/webapp/bower_components/angular-aria/angular-aria.min.js",
            "../main/webapp/bower_components/angular-messages/angular-messages.min.js",
            "../main/webapp/bower_components/angular-material/angular-material.min.js",
            "../main/webapp/bower_components/angular-loading-bar/build/loading-bar.min.js",
            '../main/webapp/bower_components/angular-mocks/angular-mocks.js',
            '../main/webapp/js/*.js',
            '../main/webapp/images/*',
            '../main/webapp/js/**/*.js',
            'unit/*.js',
            '../main/webapp/templates/**/*.html'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '../main/webapp/templates/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'foo',
            cacheIdFromPath: function(filepath) {
                var cacheId = filepath.substr(filepath.indexOf('template'));
                return cacheId;
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        crossOriginAttribute: false
    })
}
