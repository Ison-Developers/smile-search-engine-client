define([

  'jquery',
  'underscore',
  'queryBuilder'

  ], function($, _, QueryBuilder) {

  // initialize query builder
  var solrSchema = {
    query: {
      types: {
        and: 'q=AND((^.^))',
        or: 'q=OR((^.^))',
        regular: 'q=(^.^)'
      }
    },
    wt: 'wt=(^.^)',
    pageSize: 'rows=(^.^)',
    startPage: 'start=(^.^)'
  };

  var uriOptions = {
    scheme: 'http',
    host: 'isondev.net',
    port: '8080',
    path: 'solr/isonblog',
    parameterBase: 'select?'
  };

  var options = {
    pageSize: 20,
    startPage: 0,
    query: {
      type: 'regular',
      value: 'this is my query'
    },
    wt: 'json'
  };

  return {
    doSearch: function( searchInputValue, queryParams, callback ) {
      if (_.isEmpty(searchInputValue)) {
        // default apache solr request to get all results
      } else {
        // search with searchInputValue

        var qb = QueryBuilder.getInstance(solrSchema, uriOptions);
        var url = qb.make(options);

        $.ajax({
          url: '/assets/data/sample.json',
          success: function( result ) {
            callback(result);
          },
          error: function() {
            console.log('an error occured');
          }
        });

      }
    }
  }

});
