const express = require('express');
const path = require('path');
const spawn = require('child_process').spawn;

const router = express.Router();

router.get('/', (req, res) => {
    res.send("API for Major Project (returning Results of Supervised Machine Learning Algorithms)");
});

router.post('/', (req, res) => {
    const pyProcess = spawn('python', [path.join(__dirname, '../../scripts/script.py')]);
    pyProcess.stdout.on('data', function (data) {
        res.send(data.toString());
    });
});

module.exports = router;