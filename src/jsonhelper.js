define(["underscore", "jsonselect"], function( _, jsonselect ) {

  return {
    match: function( datasource, selectorsString ) {
      if (!(_.isObject(datasource))) {
        throw new Error("datasource should be an object. Actually a JSON object");
      }
      if (!(_.isString(selectorsString))) {
        throw new Error("I need a string in order to create a selector based on that");
      }

      var selectors = '.' + selectorsString.replace(/\./g, ' .');
      var lastItem = _.last(selectorsString.split('.'));
      var result = {};
      result[lastItem] = [];

      jsonselect.forEach(selectors, datasource, function( obj ) {
        // if o is an array means looking result is o's children
        // so navigate through them and push every children in the final result
        if (_.isArray(obj)) {
          _.map(obj, function( o ) {
            result[lastItem].push(o);
          });
        } else {
          result[lastItem].push(obj);
        }
      });

      console.log(result);
      return result;
    }
  }
});
