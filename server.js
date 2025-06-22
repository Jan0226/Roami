const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roami', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Route Schema
const routeSchema = new mongoose.Schema({
    name: String,
    scenery: String,
    duration: Number,
    steps: Number,
    startLocation: {
        lat: Number,
        lng: Number
    },
    endLocation: {
        lat: Number,
        lng: Number
    },
    waypoints: [{
        lat: Number,
        lng: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Route = mongoose.model('Route', routeSchema);

// Routes API
app.get('/api/routes', async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/routes', async (req, res) => {
    const route = new Route(req.body);
    try {
        const newRoute = await route.save();
        res.status(201).json(newRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/routes/search', async (req, res) => {
    const { scenery, duration, steps } = req.query;
    const query = {};
    
    if (scenery) query.scenery = scenery;
    if (duration) query.duration = duration;
    if (steps) query.steps = { $lte: parseInt(steps) };

    try {
        const routes = await Route.find(query);
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/routes/:id', async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
