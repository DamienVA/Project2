var db = require("../models");

module.exports = function(app) {
  // Get all todos
  app.get("/api/todos", async (req, res) => {
    try {
      const data = await db.Todo.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new todo
  app.post("/api/todos", async (req, res) => {
    try {
      console.table(req.body);
      const result = await db.Todo.create(req.body);
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
