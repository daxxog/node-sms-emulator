/* node-sms-emulator / server.js
 * Example of using node-sms-emulator
 * (c) 2012 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var cs = require('coffeeshop'),
    dynamic = require('./dynamic.js');
    
cs.mode('production'); //set the mode to production for everything
cs.bind(); //bind the static directory to the app
cs.bind(dynamic); //bind the dynamic server to the app
cs.listen(7777); //listen on a lucky port number