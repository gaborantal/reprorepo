function foo() {

}

function bar() {

}

x = function test() {
  foo();
}.bind(bar);

x = function test2() {
  (function() {
    this.foo();
  }());
}.bind(bar);

x = function test3() {
  function foo() {
    this.bar();
  }
}.bind(foo);

x = function test4() {
  this.foo();
}.bind(bar);

x = function test5(a) {
  return a + 1;
}.bind(foo, bar);
