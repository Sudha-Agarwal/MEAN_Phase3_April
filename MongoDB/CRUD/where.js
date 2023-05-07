const mongoose = require('mongoose');
const UserSchema = require('./users');

const uri = 'mongodb://127.0.0.1:27017/mydb';
//mongodb://localhost:27017
//const uri = 'mongodb+srv://sudhamangla:ifbAgvkraul4n6IC@cluster0.mgrqz5r.mongodb.net/mydb?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log('DB connected')
}).catch(err => console.log(err));

const User = mongoose.model("User", UserSchema);

async function searchUser1(){
    const result = await User.find({
        $where: function(){
            return this.name.includes('a')
        }
    });
    console.log(result);
}

function searchUser2(){
    User.find({
        $where: function(){
            for(var props in this){
                if(props === 'name' && this[props].charAt(0) === 'A'){
                    return true
                }
            }
            return false;
        }
    }).then(data => console.log(data))
}

function searchUser3(){
    User.find({
        $where: function(){
            for(let i = 0; i< this.hobbies.length; i++){
                for(let j = 1+i; j<this.hobbies.length ;j++){

                }
            }
        }
    })
}

searchUser2();


