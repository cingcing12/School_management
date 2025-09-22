const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');
require('dotenv').config(); // ✅ Load environment variables

const app = express();
const port = process.env.PORT || 3000; // ✅ Dynamic port for hosting platforms

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Optional: serve CSS/JS
app.set('view engine', 'ejs');

// ✅ Connect to MongoDB using .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch(err => console.error("MongoDB connection error:", err));

// Routes

// Home route to display the form and list students
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('index', { students });
    } catch (error) {
        res.status(500).send('Error fetching students');
    }
});

// Post route to add a new student
app.post('/add', async (req, res) => {
    const { studentID, name, favoriteSubject, number } = req.body;
    const student = new Student({ studentID, name, favoriteSubject, number });

    try {
        await student.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error saving student');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
