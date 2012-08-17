#cls.js

##initialize

###browser

```html
<script src="path/to/cls.js"></script>
```

###node

```javascript
var cls = require('cls.js').cls;
```

##usage

###create class

```javascript
var A = cls(function () {
  //constructor
  this.init = function (a, b) {
    this.a = a;
    this.b = b;
  };
  
  //method
  this.print = function () {
    console.log('a: ' + this.a);
    console.log('b: ' + this.b);
  };
});
```

###extend class

```javascript
var B = cls(A, function (parent) {
  //override
  this.print = function () {
    console.log('extend!');
    parent.print.call(this);//call super method.
  };
});
```

###mix-in

```javascript
var FooMixin = {
  add: function () {
    return this.a + this.b;
  },
  
  sub: function () {
    return this.a - this.b;
  }
};

var BarMixin = {
  bar: function () { console.log('bar'); }
};

var C = cls(B, function () {
  this.include(FooMixin, BarMixin);
});
```

###alias of Object.defineProperty

```javascript
var D = cls(function () {
  //data property
  this.define('foo1', {
    value: 1,
    configurable: true,
    enumerable: true,
    writable: true
  });
  
  //same mean
  this.define('foo2', {
    v: 1,
    c: true,
    e: true,
    w: true
  });
  
  //accessor property
  this.define('bar1', {
    get: function () {return this.value;},
    set: function (value) {this.value = value;}
  });
  
  //same mean
  this.define('bar2', {
    g: function () {return this.value;},
    s: function (value) {this.value = value;}
  });
});
```