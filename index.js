const express = require("express");
const app = express();
const PORT = 3000;
const date = require(__dirname + "/date.js");

const items = ["Clean", "Eat", "Exercise"];
const workItems = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const day = date();
  res.render("list", { title: day, newListItems: items });
});

app.get("/work", (req, res) => {
  res.render("list", { title: "Work List", newListItems: workItems });
});

app.post("/", (req, res) => {
  if (req.body.list === "Work") {
    const newToDo = req.body.newToDo;
    workItems.push(newToDo);
    res.redirect("/work");
  } else {
    const newToDo = req.body.newToDo;
    items.push(newToDo);
    res.redirect("/");
  }
});

app.listen(PORT, (req, res) => {
  console.log("Server has started on port " + PORT);
});
