node-sms-emulator
=================

Emulate sending / receiving text messages with a generic API.

This is NOT a Sega Master System Emulator. This is a Short Message Service API emulator.

Install
-------
node-sms-emulator is designed for the [coffeeshop.js](https://github.com/daxxog/coffeeshop.js) framework. If you don't want to use coffeeshop.js, fork this repo.
```bash
npm install https://github.com/daxxog/node-sms-emulator/tarball/master
```

Usage
-----
in your server.js file (or whatever you call your main file)
```javascript
cs.bind('sms-emulator', 'npm'); //bind sms-emulator to the app
```

in your dynamic.js (or whatever you call your dynamic server)
```javascript
dynamic.bind = function(app, express, io, data) {
    var sms = require('sms-emulator').init(io); //require the sms-emulator library and pass io to it
    sms.receive('*', function(from, msg) { //from any number
        sms.send(from, from+' said "'+msg+'"'); //send a message (tonumber, msg, cb(err))
    });
    sms.receive('5555555555', function(from, msg) { //from a certain number
        sms.send(from, 'What kind of number is that?'); //send a message (tonumber, msg, cb(err))
    });
};
```

then just load up the client (looks good on iPhone too!)
```
http://YOUR_HOST:YOUR_PORT/sms-emu.html
```
