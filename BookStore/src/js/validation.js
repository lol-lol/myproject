/**
 * Created by ff on 15/8/19.
 */

app.directive('remoteValidation', function($http) {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            elm.bind('keyup', function() {
                $http({method: 'GET', url: 'http://localhost:9000/api/remote'}).
                    success(function(data, status, headers, config) {
                        if(parseInt(data)==0){
                            ctrl.$setValidity('remote',true);
                        }else{
                            ctrl.$setValidity('remote',false);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        ctrl.$setValidity('remote', false);
                    });
            });
        }
    };
});

