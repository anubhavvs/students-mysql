import express from 'express'
import pool from './db.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const DBNAME = process.env.DBNAME || 'students';
const PORT = process.env.PORT || 5000;

//GET ALL STUDENTS
app.get('/api/student', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            connection.release();
            throw err;
        }
        const getQuery = `SELECT * from ${DBNAME} ORDER BY percentage DESC`;
        connection.query(getQuery, (err, result) => {
            if(err) {
                res.json(err.sqlMessage);
            }else {
                res.json(result);
            }
        });
        connection.on('error', (err) => {
            throw err;
        })
    })
})

//ADD A STUDENT DATA
app.post('/api/student', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            connection.release();
            throw err;
        }
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
                console.error(err);
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
        connection.on('error', (err) => {
            throw err;
        })
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