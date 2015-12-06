document.writeln('<b>Basics</b>');
// apply method
var array = [ 3, 4 ];
var add = function(a, b) {
	return (a + b);
};
var sum = add.apply(null, array);
document.writeln("sum = " + sum);

// another apply method
var Quo = function(string) {
	this.status = string;
};
// add function get_status to prototype
Quo.prototype.get_status = function() {
	return this.status;
};
var statusObject = {
	status : 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject);
document.writeln("status is = " + status);
// exception handling
var addTwo = function(a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name : 'TypeError',
			message : 'addTwo needs numbers'
		};
	}
	return a + b;
};
try {
	var addTwResult = addTwo(3, "something");
} catch (e) {
	document.writeln(e.name + ': ' + e.message);
}
// adding method
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};
Number.method('integer', function() {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});
document.writeln('-10 / 3 = ' + (-10 / 3).integer());
// closure 1
var myObject = function() {
	var value = 0;	
	return { // creates new object
		increment : function(inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue : function() {
			return value;
		}
	}
}();
var closure1 = myObject;
myObject.increment(2);
document.writeln('closure value = ' + myObject.getValue());
// module pattern with closures
// takes advantage of function scope and closure to create relationships that are
// binding and private, promotes information hiding and interface use
String.method('deentityify', function() {
	// the entity table, maps entity names to characters
	var entity = {
		quot : '"',
		lt : '<',
		gt : '>'
	};
	// return the deentityify method
	// only deentityify has access to entity data structure
	return function() {
		/*
		 * this is the deentityify method, it calls the string replace method,
		 * looking for substrings that start with & and end with ; if characters
		 * in between are in the entity table, then replace the entity with the
		 * character from the table
		 */
		return this.replace(/&([^&;]+);/g, function(a, b) {
			var r = entity[b];
			return typeof r == 'string' ? r : a;
		});
	};
}());
document.writeln('&lt;123_doesNotExistInEntityArray&quot;&gt;'.deentityify());	// <">
// curry
Function.method('curry', function() {
	var slice = Array.prototype.slice,
	args = slice.apply(arguments),
	that = this;
	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
});
var addThree = add.curry(1);
document.writeln('curry = ' + addThree(6));