'use strict';

const moment = require('moment');

module.exports = logger;

function logger() {

    console.log(moment().fromNow());
}
