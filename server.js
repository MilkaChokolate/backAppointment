const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const  cors =require('cors');

const mongoose = require('mongoose');
const url = 'mongodb+srv://Milena:milena1405@cluster0.qro2s.mongodb.net/Appointments?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true});

app.use(cors());
app.use(bodyParser.json());//парсит body
app.use(bodyParser.urlencoded({extended:true})); //парсит форму


const  Schema1 = mongoose.Schema;
let AppointmentSchema = new Schema({
    nameOfPatient: String,
    doctor: String,
    date: Date,
    complaint: String
});
const  Appointment = mongoose.model('Appointment', AppointmentSchema);


const Schema2 = mongoose.Schema;
let UserSchema = new Schema2({
    nameOfPatient: String,
    password: String
})

const User = mongoose.model('User', UserSchema);