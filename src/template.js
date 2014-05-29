define(["jquery", "underscore", "handlebars", "jsonhelper"],
function( $, _, handlebars, jsonhelper ) {

  function loadTemplate( templateName, callback ) {
    // type checking occurs here
    if (!(_.isFunction(callback))) {
      throw new Error("please give me a function as callback");
    }
    if (!(_.isString(templateName))) {
      throw new Error("templateName should be string, would you please consider it!");
    }

    var BASE_PATH = "/assets/tmpls/";
    var EXTENSION = ".hbs";

    $.ajax({
      url: BASE_PATH + templateName + EXTENSION,
      cache: true,
      success: function( response ) {
        var template = handlebars.compile(response);
        callback(template);
      }
    });
  }
  return {
    renderTemplate: function(templateName, templateContainer, templateData, selector) {
      loadTemplate(templateName, function( template ) {
        $(templateContainer).html(template(jsonhelper.match(templateData, selector)));
      })
    }
  };

});
