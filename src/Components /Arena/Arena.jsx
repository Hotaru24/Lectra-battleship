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


  const createBoat = async () => { 

    let fx = Number(newBoat.frontX);
    let fy = Number(newBoat.frontY);
    let rx = Number(newBoat.rearX);
    let ry = Number(newBoat.rearY);
    let values = (fx|| ry || fy || rx);
    let shipArea = false;

    if (rx === fx) { // PV calculate with the ship length
      newBoat.pv = fy - ry + 1;
    } else {
      newBoat.pv = fx - ry + 1;
    };      

    boatsList.map( createdBoat => { //check if area is free
      let result = false;
      for (let i = 0; i < createdBoat.pv; i++) {
        if( ((Number(createdBoat.frontX) === fx) && (Number(createdBoat.rearX) + i === rx) && (Number(createdBoat.rearY) === ry)) ||
            ((Number(createdBoat.frontY) === fy) && (Number(createdBoat.rearX)  === rx) && (Number(createdBoat.rearY) + i === ry)) ) {
              result = true;
              shipArea = result;
              break
        } 
      } 
      return(result = false)
    });  

    if (values.length < 1 || newBoat.name.length < 1){ // required input
      alert("All the fileds must be completed !")
    } else if (values > 9 || values < 0 ){ //good length
      alert("Values must be between 0 and 9 !")
    } else if(shipArea === true){ 
      alert("There is already a ship at this place !") //free area ?
    } else if(rx > fx || ry > fy){
      alert("Rear cant be under the front !") //orientation
    } else if (fx !== rx && fy !== ry) {
      alert("Boat cant be in diagonal !") //orientation 2
    } else {    
      setBoatsList([...boatsList, newBoat]); // creat the boat
    }

  }
  
  
  const shoot = () => {
    let sX = newShoot.shootX;
    let sY = newShoot.shootY;

    if (shootsList.includes(newShoot)) { // check if already shoot
      alert('area already targeted') 
    } else {
      boatsList.map(boat => {
        if((sX === (boat.frontX && boat.rearX) && sY >= boat.rearY && sY <= boat.frontY)|| // check if there is a boat in area
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
        <h2>Shipyard</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="standard-basic" 
            label="Ship name" 
            onChange={(e) => setNewBoat({ ...newBoat, name: e.target.value})}/>
          <div>
            <p>Front</p>
            <TextField 
              id="standard-basic" 
              type="number"
              helperText="empty filed = 0"
              label="Position x" 
              onChange={(e) => setNewBoat({ ...newBoat, frontX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              type="number"
              helperText="empty filed = 0"
              label="Position y" 
              onChange={(e) => setNewBoat({ ...newBoat, frontY: e.target.value})}/>
          </div>
          <div>
            <p>Rear</p>
            <TextField 
              id="standard-basic"
              type="number"
              helperText="empty filed = 0"
               label="Position x" 
              onChange={(e) => setNewBoat({ ...newBoat, rearX: e.target.value})}/>
            <TextField 
              id="standard-basic"
              type="number"
              helperText="empty filed = 0"
              label="Position y" 
              onChange={(e) => setNewBoat({ ...newBoat, rearY: e.target.value})}/>
          </div>
          <Button tvariant="raised" onClick={createBoat}>Build</Button>
        </form>
      </div>
      <div id="map">
        <h2>Map</h2>
      </div>
      <div id="warzone">
        <h2>War Zone</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              type="number"
              helperText="empty filed = 0"
              label="Position x" 
              onChange={(e) => setNewShoot({ ...newShoot, shootX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              type="number"
              helperText="empty filed = 0"
              label="Position y" 
              onChange={(e) => setNewShoot({ ...newShoot, shootY: e.target.value})}/>
            <Button variant="contained" onClick={shoot}>Shoot</Button>
        </form>
      </div>

    </div>
  )
}

export default Arena;