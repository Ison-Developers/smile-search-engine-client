require.config({

  baseUrl: 'src/',

  paths: {
    jquery: '../libs/jquery/dist/jquery',
    underscore: '../libs/underscore/underscore',
    handlebars: '../libs/handlebars/handlebars',
    jsonselect: '../libs/jsonselect/src/jsonselect'
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

    $(document).keypress(function( evt ) {
      var searchValue = $("#txtSearch").val();
      if(evt.which == 13) {

        $.when(search.doSearch(searchValue, {})).then(function( result ) {
           template.renderTemplate('result_simple', '#results', result, 'docs');
         });
      }
    });
});
