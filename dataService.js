angular.module('app', [])
.factory('dataService', ['$http', function($http) {
  return {
    getDrivers: function() {
      return $http.get('data/drivers.json')
    },
    getRoutes: function(date) {
      return $http('data/' + date + '.json')
    }
  }
}])
