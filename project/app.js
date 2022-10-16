// Dinosaur constructor
function Dinosaur(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = parseFloat(weight);
  this.height = parseFloat(height);
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;

  return {
    get getSpecies() {
      return species;
    },
    get getWeight() {
      return weight;
    },
    get getHeight() {
      return height;
    },
    get getDiet() {
      return diet;
    },
    get getFact() {
      return fact;
    },
  };
}

// Used to retrieve dinosaurs from the json file and add them to the dinosaur array
function getJSON(json) {
  for (let i = 0; i < json.length; i++) {
    let item = json[i];
    dinosaurs.push(
      Dinosaur(
        item.species,
        item.weight,
        item.height,
        item.diet,
        item.where,
        item.when,
        item.fact
      )
    );
  }
}

// Human constructor
function Human() {
  let name, height, weight, diet;

  function getDOMName() {
    name = form.querySelector("#name").value;
    return name;
  }
  function getDOMHeight() {
    let feet = form.querySelector("#feet").value;
    let inches = form.querySelector("#inches").value;
    height = parseFloat(feet) * 12 + parseFloat(inches);
    return height;
  }
  function getDOMWeight() {
    weight = form.querySelector("#weight").value;
    return weight;
  }
  function getDOMDiet() {
    diet = form.querySelector("#diet").value;
    return diet;
  }

  return {
    get getName() {
      return getDOMName();
    },
    get getHeight() {
      return getDOMHeight();
    },
    get getWeight() {
      return getDOMWeight();
    },
    get getDiet() {
      return getDOMDiet();
    },
  };
}

// Dino Comparison Methods

// #1: Gets the height difference between the human and the dinosaur
function getHeightDifference(human, dino) {
  if (human && dino && human.getHeight && dino.getHeight) {
    let diff = dino.getHeight - human.getHeight;
    let text =
      diff > 0
        ? "The " + dino.getSpecies + " is " + diff + " inches taller than you!"
        : "The " +
          dino.getSpecies +
          " is " +
          Math.abs(diff) +
          " inches shorter than you!";
    return text;
  } else {
    return "Oops! Something wrong happened, please refresh";
  }
}

// #2: Gets the weight difference between the human and the dinosaur
function getWeightDifference(human, dino) {
  if (human && dino && human.getWeight && dino.getWeight) {
    let diff = dino.getWeight - human.getWeight;
    let text =
      diff > 0
        ? "The " + dino.getSpecies + " is " + diff + " pounds heavier than you!"
        : "The " +
          dino.getSpecies +
          " is " +
          Math.abs(diff) +
          " pounds lighter than you!";
    return text;
  } else {
    return "Oops! Something wrong happened, please refresh";
  }
}

// #3: Compares the diet between human and dino
function compareDiets(human, dino) {
  if (human && dino && human.getWeight && dino.getWeight) {
    if (human.getDiet.toLowerCase() === dino.getDiet.toLowerCase()) {
      return (
        "You and the " + dino.getSpecies + " are both " + dino.getDiet + "s!"
      );
    } else {
      return (
        "You are a " +
        human.getDiet +
        " While the " +
        dino.getSpecies +
        " is a " +
        dino.getDiet
      );
    }
  } else {
    return "Oops! Something wrong happened, please refresh";
  }
}

// Used to validate the form before extracting datas
function validateForm() {
  if (
    checkNullOrUndefined(human.getName) ||
    checkNullOrUndefined(human.getHeight) ||
    checkNullOrUndefined(human.getWeight)
  )
    showErrorMessage("null");
  else if (human.getHeight < 0 || human.getWeight < 0)
    showErrorMessage("negative");
  else hideForm();
}

// Utility function to check if text is null or empty
function checkNullOrUndefined(text) {
  if (
    null === text ||
    text === "" ||
    (typeof text === "Number" && text.isNaN())
  ) {
    return true;
  } else return false;
}

// Function that hides the form after button click
function hideForm() {
  let error = form.querySelector("#error-message");
  error.style.display = "none";
  document.getElementById("dino-compare").style.display = "none";
  prepareGrid();
}

// Function that shows error message when form is not filled
function showErrorMessage(cause) {
  let error = form.querySelector("#error-message");
  let errorMessage = "";

  switch (cause) {
    case "null":
      errorMessage = "Please complete the form before submitting!";
      break;
    case "negative":
      errorMessage = "Your height or weight can't be a negative number :/";
  }

  error.style.display = "block";
  error.innerHTML = errorMessage;
}

// Function that generates the grid
function prepareGrid() {
  let grid = document.getElementById("grid");
  dinosaurs.splice(4, 0, human);
  let gridElements = dinosaurs;
  for (let i = 0; i < gridElements.length; i++) {
    if (gridElements[i].getName) {
      let tileString =
        "<h3>" +
        gridElements[i].getName +
        "</h3>" +
        "<img src='./images/human.png'/> </div>";
      let tile = document.createElement("div");
      tile.className = "grid-item";
      tile.innerHTML = tileString;

      grid.appendChild(tile);
    } else {
      let tileString =
        "<h3>" +
        gridElements[i].getSpecies +
        "</h3><img src='./images/" +
        gridElements[i].getSpecies.toLowerCase() +
        ".png'/>" +
        "<p>" +
        getDinosaurText(gridElements[i], human) +
        "</p></div>";

      let tile = document.createElement("div");
      tile.className = "grid-item";
      tile.innerHTML = tileString;

      grid.appendChild(tile);
    }
  }
}

// Function that retrieves random text to show on grid
function getDinosaurText(dino, human) {
  let choice = Math.random() * 10;
  choice = Math.floor(choice);
  if (dino.getSpecies === "Pigeon") choice = 8;
  if (choice < 2) return getHeightDifference(human, dino);
  else if (choice < 6) return getWeightDifference(human, dino);
  else if (choice < 8) return compareDiets(human, dino);
  else return dino.getFact;
}

let dinosaurs = [];
let human = new Human();
let form = document
  .querySelector("#dino-compare")
  .querySelector(".form-container");

// get dinosaur data from JSON file
var jqxhr = $.getJSON("./dino.json", function (json) {
  getJSON(json.Dinos);
});

// Event listener to call validateForm function after button click
document.getElementById("btn").addEventListener("click", validateForm);
