var app = angular.module('app')

app.component('routeList', {
    bindings: {
      routes: '='
    },
    template: `
        <div class="daily-route-list">
          <ul>
            <li ng-repeat="route in $ctrl.routes">
              <span>{{route.date}}</span>
              <span>{{route.distance}}</span>
              <span>{{route.duration}}</span>
            </li>
          </ul>
        </div>
    `
});