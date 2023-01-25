const express = require('express');
const router = express.Router();
const axios = require("axios");
const cors = require('cors');

router.use(cors());
//route all users

router.get("/api/users", (req,res) =>{
   var since = req.query["since"];
   if (since === undefined){
   axios.get("https://api.github.com/users?since=1&per_page=4").then( (response) => {
      res.statusCode=200;
      res.json(response.data);
   }).catch( (err) => {
      console.log(err);
   });
}else { //router all user with pagination
   axios.get("https://api.github.com/users?since="+since+"&per_page=4").then( (response) => {
      res.statusCode=200;
      res.json(response.data);
   }).catch( (err) => {
      console.log(err);
   });
}
});
//router for one user
router.get("/api/users/:user", (req, res) =>{
   var user = req.params.user;
   axios.get("https://api.github.com/users/"+user).then( (response) => {
      res.statusCode=200;
      res.json(response.data);
   }).catch((err) => {
      console.log(err);
   });
});
//router for user repositories
router.get("/api/:user/repos", (req, res) =>{
   var user = req.params.user;
   axios.get("https://api.github.com/users/"+user+"/repos").then((response) =>{
      res.statusCode=200;
      res.json(response.data);
   }).catch((err) => {
      console.log(err);
   });
});
//router for search users profiles
router.get("/api/search/:user", (req, res) =>{
   var user = req.params.user;
   axios.get("https://api.github.com/search/users?q="+user).then ((response) =>{
      res.statusCode=200;
      res.json(response.data);
   }).catch((err) => {
      console.log(err);
   });
});


module.exports = router;