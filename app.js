angular.module('app', [])
.component('app', {
  controller: ['dataService', function(dataService) {
    
    this.test = dataService.init();
    
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
    var vm = this;
    
  }]

})


