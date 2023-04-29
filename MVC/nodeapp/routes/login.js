loginController = require("../controller/loginController");

exports.appRoute = router => {
    router.post("/login-form", loginController.getLoginController);
}