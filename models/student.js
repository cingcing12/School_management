const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    favoriteSubject: String,
    number: String
});

module.exports = mongoose.model('Student', studentSchema);
