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
        content: 'q=content:((^.^))',
        regular: 'q=(^.^)'
      }
    },
    wt: 'wt=(^.^)',
    pageSize: 'rows=(^.^)',
    startPage: 'start=(^.^)',
    fl: 'fl=title,url',
    hl: 'hl=(^.^)',
    hlfl: 'hl.fl=(^.^)',
    fragSize: 'hl.fragsize=(^.^)'
  };

  var uriOptions = {
    scheme: 'http',
    host: '31.29.59.235',
    port: '80',
    path: 'solr/select',
    parameterBase: '?'
  };

  var options = {
    pageSize: 10,
    startPage: 0,
    query: {
      type: 'content',
      value: 'this is my query'
    },
    wt: 'json',
    hl: 'true',
    fl: 'a',
    hlfl: 'content',
    fragSize: '150'
  };

  return {
    doSearch: function( searchValue, queryParams ) {

      var searchDeferred = $.Deferred();

      if (!_.isEmpty(searchValue)) {
        var qb = QueryBuilder.getInstance(solrSchema, uriOptions);
        options.query['value'] = $('#txtSearch').val();
        var url = qb.make(options);
        console.log(url);
        $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonp: 'json.wrf',
          success: function( result ) {
            searchDeferred.resolve(result);
          },
          error: function() {
            searchDeferred.reject();
          }
        });
      }

      return searchDeferred.promise();

    }
  }

});
