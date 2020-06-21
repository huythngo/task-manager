const Task = require("../models/task");
const auth = require("../middleware/auth");
const { update } = require("../models/task");
const taskRouter = require("express").Router();

// GET tasks?completed=true
// limit skip
taskRouter.get("/", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match: match,
        options: {
          skip: parseInt(req.query.skip),
          limit: parseInt(req.query.limit),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRouter.get("/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send("task not found");
    } else {
      res.send(task);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
taskRouter.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

taskRouter.patch("/:id", auth, async (req, res) => {
  const allowUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);

  const isValidUpdate = updates.every((update) =>
    allowUpdates.includes(update)
  );
  if (!isValidUpdate) {
    res.status(400).send("invalid Update");
  }

  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send("task not found");
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

taskRouter.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = taskRouter;
