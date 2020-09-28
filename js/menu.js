$(document).ready(function(){

  $.ajax(
    {
      "url" : "http://157.230.17.132:3033/todos",
      "method": "GET",
      "success": function (data){
        renderList(data);
        resetSearch();
      },
      "error": function (err){
        alert("Errore");
      }
    }
  );

//Rimuovere un elemento dalla lista
  $(".list").on("click", "#delete", function() {

    var elm = $(this).parent();
    var id = elm.attr("id");

    $.ajax(
      {
        "url" : "http://157.230.17.132:3033/todos/"+id,
        "method": "DELETE",
        "success": function (data){
          elm.remove();
        },
        "error": function (err){
          alert("Errore");
        }
      }
    );
  });

//Aggiungere un elemento alla lista premendo il tasto Aggiungi
  $("#agg").click(function(){

    var add = $("#input").val();
    if (add != ""){
      $.ajax(
        {
          "url" : "http://157.230.17.132:3033/todos",
          "method": "POST",
          "data" : {
            "text" : add,
          },
          "success": function (data){
            addElement(data);
            resetSearch();
          },
          "error": function (err){
            alert("Errore");
          }
        }
      );
    }
  });

//Aggiungere un elemento alla lista premendo invio sull tastiera
  $("#input").keyup(
    function (event) {
      if(event.which == 13){
        var add = $("#input").val();
        if (add != ""){
          $.ajax(
            {
              "url" : "http://157.230.17.132:3033/todos",
              "method": "POST",
              "data" : {
                "text" : add.data[i],
              },
              "success": function (data){
                addElement(data);
                resetSearch();
              },
              "error": function (err){
                alert("Errore");
              }
            }
          );
        }
      }
    }
  );

//Modificare un elemento della Lista
  $(".list").on("click", ".update", function() {
    var text_mod = $(".input_list").val();

    $.ajax(
      {
        "url" : "http://157.230.17.132:3033/todos/"+id,
        "method": "PUT",
        "data": {
          "text": text_mod,
        },
        "success": function (data){
        },
        "error": function (err){
          alert("Errore");
        }
      }
    );
  });
});

//FUNZIONI//
//Funzione per stampare la lista nella pagina html
function renderList(list){

  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  for (var i=0; i<list.length; i++){

    var context = {
      "id": list[i].id,
      "text": list[i].text,
    };

    var html = template(context);
    $(".list").append(html);
  }
};
//Funzione per aggiungere un elemnto alla lista
function addElement(list){
  var source = $("#list-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id": list.id,
    "text": list.text,
  };
  var html = template(context);
  $(".list").append(html);
}
//Funzione per pulire la barra input
function resetSearch() {
  $("#input").val("");
}
