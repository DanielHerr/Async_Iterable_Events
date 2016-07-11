"use strict"

test("returns listener", function() {
 let target = document.createTextNode("")
 let result = target.on("test", function() { })
 if(typeof(result) != "function") {
  throw("should be a function but is " + result)
} })

test("listener reference", function() {
 let target = document.createTextNode("")
 target.on("test", function() { })
 if(target.listeners.test.length != 1) {
  throw("target listeners should include 1 function but is " + target.listeners.test)
} })

test("adds listener", function(pass, fail) {
 let target = document.createTextNode("")
 target.on("test", function(event) {
  if(event) {
   pass()
  } else {
   fail("event should be an object but is " + event)
 } })
 target.dispatchEvent(new Event("test"))
})

test("removes listener", function(pass, fail) {
 let target = document.createTextNode("")
 let result = target.on("test", function(event) {
  fail("should remove listener but was called with " + event)
 })
 result.remove()
 target.dispatchEvent(new Event("test"))
 if(target.listeners.test == null) {
  pass()
 } else {
  fail("should remove reference but it is " + target.listeners.test)
} })

test("multiple events", function(pass, fail) {
 let target = document.createTextNode("")
 let first = true
 target.on([ "test1", "test2" ], function(event) {
  if(first) {
   first = false
  } else {
   pass()
 } })
 target.dispatchEvent(new Event("test1"))
 target.dispatchEvent(new Event("test2"))
})

test("once option", function(pass, fail) {
 let target = document.createTextNode("")
 let first = true
 target.on("test", { once: true }, function(event) {
  if(first) {
   first = false
   pass()
  } else {
   fail("should run once but ran twice with " + event)
 } })
 target.dispatchEvent(new Event("test"))
 target.dispatchEvent(new Event("test"))
})

test("promise if no listener and once", function(pass, fail) {
 let target = document.createTextNode("")
 let result = target.on("test", { once: true })
 result.then(function(event) {
  if(event) {
   pass()
  } else {
   fail("should resolve with event but event is " + event)
 } })
 target.dispatchEvent(new Event("test"))
})

test("push stream if no listener and not once", function() {
 throw("Planned for when streams release.")
})