// tournament logic, needs to incorporate logic with sequalize and handlebars

function todo(name, value, eliminated) {
  this.name = name;
  this.value = value;
  this.eliminated = eliminated;

  this.printInfo = function() {
    console.log(
      "Name: " +
        this.name +
        "\nValue: " +
        this.value +
        "\nEliminated: " +
        this.eliminated +
        "\n"
    );
  };
}

var todos = new Array();
var newTodo;

for (var i = 0; i < 8; i++) {
  todos.push((newTodo = new todo()));
}

// test data
for (var n = 0; n < 8; n++) {
  todos[n].name = "bob";
  todos[n].value = 0;
  todos[n].eliminated = false;

  console.log("--------------------------");
  console.log("Todo Index #: " + n);
  console.log("Name: " + todos[n].name);
  console.log("Value: " + todos[n].value);
  console.log("Eliminated: " + todos[n].eliminated);
  console.log("--------------------------\n");
}

var roundCount = 0;
function nextRoundButton(array) {
  console.log("!!!! Round Number: " + ++roundCount);

  // sort opponents
  var participants = new Array();
  for (var i = 0; i < array.length; i++) {
    if (array[i].eliminated === false) {
      participants.push(array[i]);
    }
  }
  if (participants.length === 1) {
    console.log("We found a winner");
    participants[0].printInfo();
  }
  if (participants.length !== 1) {
    // finds winner of the round
    for (var j = 0; j < participants.length; j += 2) {
      var n = j + 1;
      round(participants[j], participants[n]);
      console.log("p1: " + j + " value: " + participants[j].value);
      console.log("p2: " + n + " value: " + participants[n].value);
    }
  }
}

var gen_nums = [];

function round(todo1, todo2) {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  todo1.value += get_rand(nums);
  todo2.value += get_rand(nums);

  if (todo1.value > todo2.value) {
    todo2.eliminated = true;
    gen_nums = [];
  } else {
    todo1.eliminated = true;
    gen_nums = [];
  }
}

function in_array(array, el) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == el) {
      return true;
    }
  }
  return false;
}

function get_rand(array) {
  // gets random number in the array by selecting random index
  var rand = array[Math.floor(Math.random() * array.length)];
  //console.log("random number gen: " + rand);
  // if generated number has not been generated before, return number
  if (!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  // if number have been generated before, run method again
  return get_rand(array);
}

function findRanking(todos) {
  todos.sort(compare);

  for (var i = 0; i < todos.length; i++) {
    var r = i + 1;
    console.log(
      "Rank #" + r + " Name: " + todos[i].name + " Value: " + todos[i].value
    );
  }
}

function compare(a, b) {
  const valueA = a.value;
  const valueB = b.value;

  let comparison = 0;
  if (valueA > valueB) {
    comparison = -1;
  } else if (valueA < valueB) {
    comparison = 1;
  }
  return comparison;
}

// testing
for (var m = 0; m < 4; m++) {
  nextRoundButton(todos);
  console.table(todos);
}

findRanking(todos);
