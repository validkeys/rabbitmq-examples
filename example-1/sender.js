var rabbit = require('wascally');
var settings = require('./config');

// Routing Key vs. Type Key
// The routing key ensures that the message is delivered to the right queue
// The type key is an additional wascally feature that ensures the right handler
// in your code receives the message. This saves you from having to do things like
// switch statements based on the routing key to determine what handler to use
// see: https://github.com/LeanKit-Labs/wascally/issues/48#issuecomment-76402033

rabbit.configure(settings)
  .then(function() {
    rabbit.publish('events', {
      routingKey: 'event.user.created',
      type: "event.user.created",
      body: {
        msg: "user created"
      }
    });
    rabbit.publish('events', {
      routingKey: 'event.user.updated',
      type: "event.user.updated",
      body: {
        msg: "user updated!"
      }
    });
    rabbit.publish('events', {
      routingKey: 'event.user.deleted',
      type: "event.user.deleted",
      body: {
        msg: "user deleted!"
      }
    });

  }).then(undefined, handleError);


function handleError(err) {
  console.log(err.stack);
  process.exit();
}
