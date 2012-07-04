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

cls.include = function (context) {
    var mixins = Array.prototype.slice.call(arguments, 1);

    mixins.forEach(function (mixin) {
        Object.getOwnPropertyNames(mixin).forEach(function (name) {
            context[name] = mixin[name];
        });
    });
};

function Base () {}
Base.prototype.init = Base;

global.cls = cls;

})((typeof module !== 'undefined' && module.exports) || this);