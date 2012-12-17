/* node-sms-emulator / sms.lib.emu.js
 * SMS library emulator for backend
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
    var sms = {};
    
    sms = function(io) {
        this.io = io;
    };
    
    sms.init = function(io) {
        return new sms(io);
    };
    
    sms.prototype.send = function(to, message, cb) {
        var socket = this.io.sockets;
        socket.emit('sms.emu.to.'+to, message);
        setTimeout(cb, 1);
    };
    
    sms.prototype.receive = function(from, cb) {
        var io = this.io;
        io.sockets.on('connection', function (socket) {
            if(from == '*') {
                socket.on('sms.emu.to.server', function (data) {
                    cb(data.number, data.msg);
                });
            } else {
                socket.on('sms.emu.to.server.from.'+from, function (data) {
                    cb(data.number, data.msg);
                });
            }
        });
    };
    
    return sms;
}));