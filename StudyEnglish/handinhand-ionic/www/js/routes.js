angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.page2', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/page2.html',
        controller: 'page2Ctrl'
      }
    }
  })

  .state('tabsController.page3', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/page3.html',
        controller: 'page3Ctrl'
      }
    }
  })

  .state('tabsController.page4', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/page4.html',
        controller: 'page4Ctrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.page5', {
    url: '/page5',
    views: {
      'tab4': {
        templateUrl: 'templates/page5.html',
        controller: 'page5Ctrl'
      }
    }
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page7',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.page10', {
    url: '/page10',
    views: {
      'tab1': {
        templateUrl: 'templates/page10.html',
        controller: 'page10Ctrl'
      }
    }
  })

  .state('tabsController.page11', {
    url: '/page11',
    views: {
      'tab1': {
        templateUrl: 'templates/page11.html',
        controller: 'page11Ctrl'
      }
    }
  })

  .state('tabsController.page8', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/page8.html',
        controller: 'page8Ctrl'
      }
    }
  })

  .state('tabsController.page9', {
    url: '/page9',
    views: {
      'tab2': {
        templateUrl: 'templates/page9.html',
        controller: 'page9Ctrl'
      }
    }
  })

  .state('tabsController.page12', {
    url: '/page12',
    views: {
      'tab2': {
        templateUrl: 'templates/page12.html',
        controller: 'page12Ctrl'
      }
    }
  })

  .state('page18', {
    url: '/page18',
    templateUrl: 'templates/page18.html',
    controller: 'page18Ctrl'
  })

  .state('tabsController.page13', {
    url: '/page13',
    views: {
      'tab2': {
        templateUrl: 'templates/page13.html',
        controller: 'page13Ctrl'
      }
    }
  })

  .state('tabsController.page14', {
    url: '/page14',
    views: {
      'tab2': {
        templateUrl: 'templates/page14.html',
        controller: 'page14Ctrl'
      }
    }
  })

  .state('tabsController.page19', {
    url: '/page19',
    views: {
      'tab2': {
        templateUrl: 'templates/page19.html',
        controller: 'page19Ctrl'
      }
    }
  })

  .state('tabsController.page15', {
    url: '/page15',
    views: {
      'tab2': {
        templateUrl: 'templates/page15.html',
        controller: 'page15Ctrl'
      }
    }
  })

  .state('tabsController.page16', {
    url: '/page16',
    views: {
      'tab2': {
        templateUrl: 'templates/page16.html',
        controller: 'page16Ctrl'
      }
    }
  })

  .state('tabsController.page17', {
    url: '/page17',
    views: {
      'tab2': {
        templateUrl: 'templates/page17.html',
        controller: 'page17Ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page6')


});