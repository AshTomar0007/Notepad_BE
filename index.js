const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/file/:filename', (req,res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render('show', {filename: req.params.filename, filedata : filedata});
     });
});

app.get('/edit/:filename', (req,res) => {
    res.render('edit', {filename: req.params.filename});
});

app.get('/', (req,res) => {
    fs.readdir(`./files`, (error,files) => {
        console.log(files);
        res.render('index',{files : files});
    });
});

app.post('/create', (req,res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect('/')
    });
});

app.post('/edit', (req,res) => {
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, (err) => {
        res.redirect('/');
    });
});
app.listen(3001, () => {
    console.log("Server is running on the port 3001");
});