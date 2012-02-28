/**
 * Injector is a simple dependency injection container that
 * allows scoping and parent injection to be applied to
 * objects. Mapping and injection requests are simple and
 * straightforward
 */
Injector = function()
{
    this._mappedValues = {};
};

/**
 * Maps a value in the injector, injection requests that
 * match the key specified will be resolved appropriately
 * with the value specified.
 *
 * @param value the value to map to the injector
 * @param identifier a key object, typically a string, that
 * is tied to the value specified
 */
Injector.prototype.mapValue = function(value,identifier)
{
    this._mappedValues[identifier] = value;
};

/**
 * Applies the injectors mapped values to the object specified
 * @param value
 */
Injector.prototype.apply = function(value)
{
    var requests = value.__injections__;
    if(requests)
    {
        for(var field in requests)
        {
            var id = requests[field];
            value[field] = this.retrieve(id);
        }
    }
};

Injector.prototype.has = function (id) {
    return this._mappedValues.hasOwnProperty(id);
};

Injector.prototype.retrieve = function (id) {
    if (!this.has(id))
        throw "The mapping for '" + id + "' is not found on this injector";

    return this._mappedValues[id];
};

/**
 * inject() is a global function that can be called by any object.
 * Injections will not be resolved on inject(), but will be resolved
 * when Injector.apply() is called on the object.
 */
inject = function(identifiers, Constructor)
{
    if (typeof identifiers !== 'array')
        identifiers = [identifiers];

    // If there was no constructor provided, then we are in the inject(...).into(...) state
    if (!Constructor || (typeof Constructor !== 'function'))
    {
        return {into: function(owner, fields)
            {
                var property;

                if (typeof fields !== 'array')
                    fields = [fields];

                owner.__injections__ = owner.__injections__ || {};

                for(var item in identifiers) {
                    property = fields[item] || identifiers[item];
                    owner.__injections__[property] = identifiers[item];
                }
            }};
    }

    // Otherwise we're in the constructor injection business
    return function (injector) {
        var Temp = function(){}
          , args = Array.prototype.slice.apply(arguments)
          , injections = []
          , inst
          , ret;

         Temp.prototype = constructor.prototype;
         inst = new Temp();

         // Remove the injector from the args list
         args.shift;
         for (var id in identifiers) {
             injections.push(injector.retrieve(identifiers[id]));
         }
         args.unshift.apply(args, injections);

         ret = Constructor.apply(inst, args);
         return Object(ret) === ret ? ret : inst;
    };
}
