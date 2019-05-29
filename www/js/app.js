angular.module('starter', ['ionic', 'ionicLazyLoad', 'ionic-cache-src'])

////////////////////////////////////// BASIC CONFIG //////////////////////////////////

.constant('config', { 

  urlBase: 'https://personalfit.zmaxim.us/',
  onesignalId: '728bd2b8-45f0-4947-8d67-f69d88efe49a',
  playstoreAppId: 'YOUR_PLAYSTORE_ID',
  appstoreAppId: 'YOUR_APP_ID',
  shareMess: "Hi I found a personal trainer app. It's free ",
  playstoreAppUrl: 'https://play.google.com/store/apps/details?id=YOUR_PLAYSTORE_ID',
  appstoreAppUrl: 'https://itunes.apple.com/in/app/trainerfit/YOUR_APP_ID?mt=8',
})

////////////////////////////////////// FINAL BASIC CONFIG //////////////////////////////

.run(function($ionicPlatform, $http, $state, $ionicPopup, config) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit(config.onesignalId)
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

    

    //// EXIT BUTTON ////

    $ionicPlatform.registerBackButtonAction(function(event) {
      console.log('here');
      console.log($state.current.name);
      if($state.current.name == "tab.home") {
        $ionicPopup.confirm({
          title: 'Exit?',
          template: '<center>Would you like to exit the application?</center>',
          okType: "button-light",
          okText: "Yes",
          cancelType: "button-assertive",
          cancelText: "No",
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);

    //// FINAL EXIT BUTTON ////

    //// CHECK INTERNET CONNECTION ////

    var myPopup;
    var CheckInternetConnection = function() {
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          myPopup = $ionicPopup.alert({
            title: 'Warning',
            template: '<center>Sorry, no internet connection detected. Please reconnect and try again</center>',
            buttons: [{
                  text: 'Try Again',
                  type: 'button-assertive',
                  onTap: function(e) {
                      if(ionic.Platform.isIOS()){
                          if(navigator.connection.type == Connection.NONE) {
                            $cordovaToast.showLongBottom('Connect to your internet connection first.');
                            e.preventDefault();
                          }
                      }
                      if(ionic.Platform.isAndroid()){
                          if(navigator.connection.type == Connection.NONE) {
                            $cordovaToast.showLongBottom('Connect to your internet connection first.');
                            e.preventDefault();
                          }
                      }
                  }
              }]
          });
        }
      }
    }
    CheckInternetConnection();
 
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        $cordovaToast.showLongBottom('Connected successfully.');
        myPopup.close();
    })
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      CheckInternetConnection();
    })

    //// FINAL CHECK INTERNET CONNECTION ////

    var defaultHTTPHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
    };

    $http.defaults.headers.post = defaultHTTPHeaders;

});
    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$sceDelegateProvider){

$ionicConfigProvider.tabs.position("bottom");
$ionicConfigProvider.navBar.alignTitle("center");
$sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

$stateProvider

     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tab.html'
    })

     .state('tab.home', {
        url: '/home',
        cache: false,
        views: {
          'tab-home': {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
          }
        }
      })

     .state('tab.diets', {
        url: '/diets',
        cache: false,
        views: {
          'tab-diets': {
            templateUrl: 'diets.html',
            controller: 'DietsCtrl'
          }
        }
      })

     .state('tab.dpdetail', {
        url: '/dpdetail/:id',
        cache: false,
        views: {
          'tab-dpdetail': {
            templateUrl: 'dpdetail.html',
            controller: 'DPDetailCtrl'
          }
        }
      })

     .state('tab.exercises', {
        url: '/exercises',
        cache: false,
        views: {
          'tab-exercises': {
            templateUrl: 'exercises.html',
            controller: 'ExercisesCtrl'
          }
        }
      })

    .state('tab.workouts', {
        url: '/workouts',
        cache: false,
        views: {
          'tab-workouts': {
            templateUrl: 'workouts.html',
            controller: 'WorkoutsCtrl'
          }
        }
      })

    .state('tab.routine', {
        url: '/routine/:workout_id',
        cache: false,
        views: {
          'tab-routine': {
            templateUrl: 'routine.html',
            controller: 'RoutineCtrl'
          }
        }
      })

    .state('tab.bodyparts', {
        url: '/bodyparts',
        cache: false,
        views: {
          'tab-bodyparts': {
            templateUrl: 'bodyparts.html',
            controller: 'BodypartsCtrl'
          }
        }
      })

     .state('tab.equipments', {
        url: '/equipments',
        cache: false,
        views: {
          'tab-equipments': {
            templateUrl: 'equipments.html',
            controller: 'EquipmentsCtrl'
          }
        }
      })

     .state('tab.machine', {
        url: '/machine/:id',
        cache: false,
        views: {
          'tab-machine': {
            templateUrl: 'machine.html',
            controller: 'MachineCtrl'
          }
        }
      })

    .state('tab.categories', {
        url: '/categories',
        cache: false,
        views: {
          'tab-categories': {
            templateUrl: 'categories.html',
            controller: 'CategoriesCtrl'
          }
        }
      })

