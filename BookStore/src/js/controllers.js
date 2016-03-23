/**
 登录验证模块
 */
var loginModule = angular.module("LoginModule",[]);
loginModule.controller('loginCtrl',function($scope){
    $scope.unLogin=true;
    $scope.email1 = '';
    $scope.password = '';
    $scope.submitForm = function(email,password) {
        console.log(email +'xiong33333'+password);
    };
}).directive('emailValue',function(){
    return{
        require:'ngModel',
        restrict : 'A',
        link:function(scope,elm,attrs,ctrl){
            var value;
            ctrl.$validators.uniqueUsername = function (modelValue, viewValue) {
                value = modelValue || viewValue;
                console.log("emailvalue:="+value);
            };
            elm.bind("blur keyup",function(){
                scope.email1 = value;
                console.log("email1:"+scope.email1);
            });
        }
    }
}).directive('ensureUnique', function($http){
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var url;
            ctrl.$validators.uniqueUsername = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                console.log("value:="+value);
                url = value == undefined ? 'http://localhost:9000/api/check/' + 'false & false' : 'http://localhost:9000/api/check/' + scope.email1 + '&'+value;
            };
            elm.bind("blur", function () {
                $http({
                    method: 'GET',
                    url: url
                }).success(function (data, status, headers, cfg) {
                    if (parseInt(data) == 0) {
                        ctrl.$setValidity('unique', true);
                        scope.unLogin = false;
                    } else {
                        ctrl.$setValidity('unique', false);
                    }
                }).error(function (data, status, headers, cfg) {
                    ctrl.$setValidity('unique', false);
                });
            });
        }
    }
});
 /*angular.module("LoginModule",[]).
     controller('ValidateCtr',function($scope){
        $scope.userInfo={
            email:'',
            password:'',
            unLogin:true
        };

        $scope.submitForm = function(email,password) {
            console.log(email +'xiong33333'+password);
            if (email!='xiong@126.com' || password != 'ff1') {
                $scope.userInfo.unLlogin=false;
            }else{
                $scope.userInfo.unLogin=true;
            }
        };
    }).
     directive('emailTest',function() {
         return {
             restrict: 'A',
             link:function(scope, element, attrs) {
                if(scope.userInfo.email!='xiong@126.com'){
                    scope.userInfo.unLogin = true;
                }
             }
         };
});*/
/**
* 这里事书籍类型列表模块
* */
var bookTypeModule = angular.module("BookTypeModule",[]);

bookTypeModule.controller('BookTypeCtrl',function($scope,$http, $state, $stateParams,listService){
    $scope.bookTypes = [];
    $scope.getBookTypeAsync = function() {
        setTimeout(function() {
            $http.get('http://localhost:9000/api/bookTypes')
                .success(function(data,status,headers,cfg) {
                    for(var d in data){
                        console.log(data[d]);
                        $scope.bookTypes.push(data[d].bookType);
                    }
                });

        }, 100);
    };
    $scope.getBookTypeAsync();
    $scope.goType = function(type){
        console.log("type="+type);

        setTimeout(function() {
            var code = '';
            $http.get('http://localhost:9000/api/bookCodeByType/' + type)
                .success(function (data, status, headers, cfg) {
                    code = data[0].bookCode;
                    $state.go('booklist', {'bookType': code}, {reload: true});
                });
        },100);

    };


});

/**
 * 这里是书籍列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);

bookListModule.controller('BookListCtrl',function($scope, $http, $state, $stateParams,listService) {

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {

            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.books = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }


    };

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
    console.log($stateParams);
 /*   $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('../src/data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('../src/data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };
*/
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('http://localhost:9000/api/books/'+$stateParams.bookType)
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('http://localhost:9000/api/books/'+$stateParams.bookType)
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && (newVal.currentPage !== oldVal.currentPage || newVal.pageSize !== oldVal.pageSize)) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);



    $scope.gridOptions = {
         data: 'books',
         rowTemplate: listService,
         multiSelect: false,
         enableCellSelection: true,
         enableRowSelection: false,
         enableCellEdit: true,
         enablePinning: true,
         columnDefs: [{
             field: 'bookId',
             displayName: '序号',
             width: 60,
             pinnable: false,
             sortable: false
         }, {
             field: 'bookName',
             displayName: '书名',
             enableCellEdit: true
         }, {
             field: 'bookAuthor',
             displayName: '作者',
             enableCellEdit: true,
             width: 220
         }, {
             field: 'bookPrice',
             displayName: '定价',
             enableCellEdit: true,
             width: 120,
             cellFilter: 'currency:"￥"'
         }, {
             field: 'bookDescription',
             displayName: '概览',
             enableCellEdit: true,
             width: 120
         }, {
             field: 'bookId',
             displayName: '操作',
             enableCellEdit: false,
             sortable: false,
             pinnable: false,
             cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
         }],
         enablePaging: true,
         showFooter: true,
         totalServerItems: 'totalServerItems',
         pagingOptions: $scope.pagingOptions,
         filterOptions: $scope.filterOptions
     };
    $scope.goAdd = function(){
        $state.go('addbook');
    };
});

/**
 * 这里是书籍保存模块
 * @type {[type]}
 */
var bookPreserveModule = angular.module("BookPreserveModule", []);
bookPreserveModule.controller('PreserveCtrl', function($scope, $http, $state, $stateParams) {
    $scope.book={
        bookId:'',
        bookName:'',
        bookAuthor:'',
        bookPrice:0.0,
        bookDescription:'',
        bookType:''
    };
    $scope.goPreserve = function(){
        setTimeout(function() {
            console.log("book:"+$scope.book.bookName);
            $http.post('http://localhost:9000/api/bookPreserve',$scope.book)
                .success(function (data, status, headers, cfg) {
                    if(data==0){
                        $state.go('booklist', {'bookType': 0}, {reload: true});
                    }else{
                        alert("保存失败!");
                    }
                })
                .error(function(){
                    alert("保存失败!");
                });
        },100);
    };
});
/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
    var bookId = $stateParams.bookId;
    /*  $http.get('../src/data/books0.json')
            .success(function(data) {
                var foundBook;
                for(var book in data){
                    console.log(bookId);
                    console.log(data[book].bookId);
                    if(data[book].bookId == bookId){
                        foundBook = data[book];
                        $scope.book = foundBook;
                    }
                }
            });*/
    $http.get('http://localhost:9000/api/bookDetail/'+bookId)
        .success(function(data) {
            $scope.book=data;
        });
});
