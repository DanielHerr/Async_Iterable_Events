"use strict"

EventTarget.prototype.on = function(events = [] || "", options = {}, listener) {
 let target = this
 if(listener == undefined && typeof(options) == "function") {
  listener = options
  options = undefined
 }
 if(typeof(events) == "string") {
  events = [ events ]
 }
 for(let event of events) {
  function newlistener(...inputs) {
   return(listener.apply(this, inputs))
  }
		newlistener.remove = function() {
   target.removeEventListener(this.event, newlistener, this.options)
   target.listeners[this.event].splice(target.listeners[this.event].indexOf(newlistener), 1)
   if(target.listeners[this.event].length == 0) {
    delete(target.listeners[this.event])
  } }
  Object.defineProperties(newlistener, {
   name: {
    value: listener.name, configurable: true
   }, length: {
    value: listener.length, configurable: true
  } })
  target.addEventListener(event, newlistener, options)
  if(target.listeners == null) {
   target.listeners = {}
  }
  if(target.listeners[event] == null) {
   target.listeners[event] = []
  }
  newlistener.event = event
  newlistener.options = options
  target.listeners[event].push(newlistener)
} }