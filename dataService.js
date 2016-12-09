angular.module('app')
.factory('dataService', ['$http', function($http) {

 function getDrivers() {
    return $http.get('data/drivers.json')
      .then(function(res){
        return res.data;
      })
  }
  function getRoutes(date) {
    return $http('data/' + date + '.json')
      .then(function(res){
        return res.data;
      })
  }

  var _getDailyStats = function(route) {
      var total = route.reduce(function(prev, cur) {
         prev[totalTime] += cur[drivingTimeFromPrevious];
         prev[totalDistance] += cur[distanceToPrevious];
         return prev;
      }, {
          totalTime: 0,
          totalDistance: 0
      });

      return total;
  }

  function aggregate() {
    var response = {}
    getDrivers()
    .then(function(result) {
      var aggreDriver = result.forEach(function(driverItem) {
          response[driverItem.id] = driverItem;
          response[driverItem.id]["daily"] = {};
          response[driverItem.id]["totalTime"] = 0;
          response[driverItem.id]["totalDistance"] = 0;
      });
      days = ['2016-12-05','2016-12-06']
      routePromises = []
      days.forEach(function(day) {
        routePromises.push(getRoutes(day));
      });
      return Promise.all(routePromises);
    })
    .then(function(routeResults) {
      routeResults.forEach(function(routesForDay) {
        routesForDay = getRoutesForDay(day);
        date = routesForDay.day;
        routesForDay.routes.forEach(function(routeItem) {
            driver = response[routeItem.driverId]
            dailyStats = _getDailyStats(routeItem.route)
            driver.daily[date] = dailyStats
            driver.totalTime += dailyStats.totalTime
            driver.totalDistance += dailyStats.totalDistance
        });
      });
      console.log(response);
      return response
    })
  }

  return {
    init: function() {
      return aggregate();
    }
  }
}])
