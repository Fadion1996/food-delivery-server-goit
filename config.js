const EventEmitter = require('events');

var url= 'http://qwe.com'

class Logger extends EventEmitter {
     log(message) {
        // Send http
        console.log(message);

        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

module.exports = Logger;