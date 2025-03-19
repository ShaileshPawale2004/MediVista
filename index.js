
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PatientModel = require('./models/patientModel.js');


const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (or specify your frontend URL)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


mongoose.connect("mongodb://localhost:27017/MediVista").then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log(e.message);
})


app.post('/PatientRegister', (req, res)=>{
    console.log(req.body);
    PatientModel.create(req.body).
    then(user => {
        console.log("user cread");
        res.json(user)

    }).
    catch(err => res.json(err));
})


app.post("/PatientLogIn", async(req, res) => {
    console.log("req: ", req.body);
    
    PatientModel.findOne(req.body).
    then(user => {
        console.log("user: ", user);
        
        if(user) res.json("Success");
        else res.json("The user does not exist in our database");
    })
})

app.listen(3001, ()=>{
    console.log("on port 3001");
})