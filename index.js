require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');


const PORT = process.env.PORT;
const MongoURI = process.env.mongoURI;


const userSchema = new mongoose.Schema({
    Name:String,
    Phone:String,
    describe:String
})

const User = mongoose.model('User',userSchema);

const connectDB = async ()=>{
    await mongoose.connect(MongoURI)
    console.log("connect Successfull");
}

connectDB().catch((error) => console.log(error));

const adduser = async (Name,Phone, describe)=>{
    const user = new User({
        Name,
        Phone,
        describe
    })
    await user.save();
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/api/form', async (request,response)=>{
    const data = request.body;
    const {Name , Phone, describe} = data;
    await adduser(Name,Phone,describe);
    response.send(200);
})

app.get('/api/users',(request,response)=>{
    User.find()
        .then((users)=>{
            response.send(users);
        })
})
app.listen(PORT,()=>{
    console.log(`Server is running on PORT${PORT}`);
})