// // tournament logic, needs to incorporate logic with sequalize and handlebars

let todosArr;
let margin = 0;

const changeCSS = winnersBracket => {
  for (let i = 0; i < winnersBracket.length; i++) {
    let curr = winnersBracket[i];

    $(`#${curr.id}`).css({ "margin-left": `${margin}px` });
  }
};

const main = async () => {
  const res = await fetch("/api/todos", { method: "GET" });
  const todos = await res.json();
  console.log(todos);
  todosArr = todos.map(todo => {
    todo.eliminated = false;
    todo.value = 0;
    return todo;
  });

  for (var n = 0; n < 8; n++) {
    console.log("--------------------------");
    console.log("Todo Index #: " + n);
    console.log("Name: " + todosArr[n].name);
    console.log("Value: " + todosArr[n].value);
    console.log("Eliminated: " + todosArr[n].eliminated);
    console.log("--------------------------\n");
  }
  const winnerBracket = nextRoundButton(todosArr);
  // function call for css for wimners

  $("#nextRound").remove();
  const button = $("<button/>", {
    text: "Next Round",
    click: () => nextRoundButton(winnerBracket),
    class: "btn btn-secondary"
  });

  $("#container").append(button);
};

// test data
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
    const winnerBracket = new Array();
    for (var j = 0; j < participants.length; j += 2) {
      var n = j + 1;
      let winner = round(participants[j], participants[n]);
      winnerBracket.push(winner);

      console.log("p1: " + j + " value: " + participants[j].value);
      console.log("p2: " + n + " value: " + participants[n].value);
    }
    margin += 210;
    changeCSS(winnerBracket);
    console.log(participants);
    console.log(winnerBracket);
    return winnerBracket;
  }
}

var genNums = [];

function round(todo1, todo2) {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  todo1.value += getRand(nums);
  todo2.value += getRand(nums);

  if (todo1.value > todo2.value) {
    todo2.eliminated = true;
    genNums = [];
    return todo1;
  } else {
    todo1.eliminated = true;
    genNums = [];
    return todo2;
  }
}

function inArray(array, el) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === el) {
      return true;
    }
  }
  return false;
}

function getRand(array) {
  // gets random number in the array by selecting random index
  var rand = array[Math.floor(Math.random() * array.length)];
  //console.log("random number gen: " + rand);
  // if generated number has not been generated before, return number
  if (!inArray(genNums, rand)) {
    genNums.push(rand);
    return rand;
  }
  // if number have been generated before, run method again
  return getRand(array);
}

$("#nextRound").on("click", main);
