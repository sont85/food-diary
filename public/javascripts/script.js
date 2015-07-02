var app = angular.module("BMI", []);
app.service("httpService", function($http){

});

app.service("BMIService", function(){
  this.computeAllFoodWeight = function(foodList){
    var totalCalories = foodList.reduce(function(accumulator, food) {
      return accumulator + (food.calories * food.servings);
    }, 0);
    weightGained = totalCalories / 3500;
    return weightGained;
  };
  this.computeDeleteFoodWeight = function(food){
    var totalCalories = Number(food[0].calories) * Number(food[0].servings);
    console.log("totalCalories", totalCalories);
    weightLost = totalCalories / 3500;
    console.log(weightLost);
    return weightLost;
  };

  this.computeBMI = function(user){
    var inches = user.unit === "in" ? user.height : user.height * 0.393701;
    var BMI = (user.weight * 703) / Math.pow(inches, 2);
    return BMI.toFixed(2);
  };
  this.calculateWeightGained = function(currentWeight, weightGained) {
    currentWeight = Number(currentWeight);
    weightGained = Number(weightGained);
    currentWeight += weightGained;
    return currentWeight;
  };
  this.calculateWeightLost = function(currentWeight, weightLost) {
    currentWeight = Number(currentWeight);
    weightLost = Number(weightLost);
    currentWeight -= weightLost;

    return currentWeight;
  };
});

app.controller("MainCtrl", function($scope, $http, httpService, BMIService){
  $http.get("/foodList").success(function(data) {
    $scope.foodList = data.foodList;
    console.log($scope.foodList);
  });
  $scope.showUser = function() {
    $scope.showUserForm = true;
  };
  $scope.saveUser = function() {
    if ($scope.user) {
      $scope.currentWeight = Number($scope.user.weight);
      $scope.showUserForm = false;
      $scope.BMI = BMIService.computeBMI($scope.user);
    }
  };
  $scope.saveFood = function() {
    if ($scope.food && $scope.user) {
      $scope.food.date = (new Date()).toLocaleDateString();
      $scope.foodList.push($scope.food);
      $scope.weightGained = BMIService.computeAllFoodWeight($scope.foodList);
      $scope.currentWeight = BMIService.calculateWeightGained($scope.user.weight, $scope.weightGained);
      $scope.food = "";
    }

  };
  $scope.editFood = function(index) {
    $scope.showEditFood = true;
  };
  $scope.deleteFood = function(index) {
    var spliced = $scope.foodList.splice(index, 1);
    $scope.weightLost = BMIService.computeDeleteFoodWeight(spliced);
    console.log($scope.weightLost);
    $scope.weightGained -= $scope.weightLost;
    $scope.currentWeight = BMIService.calculateWeightLost($scope.currentWeight, $scope.weightLost);
  };
  $scope.submitEdit = function(index, editFood) {
    $scope.foodList.splice(index, 1, editFood);
    $scope.weightGained = BMIService.computeAllFoodWeight($scope.foodList);
    $scope.currentWeight = BMIService.calculateWeightGained($scope.currentWeight, $scope.weightGained);
    console.log("currentWeight:", $scope.currentWeight);
    $scope.edit = "";
    $scope.showEditFood = false;
  };
});
