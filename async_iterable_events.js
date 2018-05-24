"use strict"

EventTarget.prototype.on = function(events = "" || [], options = {}, callback) {
 let target = this
 if(typeof(options) == "function") {
  callback = options
  options = {}
 }
 if(typeof(events) == "string") {
  events = [ events ]
 }
 let resolver, iterator
 let resolvers = [], results = []
 let removed = false
 function listener(value) {
  if(resolver) {
   resolver(value)
  }
  if(resolvers.length) {
   resolvers.shift()({ done: false, value })
  } else {
   results.push(value)
  }
  if(options.once) {
   iterator.return()
  }
  if(callback) {
   callback.call(target, value)
 } }
 for(let event of events) {
  target.addEventListener(event, listener, options)
 }
 return(Object.assign(new Promise(function(resolve) {
  resolver = resolve
 }), iterator = {
  async next() {
   if(results.length) {
    return({ done: false, value: results.shift() })
   } else if(removed) {
    return({ done: true, value: undefined })
   } else {
    return(new Promise(function(resolve) {
     resolvers.push(resolve)
  })) } },
  async return() {
   removed = true
   for(let event of events) {
    target.removeEventListener(event, listener, options)
   }
   return({ done: true, value: undefined })
  },
  [Symbol.asyncIterator]() {
   return(this)
} })) }