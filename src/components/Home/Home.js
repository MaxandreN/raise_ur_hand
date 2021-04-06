import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Home(){
    let history = useHistory();
    let location = useLocation();

    return(
        <div>
            <h1>Accueil :</h1>
            {location.state ? (<p>cours : {location.state.classe}</p>) : (<p>Bienvenu</p>) }
            <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add" aria-label="add">
                    <Fab color="primary">
                        <AddIcon />
                    </Fab>
                </Tooltip>
        </div>
    )
}

export default Home;