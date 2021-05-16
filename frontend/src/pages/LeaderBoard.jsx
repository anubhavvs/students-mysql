import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Fuse from 'fuse.js';
import Listitem from '../components/ListItem';
import SearchBox from '../components/SearchBar';
import { Card, Container, CardContent, Typography, TextField } from '@material-ui/core';

const LeaderBoard = () => {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true)

    const searchData = (pattern) => {
        if (!pattern) {
            setLoading(false)
            return;
        }
        const fuse = new Fuse(studentList, {
          keys: ["name"],
        });
        const result = fuse.search(pattern);
        const matches = [];
        if (!result.length) {
          setStudentList([]);
        } else {
          result.forEach(({item}) => {
            matches.push(item);
          });
          setStudentList(matches);
        }
    };

    useEffect(() => {
            Axios.get('http://localhost:5000/api/student').then((response) => {
            setStudentList(response.data)
            setLoading(true)
        })
    }, [loading])

    return (
        <Container>
            <h1>Leaderboard Page</h1>
            <Container style={{padding: '0px 0px 2vw 0px'}}>
                <SearchBox
                    onChangeHandler={(e)=>searchData(e.target.value)}
                    label='Search With Name'
                />
            </Container>
            <Card variant='outlined'>
                <CardContent style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
                    <Typography style={{width: '10%'}}>Roll</Typography>
                    <Typography style={{width: '25%'}}>Name</Typography>
                    <Typography style={{width: '10%'}}>Physics</Typography>
                    <Typography style={{width: '10%'}}>Chemistry</Typography>
                    <Typography style={{width: '10%'}}>Maths</Typography>
                    <Typography style={{width: '20%'}}>Total</Typography>
                    <Typography style={{width: '20%'}}>Percentage</Typography>
                </CardContent>
            </Card>
            {studentList.map((student)=>{
                return <Listitem student={student} key={student.roll}/>
            })}
        </Container>
    )
}

export default LeaderBoard
