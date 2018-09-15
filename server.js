const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


hbs.registerPartials(__dirname + '/views/partials');
// variable
const app = express();
const port = process.env.PORT || 3000;
const msg = `Running on port 3000`;

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', () => {
        console.log('FS here!');
        
    });

    
    next();
});

// app.use((req, res) => {
//         res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
        // res.send('<h1>hello express</h1>');
       res.render('index.hbs', {
            pageTitle: 'Index Page',
            welcomMsg: 'Welcome to my website',
         
       });
});

app.get('/project', (req, res) => {
    // res.send('<h1>hello express</h1>');
   res.render('project.hbs', {
        pageTitle: 'Project Page',
        welcomMsg: 'Welcome to my website',
     
   });
});

app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page',
        
        });
});

app.get('/bad', (req, res) => {
        res.send({
            errorMessage: 'Unable to handle such a request'
        })
});

// app listen for local server
app.listen(port, () => {
    console.log(`${msg} or ${port}`);
    
});