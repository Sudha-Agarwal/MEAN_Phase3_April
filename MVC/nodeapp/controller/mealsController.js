const mealModel = require("../model/meals");

exports.getMealsController = (req,res,next) => {
    const meals = mealModel.getMeals();
    res.render('meals', {meals});
}