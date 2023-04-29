menuRoute = require("../routes/meals");
loginRoute = require("../routes/login");
module.exports = {
    meals: (app,router)=>{
        menuRoute.appRoute(router)
    },
    login:(app,router) => {
        loginRoute.appRoute(router);
    }
}