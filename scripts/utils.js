const sh = require('shelljs');

module.exports = {
    checkDependencies: (list) => {
        list.forEach((item) => {
            if (!sh.which(item)) {
                sh.echo(`---> Sorry, this script requires ${item}`);
                sh.exit(1);
            }
        });
    }
}