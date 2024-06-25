const express = require("express");
const mongoose = require("mongoose");
const Project = require("./schema/project");
const Task = require("./schema/task");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database successful");
  })
  .catch((err) => {
    console.error("Connection to database failed", err);
  });

app.post("/projects", async (req, res) => {
  try {
    const { name, desc } = req.body;
    const newProject = await Project.create({
      name,
      desc,
    });
    console.log("New project has been created:", newProject);
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Failed to save new project:", err);
    res.status(500).send("Internal server error");
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    console.error("Failed to retrieve projects:", err);
    res.status(500).send("Internal server error");
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.json(project);
  } catch (err) {
    console.error("Failed to retrieve project:", err);
    res.status(500).send("Internal server error");
  }
});

app.delete("/projects/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }
    res.json({ message: "Project has been deleted", deletedProject });
  } catch (err) {
    console.error("Failed to delete project:", err);
    res.status(500).send("Internal server error");
  }
});

app.put("/projects/:id", async (req, res) => {
  try {
    const { name, desc } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, desc },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }
    res.json(updatedProject);
  } catch (err) {
    console.error("Failed to update project:", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/projects/:projectId/tasks", async (req, res) => {
  const { title, desc, startTime, endTime } = req.body;
  const projectId = req.params.projectId;

  console.log("masukk req body>> ", req.body);
  console.log("id>>>> ", projectId);

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid projectId" });
  }

  if (!startTime || !endTime) {
    return res
      .status(400)
      .json({ error: "startTime and endTime are required" });
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: "Invalid startTime or endTime" });
  }

  try {
    const newTask = await Task.create({
      title,
      desc,
      startTime: startDate,
      endTime: endDate,
      projectId: new mongoose.Types.ObjectId(projectId),
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("failed to save new task:", err);
    return res.status(500).send("Internal server error");
  }
});

app.get("/projects/:projectId/tasks", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, startTime, endTime } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, desc, startTime, endTime },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).send("Project not found");
    }
    res.json({ message: "Project has been deleted", deletedTask });
  } catch (err) {
    console.error("Failed to delete project:", err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.clear();
  console.log(`take home test app listening at ${port}`);
});
