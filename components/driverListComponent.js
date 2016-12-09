angular.module('app')
.component('driverList', {
  bindings: {
    open: '&',
    data: '<'
  },
  template: `
    <table class="driver-list">
      <thead>
        <tr>
          <th ng-click="$ctrl.sort('Name')">Name {{ $ctrl.showArrow('Name') }}</th>
          <th ng-click="$ctrl.sort('totalDistance')">Total Distance {{ $ctrl.showArrow('totalDistance') }}</th>
          <th ng-click="$ctrl.sort('totalTime.hour')">Total Time {{ $ctrl.showArrow('totalTime.hour') }}</th>
          <th ng-click="$ctrl.sort('averageSpeed')">Avg Speed {{ $ctrl.showArrow('averageSpeed') }}</th>
        </tr>
      </thead>
      <tr ng-click="$ctrl.open({ id: driver.id })" ng-repeat="driver in $ctrl.dataArray | orderBy:$ctrl.sortBy:$ctrl.reverse" class="driver-list-row">
        <td class="name">{{ ::driver.name }}</td>
        <td class="total-distance">{{ ::driver.totalDistance }} <small>km</small></td>
        <td class="total-time">{{ ::driver.totalTime.hour }} <small>hr</small> {{ ::driver.totalTime.min }} <small>min</small></td>
        <td class="avg-speed">{{ ::driver.averageSpeed }} <small>km/hr</small></td>
        <td class="view-details">+</td>
      </tr>
    </table>
  `,
  controller: ['$scope', function($scope) {
      var vm = this;
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

      vm.$onChanges = function(changes) {
        if (changes.data) {
          var newData = changes.data.currentValue;
          vm.dataArray = Object.keys(newData).map(function(item) {
            var driver = newData[item];
            return {
              id: driver.id,
              name: driver.name,
              totalDistance: driver.totalDistance,
              totalTime: {
                hour: Math.floor(driver.totalTime / 60),
                min: driver.totalTime % 60
              },
              averageSpeed: `${Math.floor((driver.totalDistance / driver.totalTime) * 60)}`
            };
          });
        }
      }
    }]
})
