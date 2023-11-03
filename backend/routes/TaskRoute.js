const { Router } = require("express");

const { getTasks, saveTask, deleteTask, updateTasks } = require("../controllers/TaskControllers");

// Create a new instance of the router
const router = Router();

// Change this line:
// router.get("/get", getTasks);

// To this:
router.get("/get", async (req, res, next) => {
    await getTasks(req, res, next);
});

router.post("/save", async (req, res, next) => {
    await saveTask(req, res, next);
});

router.patch("/update/:id", async (req, res, next) => {
    await updateTasks(req, res, next);
});

router.delete("/delete/:id", async (req, res, next) => {
    await deleteTask(req, res, next);
});

module.exports = router;
