"use strict"

EventTarget.prototype.on = function(event = [] || "", options = {}, listener) {
 let target = this
 if(listener == undefined && typeof(options) == "function") {
  listener = options
  options = {}
 }
 if(typeof(event) == "string") {
  let promise
  if(options.once) {
   if(listener == null) {
    promise = new Promise(function(resolve) {
     listener = resolve
    })
   } else {
    let listenersource = listener.toString()
    listener = new Proxy(listener, {
     apply(target, that, inputs) {
      listener.remove()
      return(Reflect.apply(target, that, inputs))
    } })
    listener.toString = function() {
     return(listenersource)
  } } }
  listener.target = target
  listener.event = event
  listener.options = options
  listener.remove = function() {
   target.removeEventListener(event, listener, options)
   target.listeners[event].splice(target.listeners[event].indexOf(listener), 1)
   if(target.listeners[event].length == 0) {
    delete(target.listeners[event])
  } }
  target.addEventListener(event, listener, options)
  if(target.listeners == null) {
   target.listeners = {}
  }
  if(target.listeners[event] == null) {
   target.listeners[event] = []
  }
  target.listeners[event].push(listener)
  return(promise || listener)
 } else {
  let events = event
  let listeners = []
  for(let event of events) {
   let listenersource = listener.toString()
   let newlistener = new Proxy(listener, {})
   newlistener.toString = function() {
    return(listenersource)
   }
   listeners.push(target.on(event, options, newlistener))
  }
  return(listeners)
} }