.state('tab.muscle', {
        url: '/muscle/:id',
        cache: false,
        views: {
          'tab-muscle': {
            templateUrl: 'muscle.html',
            controller: 'MuscleCtrl'
          }
        }
      })

.state('tab.details', {
        url: '/details/:id',
        cache: false,
        views: {
          'tab-details': {
            templateUrl: 'details.html',
            controller: 'DetailsCtrl'
          }
        }
      })

.state('tab.ebdetail', {
        url: '/ebdetail/:id_exercise',
        cache: false,
        views: {
          'tab-ebdetail': {
            templateUrl: 'details.html',
            controller: 'EBDetailCtrl'
          }
        }
      })

.state('tab.wedetail', {
        url: '/wedetail/:w_id_exercise',
        cache: false,
        views: {
          'tab-wedetail': {
            templateUrl: 'details.html',
            controller: 'WEDetailCtrl'
          }
        }
      })

.state('tab.signup', {
        url: '/signup',
        cache: false,
        views: {
          'tab-signup': {
            templateUrl: 'signup.html',
            controller: 'SignUpCtrl'
          }
        }
      })

.state('tab.store', {
        url: '/store',
        cache: false,
        views: {
          'tab-store': {
            templateUrl: 'store.html',
            controller: 'StoreCtrl'
          }
        }
      })

.state('tab.product', {
        url: '/product/:id',
        cache: false,
        views: {
          'tab-product': {
            templateUrl: 'product.html',
            controller: 'ProductCtrl'
          }
        }
      })

.state('tab.browsecat', {
        url: '/browsecat/:categories_products_id',
        cache: false,
        views: {
          'tab-browsecat': {
            templateUrl: 'browsecat.html',
            controller: 'BrowsecatCtrl'
          }
        }
      })


.state('tab.about', {
        url: '/about/:id',
        cache: false,
        views: {
          'tab-about': {
            templateUrl: 'about.html',
            controller: 'AboutTermsCtrl'
          }
        }
      })

.state('tab.terms', {
        url: '/terms/:id',
        cache: false,
        views: {
          'tab-terms': {
            templateUrl: 'terms.html',
            controller: 'AboutTermsCtrl'
          }
        }
      })

.state('tab.calculator',{
        url:'/calculator',
        cache: false,
        views: {
            'tab-calculator':{
                restrict: 'EA',
                replace: false,
                templateUrl: 'calculator.html',
                controller: 'KCalCtrl'
            }
        }
        
    })

  // if none of the above states are matched, use this as the fallback
  //localStorage.removeItem('appFirstRun'); // remover na produção // renan
  
    $urlRouterProvider.otherwise('/tab/home');
    
    
    var appFirstRun = localStorage.getItem('appFirstRun');

// RENAN
//  if(appFirstRun === 'true'){
//    $urlRouterProvider.otherwise('/tab/home');
//  }else{
//    $urlRouterProvider.otherwise('/tab/signup');
//  }

})

.filter('unique', function() {

   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key); 
              output.push(item);
          }
      });
      return output;
   };
})

.controller('HomeCtrl', ['$scope', '$http', '$state', 'config', function($scope, $http, $state, config) {

}])

.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
})


.controller('ExercisesCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.exercises = "";
  $http.get(config.urlBase+'json/data_exercises')
    .success(function(data, status, headers,config){
      console.log('Data exercises success');
      $scope.exercises = data.exercises;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
    })


}])


.controller('WorkoutsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = "";
  $http.get(config.urlBase+'json/data_workouts')
    .success(function(data, status, headers,config){
      console.log('Data workouts success');
      $scope.workouts = data.workouts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
    })
    .then(function(items){
      things = workouts.data;
    });


}])

.controller('RoutineCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.workouts = "";
  $http.get(config.urlBase+'json/data_workouts')
    .success(function(data, status, headers,config){
      console.log('Data workouts success');
      $scope.data = data.workouts[$state.params.workout_id];
      $scope.workouts = data.workouts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data workouts error');
    });

    $scope.data_workouts_exercises = "";
    $http.get(config.urlBase+'json/data_exercises_workouts')
    .success(function(data, status, headers,config){
      console.log('Data data_workouts_exercises success');
      $scope.data_workouts_exercises = data.data_workouts_exercises;
    })
    .error(function(data, status, headers,config){
      console.log('Data data_workouts_exercises error');
    })
    .then(function(items){
      things = data_workouts_exercises.data;
    });

  }])


