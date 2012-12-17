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
    $('#smsout').focus();
    
    if($('#vnumber').html() == '') {
        $('#vnumber').html(Math.gendigits(10));
    }
    
    socket.on('sms.emu.to.'+$("#vnumber").html(), function (data) {
        $('<div></div>').html('<b>sms.emu: </b>'+data).appendTo('#smsin');
    });
    
    $("#send").click(function() {
        $('<div></div>').html('<i>me: </i>'+$("#smsout").val()).appendTo('#smsin');
        socket.emit('sms.emu.to.server', {
            number: $("#vnumber").html(),
            msg: $("#smsout").val()
        });
        
        $("#smsout").val('');
        $('#smsout').focus();
    });
});