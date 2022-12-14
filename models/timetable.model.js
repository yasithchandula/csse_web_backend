const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    timetableBus: {
        type: String,
        required: true
    },
    timetableRoute: {
        type: String,
        required: true
    },
    timetableDay: {
        type: Number,
        required: true
    },
    timetableTimeH: {
        type: Number,
        required: true
    },
    timetableTimeM: {
        type: Number,
        required: true
    },
    timetableStatus: {
        type: String,
    },
    timetableUpDown: {
        type: String,
        required: true
    }
});

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;