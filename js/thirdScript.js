/* METHODS */
// join + push
var a = ['a', 'b', 'c'];
a.push('d');
var c = a.join('');
document.writeln('c: ' + c);
// pop
Array.method('pop', function() {
	return this.splice(this.length -1, 1)[0];
});
var d = a.pop();
document.writeln('d: ' + d);
// hasOwnProperty and beget
var a = {member: true};
if (typeof Object.beget !== 'function') {
	Object.beget = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
};
var b = Object.beget(a);
var t = a.hasOwnProperty('member');
var u = b.hasOwnProperty('member');
var v = b.member;
document.writeln('t: ' + t);
document.writeln('u: ' + u);
document.writeln('v: ' + v);
