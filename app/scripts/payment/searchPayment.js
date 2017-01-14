angular.module('app').controller('SearchPaymentController', ['$scope','$state','PaymentDbService','$mdDialog',function($scope,$state,PaymentDbService,$mdDialog){


	$scope.date= new Date();
	$scope.serialNo=23;



	$scope.search={

		ACCT_NAME:"",
		CHEQUE_NO:"",
		DATE:"",
		BANK_NAME:""


	}

	$scope.items=[{

		DESCRIPTION:"",
		AMOUNT:""
	}];

	$scope.amount=$scope.items.AMOUNT;



	$scope.getTotalAmount=function(){

		$scope.amount=0;
		if($scope.result){
			for(var i=0;i<$scope.result.items.length;i++){
					if($scope.result.items[i].AMOUNT && $scope.result.items[i].AMOUNT!="" && !isNaN($scope.result.items[i].AMOUNT))
						$scope.amount+=parseInt($scope.result.items[i].AMOUNT);

			}
		}
		return $scope.amount;

	}	

		$scope.doSearch=function(){

			$scope.show=true;

			
							PaymentDbService.search($scope.search).then(function(res){

										$scope.result=res[0];

										if($scope.result){
											$scope.result.items=[]
											for(var i=0;i<res.length;i++)
												$scope.result.items.push(res[i]);
										}
							})

			}

}]);
