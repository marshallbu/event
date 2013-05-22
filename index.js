var _Events = function() {};

/** Add a listener to an event designated _name_
*/
_Events.prototype.on = function(name,fn) {

	//Lazy instanciation of events object
	var events = this.events = this.events || {};

	//Lazy instanciation of specific event
  events[name] = events[name] || [];

  //Give it the function
  events[name].push(fn);

  return this;

};


/** Trigger event
*/
_Events.prototype.trigger = function(name, arg1, arg2 /** ... */) {

	//Only if events + this event exist...
  if(!this.events || !this.events[name]) return this;

  //Grab the listeners
  var listeners = this.events[name],
    //All arguments after the name should be passed to the function
  	args = Array.prototype.slice.call(arguments,1);

  function triggerFunction(fn) {
  	fn.apply(this,args);
  };

  if('forEach' in listeners) {
  	listeners.forEach(triggerFunction.bind(this)); //TODO bind necessary?
  } else {
  	for(var i in listeners) {
  	  if(listeners.hasOwnProperty(i)) triggerFunction(fn);
  	}
  }

  return this;

};

var Events = function() {
	return new _Events();
};

module.exports = Events;