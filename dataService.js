angular.module('app')
.factory('dataService', ['$http', function($http) {

 function getDrivers() {
    return $http({method:'get', url: 'data/drivers.json'})
      .then(function(res){
        return res.data;
      })
  }
  function getRoutes(date) {
    return $http({method:'get', url:'data/' + date + '.json'})
      .then(function(res){
        return res.data;
      })
  }

  var _getDailyStats = function(route) {
    console.log(route)
      var total = route.reduce(function(prev, cur) {
       prev["totalTime"] += (cur["drivingTimeFromPrevious"] || 0);
    
         
         prev["totalDistance"] += (cur["distanceToPrevious"] || 0);
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
        date = routesForDay.date;
        routesForDay.routes.forEach(function(routeItem) {

            var driver = response[routeItem.driverId]

            var dailyStats = _getDailyStats(routeItem.route)
            driver.daily[date] = dailyStats
            driver.totalTime += dailyStats.totalTime
            driver.totalDistance += dailyStats.totalDistance
        });

        console.log('routesForDay', routesForDay);
      });

      console.log("Aggregate");
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
