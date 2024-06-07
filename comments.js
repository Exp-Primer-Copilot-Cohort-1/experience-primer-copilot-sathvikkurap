// Create web server
// 1. Load modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// 2. Create web server
var app = express();

// 3. Set middleware
app.use(bodyParser.urlencoded({extended: false}));

// 4. Set routing
app.get('/comments', function(req, res) {
    fs.readFile('comments.json', function(err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/comments', function(req, res) {
    fs.readFile('comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});

// 5. Run web server
app.listen(52273, function() {
    console.log('Server running at http://