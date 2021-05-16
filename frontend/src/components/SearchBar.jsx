import React from 'react'
import { TextField } from '@material-ui/core'

const SearchBar = ({label, onChangeHandler}) => {
    return (
        <TextField
            onChange={onChangeHandler}
            label={label}
            variant='outlined'
        />
    )
}

export default SearchBar
