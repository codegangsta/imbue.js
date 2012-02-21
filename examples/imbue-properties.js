// #Properties in Imbue
// With Imbue, we can control which properties will get injected
// into. This example will show you how to do it.

// Declare our injector and object.
var injector = new Injector();
var myObject = {};

// Map a canvas object to our injector.
injector.mapValue(document.createElement("canvas"),"Canvas");

// We can inject our canvas object into `myObject` the default
// way, which will assign it to the *'Canvas'* property of `myObject`.
inject("Canvas").into(myObject);

// The alternative way would be to map it to a specific property (*'mainCanvas'*) on
// `myObject`. This proves useful in avoiding naming collisions and
// gives overall control in your injections.
inject("Canvas").into(myObject,"mainCanvas");

// Apply the injection.
injector.apply(myObject);

// Trace out our results.
console.log("myObject.Canvas === " + myObject.Canvas);
console.log("myObject.mainCanvas === " + myObject.mainCanvas);