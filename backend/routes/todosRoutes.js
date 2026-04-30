const { Router } = require("express");
const pool = require("../db");

const router = Router();

// ➕ CREATE TODO
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed ?? false]
    );

    res.json(newTodo.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// 📥 GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(todos.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✏️ UPDATE TODO (title OR completed OR both)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await pool.query(
      `
      UPDATE todo 
      SET 
        title = COALESCE($1, title),
        completed = COALESCE($2, completed)
      WHERE id = $3
      RETURNING *
      `,
      [title, completed, id]
    );

    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo.rows[0]);

  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// 🗑️ DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted", todo: deleted.rows[0] });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;