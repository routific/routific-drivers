angular.module('app', [])
.component('app', {
template: `
  <div class="list-title">
    <div>Name</div>
    <div>Total Distance</div>
    <div>Total Time</div>
    <div>Avg Speed</div>
  </div>
    <ul>
      <li ng-repeat="driver in $ctrl.data track by $index">

      <div class="list-row">
        <div class="driver name">{{ driver.name }}</div>
        <div class="driver total-distance">{{ driver.totalDistance }}</div>
        <div class="driver total-time">{{ driver.totalTime }}</div>
        <div class="driver avg-speed">{{ (driver.totalDistance / driver.totalTime) * 60 }}</div>
      </div>

      <div class="list-details">



      </div>
      </li>
    </ul>`,
  controller: ['$scope', 'dataService', function($scope, dataService) {
    
    var vm = this;
    vm.data = [];
  
 
      dataService.init().then(function(result) {
       
          vm.data = result;
      
      });



    
  }]
})
.component('driverList', {
  bindings: {
    data: '<'
  },
  template: `
  <div class="list-title">
    <div>Name</div>
    <div>Total Distance</div>
    <div>Total Time</div>
    <div>Avg Speed</div>
  </div>
    <ul>
      <li ng-repeat="driver in $ctrl.data track by $index">

      <div class="list-row">
        <div class="driver name">{{ driver.name }}</div>
        <div class="driver total-distance">1000m</div>
        <div class="driver total-time">100hr</div>
        <div class="driver avg-speed">100m/hr</div>
      </div>

      <div class="list-details">



      </div>
      </li>
    </ul>
  `,
  controller: [function() {

    
  }]

})


