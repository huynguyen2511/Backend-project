import express from 'express';
import cors from 'cors';
require('dotenv').config();
import initRoutes from './src/routes'
require('./connection_database')

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());// khi da qua cua cors(dung theo minh config)=> xem co dem data theo khong => lay data => cong bo sang json(midlleware nay giup doc du lieu gui len dang json)
app.use(express.urlencoded({extended: true})); //Doc cac kieu data khac nhu mang? => convert sang json

initRoutes(app)
const PORT = process.env.PORT || 8888

const listener = app.listen(PORT, ()=>{
    console.log('Server is running on port ' + listener.address().port);
})