const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const a = require('crypto').randomBytes(64).toString('hex');
console.log(a);

const mongoose = require('mongoose');
const url = 'mongodb+srv://Milena:milena1405@cluster0.qro2s.mongodb.net/Appointments?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.json());//парсит body
app.use(bodyParser.urlencoded({extended: true})); //парсит форму


/*const  Schema1 = mongoose.Schema;
let AppointmentSchema = new Schema({
    nameOfPatient: String,
    doctor: String,
    date: Date,
    complaint: String
});
const  Appointment = mongoose.model('Appointment', AppointmentSchema);
*/

const Schema2 = mongoose.Schema;
let UserSchema = new Schema2({
    username: {type: String, unique: true},
    password: String
})

const User = mongoose.model('User', UserSchema);

app.post('/Registration', function (req, res) {
    if ((typeof req.body.username === 'string') && (typeof req.body.password === 'string') && (req.body.username !=="") && (req.body.password !== "")) {
        let salt = bcrypt.genSaltSync(10); //?????
        let passwordToSave = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
        username: req.body.username,
        password: passwordToSave,
        });
        user.save()
        .then(result => {
            res.send({result : 'Пользователь добавлен'})
        })
            .catch(err => {
                return res.sendStatus(500);
                console.log(err);
            })
    } else {
        res.send({result: "Something went wrong"})
    }

})
app.listen(3012, function () {
    console.log('Сервер запущен');
})