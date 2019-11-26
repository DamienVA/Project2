// Get references to page elements
var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

let tempTodos = [];

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(todo) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/todos",
      data: JSON.stringify(todo)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/todos",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/todos/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(todo) {
      var $p = $("<p>").text(todo.name);
      var $img = $("<img>").attr("src", todo.character);
      var $li = $("<li>")
        .attr({
          // src= "public/assets/Akuma.gif",
          class: "list-group-item",
          "data-id": todo.id
        })
        .append($p);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);
      $li.append($img);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var todo = $exampleText.val().trim();

  if (!todo) {
    alert("You must enter a task!");
    return;
  }
  if (tempTodos.length <= 7) {
    tempTodos.push(todo);
  }

  if (tempTodos.length === 8) {
    API.saveExample(tempTodos).then(function() {
      refreshExamples();
      tempTodos = [];
    });
  }

  $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
