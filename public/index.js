"use strict";

$(".devourButton").click(function() {
  //setting the id to a variable, then grabbing all the row elements (should only be one) that have a class matching that id
  console.log(this);
  console.log("Devour button pressed");
  $(this).remove();
  var devouredElement = document.getElementById(this.value);

  // $(devouredElements).addClass("rightSide");

  $(".eatenBurgers").append(devouredElement);

  $.ajax({
    url: "/" + this.value,
    type: "PUT",
    success: function(response) {
      console.log("completed put request");
    }
  });
});

$("#submitButton").click(function(event) {
  event.preventDefault();

  var newBurgerName = $("#textInput").val();
  console.log(newBurgerName);

  $.ajax({
    url: "/",
    type: "POST",
    data: { newBurgerName: newBurgerName },
    success: function(response) {
      location.reload();
      console.log("completed put request");
    }
  });
});
