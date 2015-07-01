var express = require('express');
var router = express.Router();
var data = require("../views/data.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BMI Calculator', foodList: data.foodList });
});

router.get("/foodList", function(req, res){
  res.json(data);
});

module.exports = router;
