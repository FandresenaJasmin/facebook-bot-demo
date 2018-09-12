const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.text) {
            // now we will take the text recieved and send it to an food tracking API.
            let message = message.text;
            var request = require("request");

            let options = {
                method: 'POST',
                url: 'https://mefit-preprod.herokuapp.com/api/getnutritionvalue',
                headers:
                {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                },
                body:
                {
                    userID: process.env.USERID,
                    searchTerm: message
                },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log(body);
            });

        }
    }
}