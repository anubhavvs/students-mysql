import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
})

const DBNAME = process.env.DBNAME || 'students';
const PORT = process.env.PORT || 5000;

//GET ALL STUDENTS
app.get('/api/student', (req, res) => {
    const sort = req.query.sort ? req.query.sort : 'percentage DESC'
    const getQuery = `SELECT * from ${DBNAME} ORDER BY ${sort}`;
    connection.query(getQuery, (error, result) => {
        if(error) {
            throw error
        } else {
            res.json(result)
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
    connection.query(insertQuery, values, (error, result) => {
         if(error) {
            throw error;
        }
        else {
            if(result.affectedRows === 0) {
                res.json({ 'message': `Roll ${roll} already exists.` });
            }
            else {
                res.json({ 'message': `Student with roll ${roll} inserted successfully.` });
            }
        }
    })
})

//DELETES ALL DATA
app.post('/api/delete', (req, res) => {
    const deleteQuery = `TRUNCATE ${DBNAME}`
    connection.query(deleteQuery, (error, results) => {
        if(error) {
            throw error;
        }
        else{
            res.send('All data deleted!');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})