import {useState, useContext} from 'react';
import CtxBoat from  '../CtxBoat';
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

  const classes = useStyles(); //material UI 

  const [boatsList, setBoatsList]  = useContext(CtxBoat);
  const [newBoat, setNewBoat] = useState({
    name: '',
    frontX: '',
    frontY: '',
    rearX: '',
    rearY: '',
    pv: '',
    state: 'never hit'  
  });
  

  const creatBoat = () => { 

    let fx = Number(newBoat.frontX);
    let fy = Number(newBoat.frontY);
    let rx = Number(newBoat.rearX);
    let ry = Number(newBoat.rearY);
    let values = (fx|| ry || fy || rx);

    if (rx === fx) {
      newBoat.pv = fx - ry;
    } else {
      newBoat.pv = fx - rx;
    };     
    
    if (values.length < 1 || newBoat.name.length < 1){
      alert("All the fileds must be completed !")
    } else if (values > 9 || values < 0 ){
      alert("Values must be between 0 and 9 !")
    } else if(rx > fx || ry > fy){
      alert("Rear cant be under the front !")
    } else if (fx !== rx && fy !== ry) {
      alert("Boat cant be in diagonal !")
    } else {    
      setBoatsList([...boatsList, newBoat]);
    }
  }

  

  return(
    <div id="arena-body">
      <div id="shipyard">
        <h2>Chantier naval</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="standard-basic" 
            label="Nom du navire" 
            onChange={(e) => setNewBoat({ ...newBoat, name: e.target.value})}/>
          <div>
            <p>Proue</p>
            <TextField 
              id="standard-basic" 
              label="Position en x" 
              onChange={(e) => setNewBoat({ ...newBoat, frontX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              label="Position en y" 
              onChange={(e) => setNewBoat({ ...newBoat, frontY: e.target.value})}/>
          </div>
          <div>
            <p>Poupe</p>
            <TextField 
              id="standard-basic" 
              label="Position en x" 
              onChange={(e) => setNewBoat({ ...newBoat, rearX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              label="Position en y" 
              onChange={(e) => setNewBoat({ ...newBoat, rearY: e.target.value})}/>
          </div>
          <Button tvariant="raised" onClick={creatBoat}>Construire</Button>
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