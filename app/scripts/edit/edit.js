angular.module('app').controller('EditController', ['$scope','DbService','$mdDialog','$state','$rootScope',function($scope,DbService,$mdDialog,$state,$rootScope){
	
	 // $scope.user = {
    
	 // 	NAME:'',
	 // 	MOBILE:'',
	 // 	LIFE_MEM_NO:'',
	 // 	TRUSTEE_ACC_NO:'',
	 // 	ADDRESS:'',
	 // 	PINCODE:'',
	 // 	SEVAI_TYPE:'',
	 // 	GOTHRAM:'',
	 // 	STAR:'',
	 // 	RASI:'',
	 // 	AMOUNT:'',
	 // 	DATE:new Date(),
	 // 	RECEIPT_NO:''

  //   };


	DbService.searchByNo($rootScope.selectedId).then(function(res){

		console.log("edit input --->"+res.NAME);

		$scope.user=res;

	})    

    $scope.sevaiList = [
					    	{desc:"s1"},
					    	{desc:"s2"},
					    	{desc:"s3"}
    				   ];



    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };


	$scope.editDetail=function(){

					DbService.update($scope.user).then(function(res){

						$mdDialog.show(
				                        $mdDialog
				                            .alert()
				                            .clickOutsideToClose(true)
				                            .title('Success')
				                            .content('Data Updated Successfully!')
				                            .ok('Ok')
				                       ).finally(function() {
				                       		$rootScope.selectedId=null;	
				                       		$scope.cancel();
				                       	});
					})
	}

}])
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow
	 $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
   });
