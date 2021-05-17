import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import {Container, Breadcrumbs, Grid, Button, InputLabel, TextField } from '@material-ui/core'

const Form = () => {
    const [roll, setRoll] = useState('');
    const [name, setName] = useState('');
    const [physics, setPhysics] = useState(0);
    const [maths, setMaths] = useState(0);
    const [chemistry, setChemistry] = useState(0);

    const handleSubmit = (event) => {
        Axios.post("http://localhost:5000/api/student", {
            name: name,
            roll: roll,
            physics: physics,
            chemistry: chemistry,
            maths: maths
        }).then((response) => {
            alert(response.data.message);
        }, (error) => {
            console.log(error);
        })
    }

    
    return (
        <Container>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to='/'><h1>Home Page</h1></Link>
                <h1>Add A Record</h1>
            </Breadcrumbs>
            <form style={{textAlign: 'center', padding: '1vw'}} onSubmit={handleSubmit}>
                <Grid container spacing={2} justify='space-evenly'>
                    <Grid item xs={12}>
                        <InputLabel>Enter Name: </InputLabel>
                        <TextField variant="outlined" required name="name" onChange={(e) => setName(e.target.value)} style={{minWidth: '50%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Enter Roll: </InputLabel>
                        <TextField variant="outlined" required name="roll" onChange={(e) => setRoll(parseInt(e.target.value))} style={{minWidth: '50%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Enter Physics Marks: </InputLabel>
                        <TextField variant="outlined" required name="physics" onChange={(e) => setPhysics(parseFloat(e.target.value))} style={{minWidth: '50%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Enter Chemistry Marks: </InputLabel>
                        <TextField variant="outlined" required name="chemistry" onChange={(e) => setChemistry(parseFloat(e.target.value))} style={{minWidth: '50%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Enter Math Marks: </InputLabel>
                        <TextField variant="outlined" required name="maths" onChange={(e) => setMaths(parseFloat(e.target.value))} style={{minWidth: '50%'}}/>
                    </Grid>
                </Grid>
                <Grid container spacing={0} justify="center">
                    <Button variant="contained" color="primary" type='submit' style={{marginTop: '5vh'}}>
                        Submit
                    </Button>
                </Grid>
            </form>
            
        </Container>
    )
}

export default Form
