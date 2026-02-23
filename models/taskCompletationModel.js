const mongoose = require("mongoose");

const taskCompletionSchema = new mongoose.Schema({

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }

});

taskCompletionSchema.index({ taskId: 1, date: 1 }, { unique: true });
const taskComplition = mongoose.model("taskComplete", taskCompletionSchema)

module.exports = taskComplition