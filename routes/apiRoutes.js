var db = require("../models");

const characters = [
  "Ryu.gif",
  "Ken.gif",
  "Chun-li.gif",
  "Akuma.gif",
  "M.Bison.gif",
  "Guile.gif",
  "Vega.gif",
  "Dhalsim.gif"
];

module.exports = function(app) {
  // Get all todos
  app.get("/api/todos", async (req, res) => {
    try {
      const data = await db.Todo.findAll({});
      // console.log(data.data.character);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new todo
  app.post("/api/todos", async (req, res) => {
    try {
      const todoWithChars = req.body.map((todo, i) => {
        return {
          name: todo,
          character: characters[i]
        };
      });
      const result = await db.Todo.bulkCreate(todoWithChars);
      // for (let i = 0; i < characters.length; i++) {
      //   const result = await db.Todo.create({
      //     name: req.body[i],
      //     character: characters[i]
      //   });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Delete an todos by id
  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const result = await db.Todo.destroy({ where: { id: req.params.id } });
      const deletedRowCount = result;
      const status = deletedRowCount > 0 ? 200 : 404;
      res.status(status).json({ deletedRowCount });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });
};
