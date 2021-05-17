import React from 'react'
import { Button, Container, ButtonGroup } from '@material-ui/core';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <Container>
          <h1>Student Records</h1>
          <ButtonGroup>
            <Link to='/leader'>
                <Button variant="contained">View Leaderboard</Button>
            </Link>
            <Link to='/add'>
                <Button variant="contained">Enter Marks</Button>
            </Link>
          </ButtonGroup>
        </Container>
    )
}

export default Home
