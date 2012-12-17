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
    
    sms = function(io, socket) {
        this.io = io;
        this._recieve_handle = {};
        var _this = this;
        
        if(typeof socket == 'object') {
            socket.on('sms.emu.to.server', function(data) {
                _this._receive(data);
            });
        } else {
            io.sockets.on('connection', function(socket) {
                socket.on('sms.emu.to.server', function(data) {
                    _this._receive(data);
                });
            });
        }
    };
    
    sms.init = function(io, socket) {
        return new sms(io, socket);
    };
    
    sms.prototype.send = function(to, message, cb) {
        var socket = this.io.sockets;
        socket.emit('sms.emu.to.'+to, message);
        setTimeout(cb, 1);
    };
    
    sms.prototype._receive = function(data) {
        if(typeof this._recieve_handle[data.number] == 'function') {
            this._recieve_handle[data.number](data);
        } else if(typeof this._recieve_handle['*'] == 'function') {
            this._recieve_handle['*'](data);
        }
    };
    
    sms.prototype.receive = function(from, cb) {
        if(typeof cb == 'string' && cb == 'unbind') {
            if(typeof this._recieve_handle[from] != 'undefined') {
                delete this._recieve_handle[from];
            }
        } else {
            this._recieve_handle[from] = function(data) {     
                cb(data.number, data.msg);
            };
        }
    };
    
    return sms;
}));