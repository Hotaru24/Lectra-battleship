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

  const [shootsList, setShootsList]  = useState([]);
  const [newShoot, setNewShoot] = useState({
    shootX: '',
    shootY: '',
  });
  

  const createBoat = () => { 

    let fx = Number(newBoat.frontX);
    let fy = Number(newBoat.frontY);
    let rx = Number(newBoat.rearX);
    let ry = Number(newBoat.rearY);
    let values = (fx|| ry || fy || rx);

    if (rx === fx) {
      newBoat.pv = fy - ry + 1;
    } else {
      newBoat.pv = fx - ry + 1;
    };     
    
    if (values.length < 1 || newBoat.name.length < 1){ //required 
      alert("All the fileds must be completed !")
    } else if (values > 9 || values < 0 ){ //length
      alert("Values must be between 0 and 9 !")
    } else if(rx > fx || ry > fy){
      alert("Rear cant be under the front !") //orientation
    } else if (fx !== rx && fy !== ry) {
      alert("Boat cant be in diagonal !") //orientation 2
    } else {    
      setBoatsList([...boatsList, newBoat]);
    }
  }
  
  const shoot = () => {
    let sX = newShoot.shootX;
    let sY = newShoot.shootY;

    if (shootsList.includes(newShoot)) {
      alert('area already targeted') // already shoot
    } else {
      boatsList.map(boat => {
        if((sX === (boat.frontX && boat.rearX) && sY >= boat.rearY && sY <= boat.frontY)||
           (sY === (boat.frontY && boat.rearY) && sX >= boat.rearX && sX <= boat.frontX)){
            return(
            setShootsList([...shootsList, newShoot]),
            boat.pv = Number(boat.pv) - 1,
            Number(boat.pv) === 0 ? (alert("Sunk !"), boat.state = 'Sunk') : (alert("Hit!"), boat.state = 'Hit')        
            )
        } else {
          return (alert("missed..."));          
        }
      })      
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
          <Button tvariant="raised" onClick={createBoat}>Construire</Button>
        </form>
      </div>
      <div id="map">
        <h2>carte</h2>
      </div>
      <div id="warzone">
        <h2>Zone de tire</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              label="Position en x" 
              onChange={(e) => setNewShoot({ ...newShoot, shootX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              label="Position en y" 
              onChange={(e) => setNewShoot({ ...newShoot, shootY: e.target.value})}/>
            <Button variant="contained" onClick={shoot}>Tirer</Button>
        </form>
      </div>

    </div>
  )
}

export default Arena;