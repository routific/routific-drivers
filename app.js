angular.module('app', [])
.component('app', {
  controller: [function() {
      var vm = this;
      vm.test = 'a';
  }]
})

.component('driverList', {
  bindings: {
    data: '<'
  },
  template: `
  <ul>
    <li ng-repeat="driver in $ctrl.data track by $index">
    <div class="driver-name">{{ driver.name }}</div>
    <div class="driver-total-distance">1000m</div>
    <div class="driver-avg-speed">100m/hr</div>
    </li>
  </ul>
  `,
  controller: [function() {
    var vm = this;
    vm.data = [
      { name: 'Bob' },
      { name: 'Trevor' },
      { name: 'Test' }
    ]
  }]

})


