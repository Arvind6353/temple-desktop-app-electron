    angular.module('app').controller('MenuController', 
 ['$scope','$rootScope','$state','$http','$location', function($scope,$rootScope,$state,$http,$location){


var remote = require('electron').remote;

var Menu = remote.Menu;


    var template = [
        {
            label: 'Application',
            submenu: [

            	{
                    label: 'Home',
                    accelerator: 'CmdOrCtrl+I',
                    role: 'home',
                     click: function(){

                        $state.go("home");
                    }
                },



                {
                    label: 'Insert',
                    accelerator: 'CmdOrCtrl+I',
                    role: 'insert',
                     click: function(){

                        $state.go("insert");
                    }
                },

                {
                    label: 'Search',
                    role: 'search',
                     click: function(){

                        $state.go("search");
                    }
                },

               
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'close'
                }

            ]
        },
        {
            label: 'Dev',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                }
            ]
        }
    ];

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}])
