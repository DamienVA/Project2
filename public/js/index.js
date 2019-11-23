// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
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
      var $a = $("<a>")
        .text(todo.name)
        .attr("href", "/todo/" + todo.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": todo.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

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
    alert("You must enter an example text and description!");
    return;
  }
  if (tempTodos.length < 8) {
    tempTodos.push(todo);
  } else {
    API.saveExample(tempTodos).then(function() {
      tempTodos = [];
      refreshExamples();
    });
  }

  $exampleText.val("");
  $exampleDescription.val("");
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
