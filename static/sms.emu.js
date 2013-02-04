/* node-sms-emulator / sms.emu.js
 * SMS emulator client
 * (c) 2012 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */
 
var socket = io.connect(window.location.origin);

Math.gendigits = function(dig) {
    return Math.round(Math.random()*Math.pow(dig, 10))
};

$(function() {
    var mod_number = function() {
        $('#smsout').focus();
        
        if($('#vnumber').html() == '') {
            $('#vnumber').html(Math.gendigits(10));
        }
        
        socket.on('sms.emu.to.'+$("#vnumber").html(), function (data) {
            $('<div></div>').html('<b>sms.emu: </b><pre>'+data+'</pre>').appendTo('#smsin');
        });
    }; mod_number();
    
    var _send = function() {
        var _cmd = $.trim($("#smsout").val());
        if(_cmd === ':clear' || _cmd === ':!'  || _cmd === ':1') {
            $('#smsin').html('');
        } else {
            $('<div></div>').html('<i>me: </i><pre>'+$('#smsout').val()+'</pre>').appendTo('#smsin');
            socket.emit('sms.emu.to.server', {
                number: $("#vnumber").html(),
                msg: $("#smsout").val()
            });
            socket.emit('sms.emu.to.server.from.'+$("#vnumber").html(), {
                number: $("#vnumber").html(),
                msg: $("#smsout").val()
            });
        }
        
        $('#smsout').val('');
        $('#smsout').focus();
    };
    
    $('#send').click(_send);
    
    var _ekcheck = function(e) {
        if(e.which === 13) {
            _send();
        }
    };
    
    var _checker = function() {
        $('#smsout').focus();
        
        if($("#senter").is(':checked')) {
            $('#smsout').on('keydown', _ekcheck);
        } else {
            $('#smsout').off('keydown', _ekcheck);
        }
    }; _checker(); $("#senter").click(_checker);
    
    $('#clear').click(function() {
        $('#smsin').html('');
    });
    
    $('#vnumber').click(function() {
        $('#vnumber').html(prompt('New #?', Math.gendigits(10)));
        mod_number();
    });
});