var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    nodemailer = require('nodemailer'),
    mg = require('nodemailer-mailgun-transport');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index");
});

// app.get('/about', function(req, res){
//     res.render('about');
// });

// app.get('/services', function(req, res){
//     res.render('services');
// });

// app.get('/contact', function(req, res){
//     res.render('contact');
// });

app.get('/portfolio', function(req, res){
    res.render('portfolio');
});

app.post('/contact', function(req, res){
    
    var auth = {
        auth: {
            api_key: 'key-5cfc626a1554d1e05601e0a120836d4b',
            domain: 'coughlindesigns.tech'
        }
    }
    
    var transporter = nodemailer.createTransport(mg(auth));
    
    transporter.sendMail({
        from: 
        {
            name: req.body.name,
            address: req.body.email
        },
        to: 'william@coughlindesigns.tech, coughlinw97@gmail.com', // list of receivers
        subject: 'Coughlin Designs Contact Form Submission', // Subject line
        text: req.body.message
    }, function(err, info){
        if(err){
            console.log('Error: ' + err);
            res.send('Failed to Send');
        } else {
            console.log('Response: ' + info);
            res.redirect('/contact');
        }
    });
});

app.listen(61000);