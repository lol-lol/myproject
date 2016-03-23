//请尝试把BookListCtrl中加载书籍列表数据的部分抽出来作为一个服务

bookListModule.factory('listService',
    function(){
        var rowTemplate = '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>';

        return rowTemplate;
    }

);