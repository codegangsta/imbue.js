/**
 * Injector is a simple dependency injection container that
 * allows scoping and parent injection to be applied to
 * objects. Mapping and injection requests are simple and
 * straightforward
 */
Injector = function()
{
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

            if(this._mappedValues[id])
            {
                value[field] = this._mappedValues[id]
            }
            else
            {
                throw "The mapping for '" + id + "' is not found on this injector";
            }
        }
    }
};

Injector.prototype._mappedValues = {};

/**
 * inject() is a global function that can be called by any object.
 * Injections will not be resolved on inject(), but will be resolved
 * when Injector.apply() is called on the object.
 */
inject = function(identifier)
{
    return {into: function into(owner,field)
    {
        if(!owner.__injections__) owner.__injections__ = {};

        if(field)
            owner.__injections__[field] = identifier;
        else
            owner.__injections__[identifier] = identifier;
    }};
}