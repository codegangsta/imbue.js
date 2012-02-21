// #The Basics
// The purpose of this sample is to get you set up and using **imbue.js**
// immediately in just a few lines of code. The full source code for this sample
// as well as **imbue.js** can be found in the Github Repository.

// Lets start by creating an Injector and our object that we want to be injected into.
var injector = new Injector();
var myObject = {};

// We supply dependencies by mapping them on the injector, to map an object
// or value you must supply the value and identifier in the `injector.mapValue()`
// code.
injector.mapValue(document.createElement("canvas"),"Canvas");

// Calling the global function `inject()` tells the `myObject` that when
// an injector is getting applied we want to have the *'Canvas'* dependency
// assigned to the *'Canvas'* property of <code>myObject</code>.
inject("Canvas").into(myObject);

// To finalize the inject operation, we will apply the injector to `myObject`.
// this will ensure that all requested dependencies are satisfied, and will
// throw an error if no dependency exists in injector.
injector.apply(myObject);

// Trace out our results to the console, the output looks like this:
// `myObject.Canvas === [object HTMLCanvasElement]`
console.log("myObject.Canvas === " + myObject.Canvas);