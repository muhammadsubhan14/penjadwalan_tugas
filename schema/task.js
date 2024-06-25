const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "startTime must be a valid date",
    },
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "endTime must be a valid date",
    },
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
