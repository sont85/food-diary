var express = require('express');
var firebase = require("firebase");
var router = express.Router();
var data = require("../views/data.json");

var userRef = new firebase("https://meal-diary.firebaseio.com/user");
var mealRef = new firebase("https://meal-diary.firebaseio.com/user/meal");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BMI Calculator', foodList: data.foodList });
});

router.get("/foodList", function(req, res){
  res.json(data);
});

module.exports = router;
