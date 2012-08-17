(function (global) {

function cls (superClass, f) {
    var ctor, proto, superProto;

    if (arguments.length === 1) {
        f = superClass;
        superClass = Base;
    }
    superClass = superClass || Base;
    superProto = superClass.prototype;
    proto = Object.create(superProto);
    f.call(proto, superProto);
    ctor = proto.hasOwnProperty('init') ?
        proto.init :
        function () { superProto.init.apply(this, arguments); };

    Object.defineProperty(proto, 'constructor', {
        value: ctor,
        writable: true,
        enumerable: false,
        configurable: true
    });

    return ctor;
}


function Base () {}
Base.prototype.init = Base;

Base.prototype.include = function () {
    var objects = Array.prototype.slice.call(arguments),
        self = this;

    objects.forEach(function (o) {
        Object.getOwnPropertyNames(o).forEach(function (name) {
            self[name] = o[name];
        });
    });
};

Base.prototype.define = function(name, prop) {
    typeof prop.g === 'function' && prop.get = prop.g;
    typeof prop.s === 'function' && prop.set = prop.s;
    typeof prop.v !== 'undefined' && prop.value = prop.v;
    typeof prop.c !== 'undefined' && prop.configurable = prop.c;
    typeof prop.e !== 'undefined' && prop.enumerable = prop.e;
    typeof prop.w !== 'undefined' && prop.writable = prop.w;
    Object.defineProperty(this, name, prop);
};


global.cls = cls;

})((typeof module !== 'undefined' && module.exports) || this);