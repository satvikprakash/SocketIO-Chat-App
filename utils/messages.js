const moment = require('moment');

function formatMessage(userName, text) {
    return {
        userName,
        text,
        time: moment().format('h:mm a') // Example 1:22 PM
    };
}

module.exports = formatMessage;