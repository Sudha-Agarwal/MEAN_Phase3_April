menuRoute = require("../routes/meals");

module.exports = {
    meals: (app,router)=>{
        menuRoute.appRoute(router)
    }
}