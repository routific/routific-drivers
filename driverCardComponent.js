var app = angular.module('app')

app.component('driverCard', {
    bindings: {
        driver: '='
    },
    template:`
        <div class="driver-card">
            <img src="{{$ctrl.driver.photoUrl}}"</p>
            <p>{{$ctrl.driver.name}}</p>
        </div>
    `,
});