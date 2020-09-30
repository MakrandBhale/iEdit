         
          const BrowserWindow = require('electron').remote.BrowserWindow;
          var child_process = require('child_process');         
          var exec = require('child_process').exec,child;
          var fs = require('fs');
          var remote = require('electron');
          var shell = require('electron').shell;
          const {Menu, MenuItem} = require('electron').remote;
          const {dialog} = require('electron').remote

          var mkdirp = require('mkdirp');           
          const session = require('electron').session;
          const {ipcRenderer} = require('electron');
          
          
          var currentmode;
          var timer;
          var svfullfileName;
          var svfilepath;
          var svfilename;
          var dest;
             

          var template = [
             
            {
              label: 'File',
              submenu:[
                {
                  label: 'Open',
                  accelerator: 'Ctrl+O',
                  click: function openFile () {
                          clearTimeout(timer);
                         dialog.showOpenDialog({ filters: [
                           { name: 'All Files', extensions: ['*'] },
                           {name: 'HTML Files', extensions: ['html']},
                           { name: 'Text Files', extensions: ['txt'] },
                           {name: 'JavaScript Files', extensions: ['js']},
                           {name: 'Python Files', extensions: ['py']},
                           {name: 'C Files', extensions: ['c']},
                           {name: 'C++ Files', extensions: ['cpp']},
                           {name: 'Text Files', extensions: ['txt']},
                           {name: 'Java Files', extensions: ['java','class']},
                           {name: 'Text Files', extensions: ['txt']},
                           {name: 'C# Files', extensions: ['cs']}

                          ]}, function (fileNames) {
                            console.log(fileNames)
                          if (fileNames === undefined) return;
                          var fileName = fileNames[0];
                          fs.readFile(fileName, 'utf-8', function (err, data) {
                            editor.doc.setValue(data);
                          });
                         });
                        }
                },
                {
                  label: 'Save File',
                  accelerator: 'Ctrl+S',
                  click: function saveFile () {
                        dialog.showSaveDialog({ filters: [
                          { name: 'All Files', extensions: ['*'] },
                          {name: 'HTML Files', extensions: ['html']},
                          { name: 'Text Files', extensions: ['txt'] },
                          {name: 'JavaScript Files', extensions: ['js']},
                          {name: 'Python Files', extensions: ['py']},
                          {name: 'C Files', extensions: ['c']},
                          {name: 'C++ Files', extensions: ['cpp']},
                          {name: 'Text Files', extensions: ['txt']},
                          {name: 'Java Files', extensions: ['java','class']},
                          {name: 'Text Files', extensions: ['txt']},
                          {name: 'C# Files', extensions: ['cs']}
                          ]}, function (fileName) {
                          var auto = fileName;
                          svfullfileName = fileName;
                          var data = editor.doc.getValue();
                          
                          timer = setInterval(function (){fs.writeFile(fileName,editor.doc.getValue());},100);
                                                             
                                                    
                        });
                       
                      }
                },
                {
                type: 'separator'
                },
                {
                  label: 'Print',
                  accelerator: 'Ctrl+p',
                  click : function print(){
                    var text = document.getElementById("code");
                    window.print(text);
                  }
                },
                {
                  type: 'separator'
                },
                {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
                },
                {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
                },
                
              ]
            },
            {
            label: 'Edit',
            submenu: [
               
              {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                //role: 'undo'
                click: function undo(){
                  editor.execCommand('undo');
                }
              },
              {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                click: function redo(){
                  editor.execCommand('redo');
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
              },
              {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
              },
              {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
                
              },
              {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                click: function select(){
                  editor.execCommand('selectall');
                }
              },
              {
                type: 'separator'
              },
              {
                label : 'Find',
                accelerator : 'Ctrl+F',
                click : function(){
                  CodeMirror.commands.find(editor);
                }
              },
              {
                label : 'Find Next',
                accelerator : 'Ctrl+G',
                click : function(){
                  editor.execCommand('findNext');
                }
              },
              {
                label : 'Find Previous',
                accelerator : 'Shift+Ctrl+G',
                click : function(){
                  editor.execCommand('findPrev');
                }
              },
              {
                type: 'separator'
              },
              {
                label : 'Replace',
                accelerator : 'Shift+Ctrl+F',
                click : function(){
                  editor.execCommand('replace');
                }
              },
              {
                label : 'Replace All',
                accelerator : 'Shift+Ctrl+R',
                click : function(){
                  editor.execCommand('replaceAll');
                }
              },
              
            ]
          },
          {
            label: 'View',
            submenu: [
              
               
              {
               label: 'Themes',
               submenu: [
                 {
                   label: 'Monokai',
                   type: 'radio',
                   checked: true,
                   click: function (){editor.setOption('theme','monokai');}
                 },
                 {
                   label: 'Cobalt',
                   type: 'radio', 
                   click: function (){editor.setOption('theme','cobalt');}
                 },
                 {
                   label: '3024-Day',
                   type: 'radio',
                   click: function (){editor.setOption('theme','3024-day');}
                 },
                 {
                   label: '3024-Night',
                   type: 'radio',
                   click: function (){editor.setOption('theme','3024-night');}
                 },
                 {
                   label: 'abcdef',
                   type: 'radio',
                   click: function (){editor.setOption('theme','abcdef');}
                 },
                 {
                   label: 'Ambiance',
                   type: 'radio',
                   click: function (){editor.setOption('theme','ambiance');}
                 },
                 {
                   label: 'icecoder',
                   type: 'radio',
                   click: function (){editor.setOption('theme','icecoder');}
                 },
                 {
                   label: 'base16-dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','base16-dark');}
                 },
                 {
                   label: 'base16-light',
                   type: 'radio',
                   click: function (){editor.setOption('theme','base16-light');}
                 },
                 {
                   label: 'bespin',
                   type: 'radio',
                   click: function (){editor.setOption('theme','bespin');}
                 },
                 {
                   label: 'blackboard',
                   type: 'radio',
                   click: function (){editor.setOption('theme','blackboard');}
                 },
                 {
                   label: 'colorforth',
                   type: 'radio',
                   click: function (){editor.setOption('theme','colorforth');}
                 },
                 {
                   label: 'dracula',
                   type: 'radio',
                   click: function (){editor.setOption('theme','dracula');}
                 },
                 {
                   label: 'eclipse',
                   type: 'radio',
                   click: function (){editor.setOption('theme','eclipse');}
                 },
                 {
                   label: 'elegant',
                   type: 'radio',
                   click: function (){editor.setOption('theme','elegant');}
                 },
                 {
                   label: 'erlang-dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','erlang-dark');}
                 },
                 {
                   label: 'hopscotch',
                   type: 'radio',
                   click: function (){editor.setOption('theme','hopscotch');}
                 },
                 {
                   label: 'isotope',
                   type: 'radio',
                   click: function (){editor.setOption('theme','isotope');}
                 },
                 {
                   label: 'lesser-dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','lesser-dark');}
                 },
                 {
                   label: 'liquibyte',
                   type: 'radio',
                   click: function (){editor.setOption('theme','liquibyte');}
                 },
                 {
                   label: 'material',
                   type: 'radio',
                   click: function (){editor.setOption('theme','material');}
                 },
                 {
                   label: 'neat',
                   type: 'radio',
                   click: function (){editor.setOption('theme','neat');}
                 },
                 {
                   label: 'neo',
                   type: 'radio',
                   click: function (){editor.setOption('theme','night');}
                 },
                 {
                   label: 'paraiso-dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','paraiso-dark');}
                 },
                 {
                   label: 'paraiso-light',
                   type: 'radio',
                   click: function (){editor.setOption('theme','paraiso-light');}
                 },
                 {
                   label: 'Pastel on Dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','pastel-on-dark');}
                 },
                 {
                   label: 'railscasts',
                   type: 'radio',
                   click: function (){editor.setOption('theme','railscasts');}
                 },
                 {
                   label: 'rubyblue',
                   type: 'radio',
                   click: function (){editor.setOption('theme','rubyblue');}
                 },
                 {
                   label: 'seti',
                   type: 'radio',
                   click: function (){editor.setOption('theme','seti');}
                 },
                 {
                   label: 'solarized',
                   type: 'radio',
                   click: function (){editor.setOption('theme','solarized');}
                 },
                 {
                   label: 'the Matrix',
                   type: 'radio',
                   click: function (){editor.setOption('theme','the-matrix');}
                 },
                 {
                   label: 'Tomorrow Night Bright',
                   type: 'radio',
                   click: function (){editor.setOption('theme','tomorrow-night-bright');}
                 },
                 {
                   label: 'Tomorrow Night Eighties',
                   type: 'radio',
                   click: function (){editor.setOption('theme','tomorrow-night-eighties');}
                 },
                 {
                   label: 'ttcn',
                   type: 'radio',
                   click: function (){editor.setOption('theme','ttcn');}
                 },
                 {
                   label: 'twilight',
                   type: 'radio',
                   click: function (){editor.setOption('theme','twilight');}
                 },
                 {
                   label: 'Vibrant Ink',
                   type: 'radio',
                   click: function (){editor.setOption('theme','vibrant-ink');}
                 },
                 {
                   label: 'XQ Dark',
                   type: 'radio',
                   click: function (){editor.setOption('theme','xq-dark');}
                 },
                 {
                   label: 'XQ Light',
                   type: 'radio',
                   click: function (){editor.setOption('theme','xq-light');}
                 },
                 {
                   label: 'Yeti',
                   type: 'radio',
                   click: function (){editor.setOption('theme','yeti');}
                 },
                 {
                   label: 'Zenburn',
                   type: 'radio',
                   click: function (){editor.setOption('theme','zenburn');}
                 },
               ]
               
              
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
            ]
          },
     
          {
            label:'Run',
            submenu:[
            {   
                label:'Run HTML',
                accelerator: 'CmdOrCtrl+R',
                click: function runcode(){
                  editor.setOption('mode','htmlmixed');
                  var rdata = editor.doc.getValue()
                  var rfname = Math.random() + '.html';    
                  var rfpath = 'C:\\iEdit\\html\\';
                  var rfull = rfpath + rfname
                  var mkdirp = require('mkdirp');
                    mkdirp(rfpath, function(err) { 
                    });
                  fs.writeFile(rfull, rdata, function (err) {
                    if (err) throw err
                  });
                    var winhtml = new BrowserWindow({ width: 800, height: 600});
                    winhtml.setTitle('Output');
                    winhtml.setMenu(null);
                    winhtml.loadURL('file://' + rfull)
                    winhtml.show();
                    winhtml.on('closed', function() {
                    winhtml = null;
                    });
              }
            },
            {
              label: 'Run C',
              accelerator: 'Ctrl+Shift+C',
              click: function runc(){
                        editor.setOption('mode','text/x-csrc');
                        var data = editor.doc.getValue()
                        var svfilepath = "C:\\iEdit\\C\\"
                        var svfilename = Math.random() + '.c'
                        mkdirp(svfilepath, function(err){})
                        fs.writeFile(svfilepath+svfilename,data,function(err){});
                                      
                           
                                                
                          var bfile = svfilepath +'\\config.bat';
                         
                          var commands = "@echo off & cd "+svfilepath+" & gcc "+svfilename+" -o "+svfilename+".exe & If exist "+svfilename+".exe start "+svfilename+".exe";
                          fs.writeFile(bfile, commands, function (err) {});
                          
                          var one = svfilepath +'\\one.bat';
                          var onec = "@echo off & start "+bfile + " & exit";
                          fs.writeFile(one,onec, function (err) {});
                          child_process.exec(one);
                    }
                
              
              
                  
            },
            
            {
              label: 'Run C++',
              //accelerator: 'CtrlShift+C',
              click: function runcpp(){
                        editor.setOption('mode','text/x-c++src');
                        var data = editor.doc.getValue()
                        var svfilepath = "C:\\iEdit\\Cpp\\"
                        var svfilename = Math.random() + '.cpp'
                        mkdirp(svfilepath, function(err){})
                        fs.writeFile(svfilepath+svfilename,data,function(err){});
                                      
                           
                                                
                          var bfile = svfilepath +'\\config.bat';
                         
                          var commands = "@echo off & cd "+svfilepath+" & g++ "+svfilename+" -o "+svfilename+".exe & If exist "+svfilename+".exe start "+svfilename+".exe";
                          fs.writeFile(bfile, commands, function (err) {});
                          
                          var one = svfilepath +'\\one.bat';
                          var onec = "@echo off & start "+bfile + " & exit";
                          fs.writeFile(one,onec, function (err) {});
                          child_process.exec(one);
                        
                
              }
              
                  
            },
            {
                label: 'Python',
                click: function pyexec() {
                        editor.setOption('mode','python');
                        var data = editor.doc.getValue()
                        var svfilepath = "C:\\iEdit\\Python\\"
                        var svfilename = Math.random() + '.py'
                        mkdirp(svfilepath, function(err){})
                        fs.writeFile(svfilepath+svfilename,data,function(err){});
                                      
                           
                                                
                          var bfile = svfilepath +'\\config.bat';
                         
                          var commands = "@echo off & cd "+svfilepath+" & python "+svfilename;
                          fs.writeFile(bfile, commands, function (err) {});
                          
                          var one = svfilepath +'\\one.bat';
                          var onec = "@echo off & start "+bfile + " & exit";
                          fs.writeFile(one,onec, function (err) {});
                          child_process.exec(one);
                }  
            },
            ]
            },
          {
            label: 'Project',
            submenu:[
              {
                label: 'Plain Text',
                type: 'radio',
                checked: true,
                click: function plain(){
                  editor.setOption('mode','text/plain');
                  editor.doc.setValue("");
                  }
              },
              {
                label: 'HTML',
                type: 'radio',
                click: function HTML(){
                  editor.setOption('mode','htmlmixed');
                  fs.writeFile('mode.ini','html',function(err,data){})
                 //var fileName = "C:\\ProgramData\\iEdit\\html.xml"
                 //fs.readFile(fileName, 'utf-8', function (err, data) {
                 //editor.doc.setValue(data);
                 //});
                  
                  }
              },
              {
                label: 'JavaScript',
                type: 'radio',
                click: function js(){editor.setOption('mode','javascript');
                        fs.writeFile('mode.ini','javascript',function(err,data){})
                        
                        
                    }
              },
              {
                label: 'CSS',
                type: 'radio',
                click: function css(){editor.setOption('mode','css');}
              },
              {
                label: 'Python',
                type: 'radio',
                click: function py(){editor.setOption('mode','python');}
              },
              {
                label: 'C',
                type: 'radio',
                click: function clang(){
                  editor.setOption('mode','text/x-csrc');
               
                  }
              },
              {
                label: 'C++',
                type: 'radio',
                click: function cpp(){
                  editor.setOption('mode','text/x-c++src');
                  
                 
                 }
              },
              {
                label: 'Java',
                type: 'radio',
                click: function java(){
                 editor.setOption('mode','text/x-java');
                 
 
                }
              },
              {
                label: 'C#',
                type: 'radio',
                click: function csharp(){editor.setOption('mode','text/x-csharp');}
              },
              {
                label: 'VB',
                type: 'radio',
                click: function vb(){editor.setOption('mode','text/x-vb');}
              },
              {
                label: 'VBScript',
                type: 'radio',
                click: function vbscript(){editor.setOption('mode','text/vbscript');}
              },
              {
                label: 'BrainFuck',
                type: 'radio',
                click: function brainfuck(){editor.setOption('mode','text/x-brainfuck');}
              },
              {
                label: 'CoffeeScript',
                type: 'radio',
                click: function coffee(){editor.setOption('mode','text/x-coffeescript');}
              },
              {
                label: 'Django',
                type: 'radio',
                click: function django(){editor.setOption('mode','text/x-django');}
              },
              {
                label: 'Pascal',
                type: 'radio',
                click: function pascal(){editor.setOption('mode','text/x-pascal');}
              },
              {
                label: 'Perl',
                type: 'radio',
                click: function perl(){editor.setOption('mode','text/x-perl');}
              },
              {
                label: 'PHP',
                type: 'radio',
                click: function php(){editor.setOption('mode','text/x-php');}
              },
              {
                label: 'Ruby',
                type: 'radio',
                click: function ruby(){editor.setOption('mode','text/x-ruby');}
              },
              {
                label: 'sass',
                type: 'radio',
                click: function sass(){editor.setOption('mode','text/x-sass');}
              },
              {
                label: 'Shell',
                type: 'radio',
                click: function shell(){editor.setOption('mode','text/x-sh');}
              },
              {
                label: 'SQL',
                type: 'radio',
                click: function sql(){editor.setOption('mode','text/x-sql');}
              },
              
              
              
              
              
              
              
              ]
          },
     
               
          {
            label: 'Help',
            role: 'help',
            submenu: [
              {
                label: 'Learn More',
                click: function() { require('shell').openExternal('http://electron.atom.io') }
              },
            ]
          },
        ];

        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
     
     