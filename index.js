const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    fs.readdir(`./files`, (error,files) => {
        console.log(files);
        res.render('index',{files : files});
    });
});
app.listen(3001, () => {
    console.log("Server is running on the port 3001");
})