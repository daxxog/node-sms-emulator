/* node-sms-emulator / server.js
 * Example of using node-sms-emulator
 * (c) 2012 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function() {
    var dynamic = {};
    
    dynamic.bind = function(app, express, io, data) {
        var sms = require('./sms.lib.emu.js').init(io);
        
        var _tryworld = false;
        sms.receive(function(from, msg) {
            if(_tryworld === false) {
                sms.send(from, from+' said "'+msg+'"');
                if(msg === 'hello') {
                    sms.send(from, 'please say world');
                    _tryworld = true;
                } else {
                    sms.send(from, 'please say hello');
                }
            } else if(_tryworld === true) {
                if(msg === 'world') {
                    sms.send(from, 'thank you '+from+' :)');
                    _tryworld = false;
                } else {
                    sms.send(from, 'you monster!');
                    _tryworld = false;
                }
            }
        });
    };
    
    return dynamic;
}));