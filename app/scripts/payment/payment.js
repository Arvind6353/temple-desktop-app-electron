angular.module('app').controller('PaymentController', ['$scope','$state','PaymentDbService','$mdDialog',function($scope,$state,PaymentDbService,$mdDialog){


	$scope.date= new Date();



	$scope.payment={

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


	$scope.addItem=function(){

		$scope.items.push({

			DESCRIPTION:"",
			AMOUNT:""

		});



	}

	$scope.getTotalAmount=function(){

		$scope.amount=0;
		for(var i=0;i<$scope.items.length;i++){
				if($scope.items[i].AMOUNT && $scope.items[i].AMOUNT!="" && !isNaN($scope.items[i].AMOUNT))
					$scope.amount+=parseInt($scope.items[i].AMOUNT);

		}
		return $scope.amount;

	}	


$scope.pay=function(){

		console.log($scope.items.length)

		for(var i=0;i<$scope.items.length;i++){

				$scope.payment.DESCRIPTION="";
				$scope.payment.AMOUNT=0;


				$scope.payment.DESCRIPTION=$scope.items[i].DESCRIPTION;
				
				if(!isNaN($scope.items[i].AMOUNT))
					$scope.payment.AMOUNT=parseInt($scope.items[i].AMOUNT);


					PaymentDbService.insert($scope.payment).then(function(res){

								if(i==$scope.items.length){
									$scope.$broadcast("Inserted",[]);
									}

					})

		}

		
		$scope.$on("Inserted",function(data){

			if(!$scope.called){
				$scope.called=true;
				$mdDialog.show(
	                        $mdDialog
	                            .alert()
	                            .clickOutsideToClose(true)
	                            .title('Success')
	                            .content('Payment Data Updated Successfully!')
	                            .ok('Ok')
	                       ).finally(function() {
	                       	$scope.payment={};
	                       	$scope.items=[];
					          	$state.go('home')
					        });

	       }                
		})
	


	}

}]);
