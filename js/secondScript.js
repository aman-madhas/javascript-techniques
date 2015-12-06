/* INHERITANCE */
document.writeln('<b>Inheritance</b>');
// example 1: simple inheritance using function new
Function.method('new', function() {
	// create a new object that inherits from the constructor's prototype
	var that = Object.beget(this.prototype);
	// invoke constructor, binding this to new object
	var other = this.apply(that, arguments);
	// if it's return value isn't an object substitute the new object
	return (typeof other === 'object' && other) || that;
});
var Mammal  = function(name) {
	this.name = name;
};
Mammal.prototype.get_name = function() {
	return this.name;
};
Mammal.prototype.says = function() {
	return this.saying || '';
};
// now we make an instance
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();
document.writeln('mammal name = ' + name);
// example 2: inheritance and unique function
var mammal = function(spec) {
	var that = {};
	that.get_name = function() {
		return spec.name;
	};
	that.says = function() {
		return spec.saying || '';
	};
	return that;
};
var myMammal = mammal({name: 'Herb'});
var cat = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function(n) {
		var i, s = '';
		for (i = 0; i < n; i += 1) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function() {
		return that.says() + ' ' + spec.name + ' ' + that.says();		
	};
	return that;
};
var myCat = cat({name: 'Henrietta'});
document.writeln('cat: ' + myCat.purr(5));
// example 3: super functions
Object.method('superior', function(name) {
	var that = this,
	method = that[name];
	return function() {
		return method.apply(that, arguments);
	};
});
var coolcat = function(spec) {
	var that = cat(spec),
	super_get_name = that.superior('get_name');
	that.get_name = function(n) {
		return 'like ' + super_get_name() + ' baby';
	};
	return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
document.writeln('myCoolCat: ' + name);