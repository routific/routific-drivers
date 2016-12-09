angular.module('app')
.component('driverCard', {
    bindings: {
        driver: '<',
        close: '&'
    },
    template:`
      <div class="driver-card">
        <img ng-src="{{ ::$ctrl.driver.data.picture }}" />
        <div class="driver-card-daily">
          <span class="label">Driver Name</span>
          <h2 class="driver-card-name">{{ ::$ctrl.driver.data.name }}</h2>
          <span class="label">Description</span>
          <p ng-class="['driver-card-desc', { hide: $ctrl.hideDesc }]">{{ ::$ctrl.driver.data.description }}</p>
          <span class="label label-bar" ng-click="$ctrl.hideDesc = !$ctrl.hideDesc">Toggle Description</span>
        </div>
        <table class="driver-list">
          <thead>
            <tr>
              <th ng-click="$ctrl.sort('Date')">Date {{ $ctrl.showArrow('Date') }}</th>
              <th ng-click="$ctrl.sort('totalDistance')">Total Distance {{ $ctrl.showArrow('totalDistance') }}</th>
              <th ng-click="$ctrl.sort('totalTime.hour')">Total Time {{ $ctrl.showArrow('totalTime.hour') }}</th>
              <th ng-click="$ctrl.sort('averageSpeed')">Avg Speed {{ $ctrl.showArrow('averageSpeed') }}</th>
            </tr>
          </thead>
          <tr ng-repeat="day in $ctrl.dataArray | orderBy:$ctrl.sortBy:$ctrl.reverse" class="driver-list-row">
            <td class="name">{{ day.date }}</td>
            <td class="total-distance">{{ ::day.totalDistance }} <small>km</small></td>
            <td class="total-time">{{ ::day.totalTime.hour }} <small>hr</small> {{ ::day.totalTime.min }} <small>min</small></td>
            <td class="avg-speed">{{ ::day.averageSpeed }} <small>km/hr</small></td>
          </tr>
        </table>
        <div class="button" ng-click="$ctrl.close()">ESC / Close Window</div>
      </div>
    `,
    controller: ['$scope', function($scope) {     
      var vm = this;
      vm.hideDesc = true;
      vm.sortBy = 'totalDistance';
      vm.reverse = true;
      
      vm.sort = function(field) {
        vm.sortBy = field;
        vm.reverse = !vm.reverse;
      }

      vm.showArrow = function(field) {
        if (vm.sortBy === field) {
          return vm.reverse ? '\u2193' : '\u2191';
        }
        return '';
      }

      vm.listenKey = function(e) {
        if (e.keyCode === 27) {
          $scope.$apply(function() {
            vm.close();
          });
        }
      }

      vm.$onInit = function() {
        document.addEventListener('keyup', vm.listenKey);
      }

      vm.$onChanges = function(changes) {
        if (!changes.driver) return;
        var newData = changes.driver.currentValue.data.daily;
        vm.dataArray = Object.keys(newData).map(function(item) {
          var day = newData[item];
          return {
            date: item,
            totalDistance: day.totalDistance,
            totalTime: {
              hour: Math.floor(day.totalTime / 60),
              min: day.totalTime % 60
            },
            averageSpeed: `${Math.floor((day.totalDistance / day.totalTime) * 60)}`
          };
        });
      }

      vm.$onDestroy = function() {
        document.removeEventListener('keyup', vm.listenKey);
      }

    }]
});
