require.config({

  baseUrl: 'src/',

  paths: {
    jquery: '/libs/jquery/dist/jquery',
    underscore: '/libs/underscore/underscore',
    handlebars: '/libs/handlebars/handlebars',
    jsonselect: '/libs/jsonselect/src/jsonselect'
  },

  shim: {
    underscore: {
      deps: ['jquery'],
      exports: '_'
    },
    handlebars: {
      exports: "Handlebars"
    },
    jsonselect: {
        exports: "window.JSONSelect"
    }
  }
});

require([

  'jquery',
  'search',
  'template'

  ], function( $, search, template ) {

  search.doSearch('my query', {}, function( result ) {
    template.renderTemplate('result_simple', '#results', result, 'docs');
  });

});
