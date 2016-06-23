var rabbit = require('wascally');
var settings = require('./config');

rabbit.configure(settings)
  .then(function() {
    rabbit.handle('event.#', function(message) {
      var body = message.body;
      console.log("");
      console.log("Message Received");
      console.log("Type: " + message.type);
      console.log(body);
      message.ack();
    });
    rabbit.startSubscription("analytics");
  }).then(undefined, handleError);


function handleError(err) {
  console.log(err.stack);
  process.exit();
}
