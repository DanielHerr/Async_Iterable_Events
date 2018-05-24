"use strict"

test("returns promise", function() {
 let promise = new EventTarget().on("test", { once: true })
 if(typeof(promise.then) != "function" || typeof(promise.catch) != "function") {
  throw("result should be a promise but is " + promise)
} })

test("returns async iterator", function() {
 let iterator = new EventTarget().on("test")
 if(typeof(iterator.next) != "function" || typeof(iterator.return) != "function") {
  throw("result should be an async iterator but is " + iterator)
} })

test("promise single event dispatch", async function() {
 let target = new EventTarget()
 let promise = target.on("test")
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 let result = await(promise)
 if(result.detail != 1) {
  throw("result should be event object with detail of 1 but is " + result)
} })

test("async iterator single event dispatch", async function() {
 let target = new EventTarget()
 let promise = target.on("test").next()
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 let result = (await(promise)).value
 if(result.detail != 1) {
  throw("result should be event object with detail of 1 but is " + result)
} })

test("async iterator multiple event dispatch", async function() {
 let target = new EventTarget()
 let iterator = target.on("test")
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 target.dispatchEvent(new CustomEvent("test", { detail: 2 }))
 let result1 = (await(iterator.next())).value
 let result2 = (await(iterator.next())).value
 if(result1.detail != 1 || result2.detail != 2) {
  throw("results should be events with details of 1 and 2 but are " + result1, result2)
} })

test("acync iterator once option multiple dispatch", async function() {
 let target = new EventTarget()
 let iterator = target.on("test", { once: true })
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 target.dispatchEvent(new CustomEvent("test", { detail: 2 }))
 let result1 = (await(iterator.next())).value
 let result2 = (await(iterator.next())).value
 if(result1.detail != 1 || result2 != null) {
  throw("results should be event object and undefined but are " + result1, result2)
} })

test("async iterator multiple event types", async function() {
 let target = new EventTarget()
 let iterator = target.on([ "test1", "test2" ])
 target.dispatchEvent(new CustomEvent("test1", { detail: 1 }))
 target.dispatchEvent(new CustomEvent("test2", { detail: 2 }))
 let result1 = (await(iterator.next())).value
 let result2 = (await(iterator.next())).value
 if(result1.type != "test1" || result2.type != "test2") {
  throw("results should be test1 and test2 event objects but are " + result1, result2)
} })

test("async iterator previous event queue", async function() {
 let target = new EventTarget()
 let iterator = target.on("test")
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 let result = (await(iterator.next())).value
 if(result.detail != 1) {
  throw("result should be event object with detail of 1 but is " + result)
} })

test("callback function multiple dispatch", function(pass, fail) {
 let target = new EventTarget()
 target.on("test", function(event) {
  if(event.detail == 1 || event.detail == 2) {
   pass()
  } else {
   fail("result should be an event object with detail of 1 or 2 but is " + event)
 } })
 target.dispatchEvent(new CustomEvent("test", { detail: 1 }))
 target.dispatchEvent(new CustomEvent("test", { detail: 2 }))
})