const express = require('express');
const bodyParser = require('body-parser');
const router = require('../proxy/Proxy_Controller');
const axios = require("axios");
const cors = require('cors');
//const session = require('express-session'); for for the case of using login validation I didn't implement it because in this project it wouldn't make sense

const app = express();

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/",router);



//home page
app.get("/", (req, res) => {
    var data = axios.get("http://localhost:8080/api/users?since=1").then(response => { //getting information from my api
        return response.data
    });
    data.then(datas => { 
         res.render('index',{ //returning data to the front
            data:datas
        });
    });
});

//user informations page
app.get("/:user/description", (req, res) => {
    var user = req.params.user;
    if(user === undefined){
        res.redirect("/");
    }
    var data = axios.get("http://localhost:8080/api/users/"+user).then(response => {
        return response.data
    });
    data.then(datas => {
       res.render('userDescription',{
            data:datas, 
       });  
    });
});
// user repositories page
app.get("/:user/repos", (req, res) => {
    var user = req.params.user;
    if(user === undefined){
        res.redirect("/");
    }
    var data = axios.get("http://localhost:8080/api/"+user+"/repos").then(response => {
        return response.data
    });
    data.then(datas => {
       res.render('userRepos',{
            data:datas, 
       });
    });
});
//pagination page
app.get("/:since", (req, res) => { 
    var since = req.params.since;
    var next = parseInt(since) + 1;
    var back = parseInt(since) - 1;
    if (since == 8){ //this if is because for some reason the git hub api repeats the same users from page 8 to 16
        next = 17;
    }
    var data = axios.get("http://localhost:8080/api/users?since="+since).then(response => {
        return response.data
    });
    //validation to prevent any errors
    if(back < 1 || isNaN(back) || isNaN(next) ||  next == undefined || back == undefined){ 
        res.redirect('/');
    }else{
        data.then(datas => {
            res.render('pageIndex',{
                 data:datas,
                 next:next,
                 back:back
            });  
         });
    } 
});
//receives the value typed in the front
app.post("/search/user", (req, res) => {
    var user = req.body.id;
    res.redirect('/search/'+user);
});
//searched users page
app.get("/search/:user", (req, res) => {
    var user = req.params.user;
    var data = axios.get("http://localhost:8080/api/search/"+user).then(response => {
        return response.data.items
    });
    data.then(datas => {
       res.render("search",{
            data:datas, 
       });  
    });
});


module.exports = app;