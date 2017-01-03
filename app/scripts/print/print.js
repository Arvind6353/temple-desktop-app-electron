angular.module('app').controller('PrintController', ['$scope','DbService','$mdDialog','$state','$rootScope',function($scope,DbService,$mdDialog,$state,$rootScope){

$scope.text="from scope the text ";

DbService.searchByNo($rootScope.selectedId).then(function(res){

	$scope.row=res;
	$scope.row.DATE= moment(res.DATE).format("MM/DD/YYYY");

	//document.getElementById("RECEIPT_NO").innerHTML=$scope.row.RECEIPT_NO +"sdasd" ;

	console.log($scope.row.DATE);

})

 var electron = require('electron');
var dialog = require('electron').remote.dialog 
var BrowserWindow = require('electron').remote.BrowserWindow;

var fs = require('fs');
var ipcMain = require('electron').remote.ipcMain
var mainWindow=require('electron').remote.BrowserWindow.getFocusedWindow();

$scope.print=function(){

document.getElementById('printButton').style.display='none'
//createAboutWindow();
//openFileHandler();

window.localStorage.setItem("print",document.getElementById("print").innerHTML);
exportAsPdfHandler();
//createAboutWindow();
/*
return;

$scope.isPrint=true;

		var fs = require('fs'),
	    convertFactory = require('electron-html-to');
	 
	var conversion = convertFactory({
	  converterPath: convertFactory.converters.PDF
	});
	 
	conversion({ html: document.getElementById("print").innerHTML }, function(err, result) {
	  if (err) {
	    return console.error(err);
	  }
	document.getElementById('printButton').style.display='block'
	  alert(result.numberOfPages);
	  //result.stream.pipe(fs.createWriteStream('C:\\Users\\Admin\\Desktop\\temple.pdf'));
	  //conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details 



	});
*/
}


function saveAsFileHandler() {
  mainWindow.webContents.send('get-editor-content');

  ipcMain.once('editor-content', function(event, arg) {
    fileName = dialog.showSaveDialog({ filters: [{ name: 'markdown', extensions: ['md'] }]});

    if (fileName !== undefined) {
    
      return fileName;
    }
  });
}



function openFileHandler () {
  dialog.showOpenDialog({ filters: [{ name: 'markdown', extensions: ['md'] }]}, function (fileNames) {
    if (fileNames === undefined) return;
    fileName = fileNames[0];
    fs.readFile(fileName, 'utf-8', function (err, data) {
      mainWindow.webContents.send('load-file', data);
      
    });
  });
}



function exportAsPdfHandler() {
//  mainWindow.webContents.send('get-output-content');

    let pdfFileName = dialog.showSaveDialog({ filters: [{ name: 'pdf', extensions: ['pdf'] }]});

    if (pdfFileName !== undefined) {
      let pdfWindow = new BrowserWindow({ show: false ,webPreferences: {alwaysOnTop: true ,allowDisplayingInsecureContent :true,allowRunningInsecureContent :true} } );
 
     
      pdfWindow.loadURL(__dirname + '/scripts/print/pdfprint.html');

      pdfWindow.webContents.on("did-finish-load", function() {
        pdfWindow.webContents.printToPDF({ printBackground: true }, function(error, data) {
          if (error) throw error;

          fs.writeFile(pdfFileName, data, function(err) {
            if (err) {
              return dialog.showErrorBox('Unable to export as PDF', err.message);
            }

			$mdDialog.show(
	                        $mdDialog
	                            .alert()
	                            .clickOutsideToClose(true)
	                            .title('Success')
	                            .content('PDF exported Successfully!')
	                            .ok('Ok')
	                       ).finally(function() {
	        						document.getElementById('printButton').style.display='block';
					        });

          	
          })
        })
      });
    }
  
}




function createAboutWindow() {
  
  var  aboutWindow = new BrowserWindow({ width: 800, height: 600, frame: true,
                                      resizable: false,
                                      webPreferences: {javascript:true,alwaysOnTop: true ,allowDisplayingInsecureContent :true,allowRunningInsecureContent :true} } );


   global.sharedObject = {
       
        body: document.getElementById('print').innerHTML
      };

    aboutWindow.loadURL(__dirname + '/scripts/print/pdfprint.html');
    
    document.getElementById('printButton').style.display='block'
    aboutWindow.on('closed', function () {
      aboutWindow = null;
    });
  
}


	

}]);
