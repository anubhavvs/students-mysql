import express from 'express'
import connection from './db.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config();

const DBNAME = process.env.DBNAME || 'students';
const PORT = process.env.PORT || 5000;

connection.connect((err) => {
    if(err) {
        console.error(err.stack);
    }
    else {
        console.log(`Connected to Database: ${process.env.MYSQL_DATABASE}`)
    }
});

//GET ALL STUDENTS
app.get('/api/student', (req, res) => {
    const getQuery = `SELECT * from ${DBNAME} ORDER BY percentage DESC`
    connection.query(getQuery, (err, result)=>{
        if(err) {
            res.json(err.sqlMessage);
        }else {
            res.json(result);
        }
    });
})

//ADD A STUDENT DATA
app.post('/api/student', (req, res) => {
    const roll = req.body.roll;
    const name = req.body.name;
    const maths = req.body.maths;
    const physics = req.body.physics;
    const chemistry = req.body.chemistry;
    const total = maths+physics+chemistry;
    const percentage = ((total/300)*100).toFixed(2);
    const insertQuery = `INSERT INTO ${DBNAME} (roll, name, maths, physics, chemistry, total, percentage) SELECT * FROM ( SELECT ?, ?, ? AS maths, ? AS physics, ? AS chemistry, ?, ?) AS tmp WHERE NOT EXISTS ( SELECT roll FROM ${DBNAME} WHERE roll=?)`
    const values = [roll, name, maths, physics, chemistry, total, percentage, roll];
    connection.query(insertQuery, values, (err, result) => {
        if(err) {
            if(err.errno == 1060) {
                res.json({ 'message': `Roll ${roll} already exists` });
            }
            else {
                console.error(err);
            }
        }
        else {
            res.json({ 'message': `Student with roll ${roll} inserted successfully.` });
        }
    })
})

//DELETES ALL DATA
app.post('/api/delete', (req, res) => {
    const deleteQuery = `TRUNCATE ${DBNAME}`
    connection.query(deleteQuery, (err, results) => {
        if(err) {
            console.error(err);
        }
        else{
            res.send('All data deleted!');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})