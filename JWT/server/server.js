const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const secretKey = '1234';

app.use(cors());
app.use(bodyParser.json());


app.post('/login', (req,res) => {
    const { username, password}  = req.body;
    //generate the JWT Token
    const token = jwt.sign({username}, secretKey,{expiresIn: '1h'});
    res.json({token});
});

app.get('/protected', authenticateToken, (req,res) => {
    res.json({message: 'Protected route accessed successfully'});
});

//Middleware to authenticate the JWT Token
function authenticateToken(req, res, next){
    const token = req.headers['Authorization'];

    if(!token){
        return res.status(401).json({message: 'Unauthorizes'});
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err){
            return res.status(403).json({message:'Forbidden'});
        }
        req.user = user;
        next();
    })

    
}
app.listen(port, () => {
    console.log("listening");
})
