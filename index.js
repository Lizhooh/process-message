const EventEmitter = require('events');

module.exports = class _ extends EventEmitter {

    constructor(who) {
        super();
        this.who = who;
        this.who.on('message', ({ event, args }) => {
            super.emit(event, ...args);
        });
    }

    on(event, callback) {
        if (typeof event === 'string' && event) {
            super.addListener(event, callback);
        }
        return this;
    }

    emit(event, ...args) {
        this.who.send({ event, args });
        return this;
    }
}