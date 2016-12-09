angular.module('app', [])
.component('app', {
  template: `
    <driver-list open="$ctrl.openDriverCard(id)" data="$ctrl.data"></driver-list>
    <div ng-if="$ctrl.driverCard.showCard" class="driver-card-bg">
      <driver-card driver="$ctrl.driverCard" close="$ctrl.closeDriverCard()"></driver-card>
    </div>
  `,
  controller: ['dataService', function(dataService) {
    var vm = this;
    vm.data = [];

    vm.driverCard = {
      showRoute: false,
      showCard: false,
      data: {}
    }

    vm.$onInit = function() {
      dataService.init().then(function(result) {
          vm.data = result;
      });

      vm.openDriverCard = function(id) {
        vm.driverCard.showCard = true;
        vm.driverCard.data = vm.data[id];
      }

      vm.closeDriverCard = function() {
        vm.driverCard.showCard = false;
      }

    }
  }]
})
