angular.module('app').controller('InsertController', ['$scope','DbService','$mdDialog','$state',function($scope,DbService,$mdDialog,$state){
	
	 $scope.user = {
    
	 	NAME:'',
	 	MOBILE:'',
	 	LIFE_MEM_NO:'',
	 	TRUSTEE_ACC_NO:'',
	 	ADDRESS:'',
	 	PINCODE:'',
	 	SEVAI_TYPE:'',
	 	GOTHRAM:'',
	 	STAR:'',
	 	RASI:'',
	 	AMOUNT:'',
	 	DATE:new Date()

    };

    $scope.sevaiList = [
					    	{desc:"s1"},
					    	{desc:"s2"},
					    	{desc:"s3"}
    				   ];



	$scope.saveDetail=function(){

					DbService.insert($scope.user).then(function(res){

						$mdDialog.show(
				                        $mdDialog
				                            .alert()
				                            .clickOutsideToClose(true)
				                            .title('Success')
				                            .content('Data Updated Successfully!')
				                            .ok('Ok')
				                       ).finally(function() {
				                       	$scope.user={};
								          	$state.go('home')
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
