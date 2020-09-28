$(document).ready(function(){
  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "": ,
    "": ,
  };

  var html = template(context);
  $(".list").append(html);
});