.controller('BodypartsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

    $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.bodyparts = "";
  $http.get(config.urlBase+'json/data_bodyparts')
    .success(function(data, status, headers,config){
      console.log('Data bodyparts success');
      $scope.bodyparts = data.bodyparts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data bodyparts error');
    })

}])

.controller('EquipmentsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

    $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.equipments = "";
  $http.get(config.urlBase+'json/data_equipments')
    .success(function(data, status, headers,config){
      console.log('Data equipments success');
      $scope.equipments = data.equipments;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data equipments error');
    })

}])

.controller('MuscleCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.bodyparts = "";
  $http.get(config.urlBase+'json/data_bodyparts')
    .success(function(data, status, headers,config){
      console.log('Data bodyparts success');
      $scope.data = data.bodyparts[$state.params.id];
      $scope.bodyparts = data.bodyparts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data bodyparts error');
    })

    $scope.data_exercises_bodyparts = "";
  $http.get(config.urlBase+'json/data_exercises_bodyparts')
    .success(function(data, status, headers,config){
      console.log('Data data_exercises_bodyparts success');
      $scope.data_exercises_bodyparts = data.data_exercises_bodyparts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data data_exercises_bodyparts error');
    })

}])

.controller('DetailsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {


  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.exercises = "";
  $http.get(config.urlBase+'json/data_exercises')
  .success(function(data, status, headers,config){
      console.log('Data exercises success');
      $scope.data = data.exercises[$state.params.id];
      $scope.exercises = data.exercises;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
    })

    $scope.getIframeSrc = function (videoId) {
    return 'https://www.youtube.com/embed/' + $scope.data.exercise_video + '?rel=0&amp;controls=0&amp;showinfo=0';
};

  }])

.controller('EBDetailCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {


  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.data_exercises_bodyparts = "";
  $http.get(config.urlBase+'json/data_exercises_bodyparts')
    .success(function(data, status, headers,config){
      console.log('Data data_exercises_bodyparts success');
      $scope.data = data.data_exercises_bodyparts[$state.params.id_exercise];
      $scope.data_exercises_bodyparts = data.data_exercises_bodyparts;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data data_exercises_bodyparts error');
    })

        $scope.getIframeSrc = function (videoId) {
    return 'https://www.youtube.com/embed/' + $scope.data.exercise_video + '?rel=0&amp;controls=0&amp;showinfo=0';
};

  }])

.controller('WEDetailCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {


  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.data_workouts_exercises = "";
  $http.get(config.urlBase+'json/data_exercises_workouts')
    .success(function(data, status, headers,config){
      console.log('Data data_workouts_exercises success');
      $scope.data = data.data_workouts_exercises[$state.params.w_id_exercise];
      $scope.data_workouts_exercises = data.data_workouts_exercises;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data data_workouts_exercises error');
    })

        $scope.getIframeSrc = function (videoId) {
    return 'https://www.youtube.com/embed/' + $scope.data.exercise_video + '?rel=0&amp;controls=0&amp;showinfo=0';
};

  }])


  .controller('SignUpCtrl', ['$scope', '$http', '$state', 'config', '$ionicPopup', '$timeout', function($scope, $http, $state, config, $ionicPopup, $timeout) {

    $scope.subscriber = {
      subscriber_name : '',
      subscriber_email : '',
      subscriber_age : '',
      subscriber_gender : '',
      subscriber_goal : ''
    };

    $scope.savesubscriber = function (){

    var urlSignup = config.urlBase+'controller/new_subscribers';
    $http.post(urlSignup, $scope.subscriber)
    .then(
    function(){
      /*var alertPopup = $ionicPopup.alert({ title: 'Thank you!', template: 'We will contact you very soon!', okType: 'button-assertive', });*/
      console.log('Ok Form Signup');
      $state.go('tab.home');
    },
    function(){
      var alertPopup = $ionicPopup.alert({ title: 'Something went wrong', template: 'Try again please', okType: 'button-dark', });
      console.log('Error Form Signup');
    }
      ); 
};

      localStorage.setItem('appFirstRun', 'true');

}])

.controller('StoreCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

    $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.products = "";
  $http.get(config.urlBase+'json/data_products')
    .success(function(data, status, headers,config){
      console.log('Data products success');
      $scope.products = data.products;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data products error');
    })

}])

