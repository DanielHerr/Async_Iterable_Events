# On
Improves events with multiple registration, retrievable listeners, easier removal, and single run support.

Usage:
```
target.on("event", function(event) { })
target.listeners.event[0](new Event("event"))
target.listeners.event[0].remove()
target.on("event", function(event) { }).remove()
target.on([ "event1", "event2" ], function(event) { })
target.on("event", { once: true }, function(event) { })
target.on("event", { once: true }).then(function(event) { })
```

<a href="https://danielherr.github.io/On/tests.html">Run Tests</a>
