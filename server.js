var express = require("express");

var connection = require("./config/connection");

var path = require("path");

var app = express();

var PORT = process.env.PORT || 3001;

var bodyParser = require("body-parser");

//allowing myself to use images etc?

// app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "./public/")));
var handlebars = require("handlebars");

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

app.use(express.static("public"));

//setting up the listener

app.listen(PORT, function() {
  console.log("Listening on port http://localhost:" + PORT);
});

app.get("/", function(req, res) {
  loadAllBurgers(res);
  // console.log(element[0].dataValues);
  // console.log("Here's all teh data: " + JSON.stringify(element, null, 4));
});

app.put("/:id", function(req, res) {
  console.log("Registering put request");
  console.log(req.params.id);

  connection.Burger.update(
    { devoured: true },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(element) {
    console.log("Updated!");
  });
});

app.post("/", function(req, res) {
  connection.Burger.create({
    burger_name: req.body.newBurgerName,
    description: "No description yet added",
    devoured: false
  }).then(function(element) {
    loadAllBurgers(res);
  });
});

//relevant functions

function loadAllBurgers(res) {
  var Burger_array = {
    devoured: [],
    undevoured: []
  };
  i = 0;

  connection.Burger.findAll().then(function(element) {
    element.forEach(function(elem) {
      console.log(element[i].dataValues.devoured);
      //adding element arrays to the array and increasing i to increment
      //if the burger array is devoured add it to one list, else add it to the other
      if (element[i].dataValues.devoured == false) {
        Burger_array.undevoured.push(element[i].dataValues);
      } else {
        Burger_array.devoured.push(element[i].dataValues);
      }
      i++;
    });

    console.log(Burger_array);
    res.render("index.handlebars", { Burgers: Burger_array });
  });
}
