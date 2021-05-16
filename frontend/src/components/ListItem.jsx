import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

const ListItem = ({ student }) => {
    return (
        <Card variant='outlined'>
            <CardContent style={{display: 'flex', flexDirection: 'row', textAlign: 'center'}}>
                <Typography style={{width: '10%'}}>{student.roll}</Typography>
                <Typography style={{width: '25%'}}>{student.name}</Typography>
                <Typography style={{width: '10%'}}>{student.physics}</Typography>
                <Typography style={{width: '10%'}}>{student.chemistry}</Typography>
                <Typography style={{width: '10%'}}>{student.maths}</Typography>
                <Typography style={{width: '20%'}}>{student.total}</Typography>
                <Typography style={{width: '20%'}}>{student.percentage}</Typography>
            </CardContent>
        </Card>
    )
}

export default ListItem
