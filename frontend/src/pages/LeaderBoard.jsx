import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Fuse from 'fuse.js';
import Listitem from '../components/ListItem';
import SearchBox from '../components/SearchBar';
import { Card, Container, CardContent, Typography, Breadcrumbs, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const LeaderBoard = () => {
    const [studentList, setStudentList] = useState([]);
    const [sort, setSort] = useState('')
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
            Axios.get('http://localhost:5000/api/student', {
                params: {
                    sort: sort
                }
            }).then((response) => {
                setStudentList(response.data)
                setLoading(true)
        })
    }, [loading, sort])

    return (
        <Container>
            <Breadcrumbs aria-label='breadcrumb'>
                <Link to='/'><h1>Home Page</h1></Link>
                <h1>Leaderboards</h1>
            </Breadcrumbs>
            <Container style={{padding: '0px 0px 2vw 0px'}}>
                <SearchBox
                    onChangeHandler={(e)=>searchData(e.target.value)}
                    label='Search With Name'
                />
                <FormControl variant="outlined" style={{marginLeft: '3vw', minWidth: '10vw'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={sort}
                        label="Sort"
                        onChange={(e)=> setSort(e.target.value)}
                        placeholder="Percentage DESC"
                    >
                        <MenuItem value="percentage ASC">
                            Percentage (ASC)
                        </MenuItem>
                        <MenuItem value="name ASC">
                            Name (ASC)
                        </MenuItem>
                        <MenuItem value="name DESC">
                            Name (DESC)
                        </MenuItem>
                    </Select>
                </FormControl>
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
