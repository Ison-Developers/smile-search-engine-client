define([

  'underscore',
  'jsonselect'

  ], function( _, jsonselect ) {

  /**
  * Make Selectors to use with jsonselect
  */
  function makeSelectors( selectorsString ) {
    return '.' + selectorsString.replace(/\./g, ' .');
  }

  /**
  * Get last selector that separated with dot
  */
  function getLastSelector( selectorsString ) {
    return _.last(selectorsString.split('.'));
  }

  return {
    match: function( datasource, selectorsString ) {

      var selectors = makeSelectors(selectorsString);
      var lastItem = getLastSelector(selectorsString);
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
      return result;
    }
  }
});
