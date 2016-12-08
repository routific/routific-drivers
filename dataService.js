angular.module('app', [])
.factory('dataService', ['$http', function($http) {
  return {
    getDrivers: function() {
      return $http.get('data/drivers.json')
        .then(function(res){
          return res.data;
        })
    },
    getRoutes: function(date) {
      return $http('data/' + date + '.json')
        .then(function(res){
          return res.data;
        })
    }
  }
}])
