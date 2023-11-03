const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

module.exports.saveTask = async (req, res) => {
  const { task } = req.body;

  try {
    const data = await TaskModel.create({ task });
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: error, msg: "Something went wrong" });
  }
};

module.exports.updateTasks = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    await TaskModel.findByIdAndUpdate(id, { task });
    res.send("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await TaskModel.findByIdAndDelete(id);
    res.send("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, msg: "Something went wrong" });
  }
};