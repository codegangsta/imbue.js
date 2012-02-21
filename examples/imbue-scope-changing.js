// #Scope Changing
// Scope changes can be easily applied to injected objects
// through multiple injectors. An injector in one module can have
// different mappings than another module. This allows for extreme
// code reuse and leads to more testable code.

// Create our injectors.
var injectorA = new Injector();
var injectorB = new Injector();

// Map values to our injectors.
injectorA.mapValue("Hello","Message");
injectorB.mapValue("World!","Message");

// Create `myObject` with an injected message and a function to print
// the message.
var myObject = {
    print: function() {
        console.log(this.Message);
    }
};
inject("Message").into(myObject);

// Since we have not injected anthing into it yet, this statement will
// print *'undefined'*.
myObject.print(); /* 'undefined' */

// Apply injectorA to `myObject`. Calling print on `myObject` will now
// print *'Hello'*.
injectorA.apply(myObject);
myObject.print(); /* 'Hello' */

// Apply injectorB to `myObject`. Calling print on `myObject` will now
// print *'World!'*.
injectorB.apply(myObject);
myObject.print(); /* 'World!' */