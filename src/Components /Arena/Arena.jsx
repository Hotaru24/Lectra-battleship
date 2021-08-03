//import {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Arena.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Arena = () => {

  const classes = useStyles();

  return(
    <div id="arena-body">
      <h1>Arena Component</h1>
      <div id="shipyard">
        <h2>Chantier naval</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Nom du navire" />
          <div>
            <h3>Proue</h3>
            <TextField id="standard-basic" label="Position en x" />
            <TextField id="standard-basic" label="Position en y" />
          </div>
          <div>
            <h3>Poupe</h3>
            <TextField id="standard-basic" label="Position en x" />
            <TextField id="standard-basic" label="Position en y" />
          </div>
          <Button variant="contained">Construire</Button>
        </form>
      </div>
      <div id="map">
        <h2>carte</h2>
      </div>
      <div id="warzone">
        <h2>Zone de tire</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Position en x" />
            <TextField id="standard-basic" label="Position en y" />
            <Button variant="contained">Tirer</Button>
        </form>
      </div>

    </div>
  )
}

export default Arena;