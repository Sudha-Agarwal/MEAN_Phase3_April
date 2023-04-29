exports.getLoginController = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;

    //some validations and then check from db

    console.log(name);

    const message = "Form submitted successfully!";

    res.render('success',{message});
}