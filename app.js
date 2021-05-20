const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const axios = require('axios');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render('search');
});

app.post('/', function(req, res) {
    res.redirect('/' + req.body.name);
});

app.get('/:name', function(req, res) {

    // Make a request for a user with a given ID
    axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        .then(function(response) {
            // handle success
            console.log(response);
            res.render('roast', {
                name: req.params.name,
                roast: response.data.insult
            });
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });



});

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("listening on port 3000");
});