.controller('DietsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

    $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.diets = "";
  $http.get(config.urlBase+'json/data_diets')
    .success(function(data, status, headers,config){
      console.log('Data diets success');
      $scope.diets = data.diets;
      $ionicLoading.hide();
      
    })
    .error(function(data, status, headers,config){
      console.log('Data diets error');
    })

  $scope.button = {};
  $scope.button.first = {};
  $scope.button.second = {};
  $scope.button.third = {};
    
  $scope.click = function(button){
  $scope.button.first.clicked = false;
  $scope.button.second.clicked = false;
  $scope.button.third.clicked = false;
    
  button.clicked = true;
  
  };

}])

.controller('DPDetailCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {


  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.diets = "";
  $http.get(config.urlBase+'json/data_diets')
    .success(function(data, status, headers,config){
      console.log('Data diets success');
      $scope.data = data.diets[$state.params.id];
      $scope.diets = data.diets;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data diets error');
    })

  }])

.controller('BrowsecatCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.categories_products = "";
  $http.get(config.urlBase+'json/data_categories')
    .success(function(data, status, headers,config){
      console.log('Data categories_products success');
      $scope.data = data.categories_products[$state.params.categories_products_id];
      $scope.categories_products = data.categories_products;
      $ionicLoading.hide();
    })

    .error(function(data, status, headers,config){
      console.log('Data categories_products error');
    })

  $scope.products = "";
  $http.get(config.urlBase+'json/data_products')
    .success(function(data, status, headers,config){
      console.log('Data products success');
      $scope.products = data.products;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data products error');
    })

}])

.controller('MachineCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

$ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.equipments = "";
  $http.get(config.urlBase+'json/data_equipments')
    .success(function(data, status, headers,config){
      console.log('Data equipments success');
      $scope.data = data.equipments[$state.params.id];
      $scope.equipments = data.equipments;
      $ionicLoading.hide();
    })

    .error(function(data, status, headers,config){
      console.log('Data equipments error');
    })

  $scope.exercises = "";
  $http.get(config.urlBase+'json/data_exercises')
    .success(function(data, status, headers,config){
      console.log('Data exercises success');
      $scope.exercises = data.exercises;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data exercises error');
    })

}])

.controller('CategoriesCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {

    $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.imagesfolder = config.urlBase+'images';
  $scope.categories_products = "";
  $http.get(config.urlBase+'json/data_categories')
    .success(function(data, status, headers,config){
      console.log('Data categories_products success');
      $scope.categories_products = data.categories_products;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data categories_products error');
    })

}])

.controller('ProductCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', function($scope, $http, $state, config, $ionicLoading, $timeout) {


  $ionicLoading.show({
    template: '<ion-spinner icon="crescent" class="spinner-assertive"></ion-spinner>',
    noBackdrop: true
  });

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.products = "";
  $http.get(config.urlBase+'json/data_products')
    .success(function(data, status, headers,config){
      console.log('Data products success');
      $scope.data = data.products[$state.params.id];
      $scope.products = data.products;
      /*$scope.link = $scope.data.product_link;*/
      $scope.openWindow = function(post) {
      var url = $scope.data.product_link;
      window.open(url, '_self', 'location=yes');
    }
      $ionicLoading.hide();
    })

    .error(function(data, status, headers,config){
      console.log('Data products error');
    })

      $scope.products = "";
      $http.get(config.urlBase+'json/data_products')
    .success(function(data, status, headers,config){
      console.log('Data products success');
      $scope.products = data.products;
      $ionicLoading.hide();
    })
    .error(function(data, status, headers,config){
      console.log('Data products error');
    })

  }])


.controller('AboutTermsCtrl', ['$scope', '$http', '$state', 'config', '$ionicLoading', '$timeout', '$ionicPlatform', function($scope, $http, $state, config, $ionicLoading, $timeout, $ionicPlatform) {

  $scope.params = $state.params;
  $scope.imagesfolder = config.urlBase+'images';
  $scope.about = "";
  $http.get(config.urlBase+'json/data_about')
    .success(function(data, status, headers,config){
      console.log('Data about success');
      $scope.data = data.about[$state.params.id];
      $scope.about = data.about;
      $scope.facebook = function(post) {
      var url = $scope.data.facebook_app;
      window.open(url, '_system', 'location=yes');
    }
      $scope.twitter = function(post) {
      var url = $scope.data.twitter_app;
      window.open(url, '_system', 'location=yes');
    }
      $scope.instagram = function(post) {
      var url = $scope.data.instagram_app;
      window.open(url, '_system', 'location=yes');
    }
    })

    .error(function(data, status, headers,config){
      console.log('Data about error');
    });

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();

    $ionicPlatform.ready(function() { 
    if (isIOS) {
      $scope.appUrl = config.appstoreAppId;
    }
    if (isAndroid) {
      $scope.appUrl = config.playstoreAppUrl;
    }
    });

    $scope.OtherShare=function(){
     window.plugins.socialsharing.share(config.shareMess, null, null, $scope.appUrl);
  }

}])
