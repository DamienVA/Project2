var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", async (req, res) => {
    try {
      const dbTodos = await db.Todo.findAll({});
      res.render("index", {
        msg: "Welcome!",
        todos: dbTodos
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Load Todo page and pass in an todo by id
  app.get("/todo/:id", async (req, res) => {
    try {
      const dbTodo = await db.Todo.findOne({
        where: { id: req.params.id }
      });
      res.render("todo", {
        todo: dbTodo
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", async (req, res) => {
    res.render("404");
  });
};
