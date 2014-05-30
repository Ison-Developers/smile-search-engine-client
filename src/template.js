define([

  'jquery',
  'underscore',
  'handlebars',
  'jsonhelper'

  ], function( $, _, handlebars, jsonhelper ) {
    function loadTemplate( templateName, callback ) {

      var templateDeferred = new $.Deferred();

      var BASE_PATH = "assets/tmpls/";
      var EXTENSION = ".hbs";

      $.ajax({
        url: BASE_PATH + templateName + EXTENSION,
        cache: true,
        success: function( response ) {
          var template = handlebars.compile(response);
          templateDeferred.resolve(template);
        },
        error: function() {
          templateDeferred.reject();
        }
      });

      return templateDeferred.promise();
    }
    return {
      renderTemplate: function(templateName, templateContainer, templateData, selector) {
        $.when(loadTemplate(templateName)).then(function( template ) {
          $(templateContainer).html(template(jsonhelper.match(templateData, selector)));
        });
      }
    };

});
