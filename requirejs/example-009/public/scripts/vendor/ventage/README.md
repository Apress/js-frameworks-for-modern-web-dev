# Ventage

Ventage is a simple eventing library for JavaScript objects.

## Installation

Ventage may be installed as a bower package:

```
$ bower install ventage
```

In the browser it may be used:

- as a require.js AMD module
- as a direct script import

## Usage

### Creating Ventage objects

Ventage is designed to be used as a prototype for your custom objects. You can accomplish this in several ways.

#### as the prototype to a constructor function

```javascript
function View() {
  this.render = function () {
    this.trigger('rendering');
    // other code
    this.trigger('rendered');
  };
}

View.prototype = new Ventage();
```

#### by setting up the prototype chain manually

```javascript
var databaseObject = Object.create(new Ventage());
databaseObject.connect = function () {
    // connection code
    this.trigger('connected');
  }
};
```

#### by using the Ventage factory function

```javascript
var poll = Ventage.create({
  start: function () {
    var self = this;
    setInterval(function () {
      var result = self.ping('http://localhost');
      self.trigger('polled', result);
    }, 100);
  }
});
```

#### by instantiating Ventage objects directly

```javascript
var v = new Ventage();
v.on('foo', onFoo);
v.trigger('foo', 'bar');
```

### Using Ventage objects

Client objects can subscribe to events raised by Ventage objects.

```javascript
var v = new Ventage();
v.on('message', function (sender, content) {
  console.log('message from %s: %s', sender, content);
});
v.trigger('message', 334455, 'hello, world!');
```

#### subscribing to events

The `on()` method accepts three arguments:

- event name
- callback function
- (optional) context object

If a context argument is passed to the `on()` method, it will be used as the value of `this` within the callback function.

#### triggering events

The `trigger()` method accepts a single event name argument, and a variable number of data arguments that will be passed, in order, to any callback associated with the event.

By default, `trigger()` will invoke callbacks synchronously. To change this behavior, you can:

- pass a boolean value to the Ventage constructor to indicate whether the object should always trigger callbacks asynchronously; or
- invoke the `triggerAsync()` method manually when you want callbacks to be called asynchronously

The `triggerAsync()` method accepts the same arguments as `trigger()`.

#### unsubscribing from events

To unsubscribe from events, use the `off()` method. It takes three arguments:

- (optional) event name
- (optional) callback reference
- (optional) context object

If `off()` is called with no arguments, it will unsubscribe all callbacks from all events. This has the same effect as calling `clear()`.

If `off()` is called with an event name only, it will unsubscribe all callbacks from that event.

If `off()` is called with an event name and a callback reference, it will unsubscribe _only_ that callback from the event. If the callback was subscribed with a specific context, it is necessary to provide that context to the `off()` method to unsubscribe the callback.

#### piping events

Events may be piped from one Ventage instance to another. This means that events triggered on one instance will also be triggered, with the same arguments, on the other.

```javascript
var v1 = new Ventage();
var v2 = new Ventage();
var callbackHandle = v1.pipe('alert', v2);
v2.on('alert', function () {
  console.log('Danger, Will Robinson!');
});
v1.trigger('alert'); // v2 event will trigger as well
v1.off('alert', callbackHandle, v2);
```

The context for a piped event is always the receiving Ventage object (in the code above, `v2`).

The callback handle is returned from `pipe()` so that it may later be used to unsubscribe from the piped event.

#### subscribing to wildcard events

Currently Ventage supports a single wildcard event, `*`, which is invoked for any event triggered on a Ventage object.

```javascript
var v = new Ventage();
var count = 0;
v.on('*', function () {
  count += 1;
});
v.trigger('foo');
v.trigger('bar');
v.trigger('baz');
console.log(count); // 3
```

## License

[MIT License](LICENSE)