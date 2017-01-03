
var connection =null;
    // Creates MySql database connection

	angular.module('app')
	        .service('DbService', ['$q','$state', DbService]);
		    
    function DbService($q,$state) {

	var mysql      = require('mysql');
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'temple'
	});


	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    $state.go('error')
	  }

	  console.log('connected as id ' + connection.threadId);
	});

        return {
            insert : insertDetails,
            search:searchDetails,
            del :deleteDetails,
            update : updateDetails,
            searchByNo:searchByNo
        };
      
		function insertDetails(obj){

			var deferred = $q.defer();
		  	var query = "INSERT INTO templeschema SET ?";
		    connection.query(query, obj, function (err, res){
		      if(err) deferred.reject(err);
		      console.log("inser id ------>"+res.insertId)
		            deferred.resolve(res.insertId);
		        });
		        return deferred.promise;
		}

		function searchDetails(){
		     var deferred = $q.defer();
		  	 connection.query('SELECT * FROM templeschema', function(err, rows, fields) {
				console.log("fetched ----")
		  	     if (err) deferred.reject(err);
		            deferred.resolve(rows);
		        });
		        return deferred.promise;
		 }

		 function searchByNo(id){
		  var deferred = $q.defer();
		  var query='SELECT * FROM templeschema where RECEIPT_NO = ?';
		  	 connection.query(query,[id], function(err, rows, fields) {
				console.log("fetched based on id----")
		  	     if (err) deferred.reject(err);
		            deferred.resolve(rows[0]);
		        });
		        return deferred.promise;
		 }

		function deleteDetails(id){
		 	  var deferred = $q.defer();
			  var query = "DELETE FROM templeschema WHERE RECEIPT_NO = ?";
			    connection.query(query, [id], function (err, res) {
			        if (err) deferred.reject(err);
			        console.log("deleted rows "+res.affectedRows);
			        deferred.resolve(res.affectedRows);
			   });
		        return deferred.promise;
		}


		function updateDetails(obj){

			var condition = {RECEIPT_NO:obj.RECEIPT_NO};
			var deferred = $q.defer();
			var query = connection.query('UPDATE templeschema SET ? WHERE ?', [obj, condition] , function(err, result) {
				console.log("updated ----")
			   	 if (err) deferred.reject(err);
		            deferred.resolve(result);
		        });
		        return deferred.promise;
		 }

		
	}	
