angular.module('app').controller('SearchController', ['$scope','DbService','$timeout','$q','$mdDialog','$rootScope','$state', function($scope,DbService,$timeout,$q,$mdDialog,$rootScope,$state){
	
 'use strict';
  
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  
  $scope.options = {
    rowSelection: true,
    multiSelect: false,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };
  
  $scope.query = {
    order: 'RECEIPT_NO',
    limit: 5,
    page: 1
  };
  
  	$scope.getRes=function(){
	  	DbService.search().then(function(resp){

			$scope.rows=resp;
			$scope.rows.count=resp.length;

		});
	}
  
  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };
  
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }

  $scope.edit=function(ev){

	console.log("selected row "+$scope.selected );
  $rootScope.selectedId=$scope.selected[0].RECEIPT_NO;
	
     $mdDialog.show({
	      controller: 'EditController',
	      templateUrl: './scripts/edit/edit.html',
	      parent: angular.element(document.body),
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(answer) {
	      $scope.getRes();
        $scope.selected=[];
	    }, function() {
	      $scope.getRes();
        $scope.selected=[];
	    });
  };

  $scope.delete=function(){

  	console.log("selected row "+$scope.selected );

     var confirm = $mdDialog.confirm()
                  .title('Are you sure you want to delete this record?')
                  .textContent('Record will be deleted permanently.')
                  .ok('Yes')
                  .cancel('No');
                  $mdDialog.show(confirm).then(function() {
                          
                      DbService.del($scope.selected[0].RECEIPT_NO).then(function(res){

                            $mdDialog.show(
                                      $mdDialog
                                          .alert()
                                          .clickOutsideToClose(true)
                                          .title('Success')
                                          .content('Data Deleted Successfully!')
                                          .ok('Ok')
                                     ).finally(function() {
                                        $scope.selected=[];
                                        $scope.getRes();
                              });
                      })

                    }, function() {
                        $scope.selected=[];
                  });
  			
  }

  $scope.print=function(){
$rootScope.selectedId=$scope.selected[0].RECEIPT_NO;
    $state.go('print')
  	console.log("selected row "+$scope.selected );

  }
  $scope.getRes();

}]);

angular.module('app').config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
}])
	