mealController = require("../controller/mealsController");

exports.appRoute = router => {
    router.get("/meals", mealController.getMealsController);
}