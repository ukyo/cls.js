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


global.cls = cls;

})((typeof module !== 'undefined' && module.exports) || this);