/**
 * aeonTools Module configuration.
 */
angular.module('aeonTools', ['ui.router', 'ui.router.state.events', 'ngMaterial', 'angular-loading-bar'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider','cfpLoadingBarProvider',
        function ($stateProvider, $urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider) {

            // Various States
            $stateProvider.state('checkTx', {
                url: '/checkTx',
                templateUrl: 'templates/views/checkTx.html',
                controller: 'checkTxCtrl',
                data: {requireLogin: false}
            });

            // Default page.
            $urlRouterProvider.otherwise('/checkTx');

            // Theme config.
            $mdThemingProvider.definePalette('starSearchPalette', {
                '50': 'ffebee',
                '100': '201652',
                '200': 'ef9a9a',
                '300': 'ffffff',
                '400': '201652',
                '500': '3CBFAF',
                '600': '33aaaa',
                '700': 'd32f2f',
                '800': '000000',
                '900': 'b71c1c',
                'A100': 'CE102C',
                'A200': 'ff5252',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['400', 'A100'],
                'contrastLightColors': undefined
            });
            $mdThemingProvider.theme('default')
                .primaryPalette('starSearchPalette');

            // Config for angular-loading-bar so that we can use
            // custom progress bar.
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.includeSpinner = false;
        }
    ])
    .run(['$rootScope', '$state', function ($rootScope, $state) {

        /**
         * Variable to track if any api call is ongoing.
         * @type {boolean}
         */
        $rootScope.inProgress = false;

        /**
         * Variable to track number of api calls ongoing.
         * @type {number}
         */
        $rootScope.apiCount = 0;

        /**
         * Signals start of an api call.
         */
        $rootScope.showProgress = function() {
            $rootScope.inProgress = true;
            $rootScope.apiCount++;
        }

        /**
         * Signals end of an api call.
         * Resets apiCount variable if all calls are completed.
         * @Note: This works because JavaScript is single threaded.
         */
        $rootScope.hideProgress = function() {
            $rootScope.apiCount--;
            if ($rootScope.apiCount <= 0) {
                $rootScope.inProgress = false;
                $rootScope.apiCount = 0;
            }
        }

        /**
         * Checks if user is already logged in.
         * @returns {boolean}
         */
        $rootScope.isAuthorized = function() {
            return (localStorage.getItem('userObj') !== null);
        }

        /**
         * Returns logged in user's name.
         * @returns {String}
         */
        $rootScope.getUserName = function () {
            var userObj = JSON.parse(localStorage.getItem('userObj'));
            return userObj.name;
        }

        /**
         * Event listener for state change start.
         */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

            // Authorization Check
            if (toState.data.requireLogin && !$rootScope.isAuthorized()) {
                // if login is required and user is unauthorized,
                // redirect to login page.
                event.preventDefault();
                $state.go('login');
                return;
            } else if (!toState.data.requireLogin && $rootScope.isAuthorized()) {
                // if page is for only guest user and user is logged in,
                // redirect to search page.
                event.preventDefault();
                $state.go('search');
                return;
            }

            // Signals start of an api call to get view's template.
            $rootScope.showProgress();
        });

        /**
         * Event listener for state change complete.
         */
        $rootScope.$on('$viewContentLoaded', function(event){
            // Signals end of api call used for loading view's template.
            $rootScope.hideProgress();
        });

        /**
         * Event listener for api call start.
         */
        $rootScope.$on('cfpLoadingBar:started', function () {
            // Signals start of an api call.
            $rootScope.showProgress();
        });

        /**
         * Event listener of api call end.
         */
        $rootScope.$on('cfpLoadingBar:completed', function () {
            // Signals end of an api call.
            $rootScope.hideProgress();
        });

    }]);