import {useState, useContext} from 'react';
import CtxBoat from  '../CtxBoat';
import CtxShoot from '../CtxShoot';
import Map from '../Map/Map.jsx'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Arena.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },    
  },
  root2: {
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
    size: '',
    state: 'never hit'  
  });

  const [shootsList, setShootsList]  = useContext(CtxShoot);
  const [newShoot, setNewShoot] = useState({
    shootX: '',
    shootY: '',
  });


  const createBoat = async () => { 

    let fx = newBoat.frontX.length > 0 ? Number(newBoat.frontX) : "";
    let fy = newBoat.frontY.length > 0 ? Number(newBoat.frontY) : "";
    let rx = newBoat.rearX.length > 0 ? Number(newBoat.rearX) : "";
    let ry = newBoat.rearY.length > 0 ? Number(newBoat.rearY) : "";
    let shipArea = false;

    if (rx === fx) { // PV calculate with the ship length
      newBoat.pv = fy - ry + 1;
      newBoat.size = newBoat.pv;
    } else {
      newBoat.pv = fx - ry + 1;
      newBoat.size = newBoat.pv;
    };      

    boatsList.map( createdBoat => { //check if area is free
      let result = false;
      for (let i = 0; i < createdBoat.size; i++) {
        if( ((Number(createdBoat.frontY) === fy) && (Number(createdBoat.rearX) + i === rx) && (Number(createdBoat.rearY) === ry)) ||
            ((Number(createdBoat.frontX) === fx) && (Number(createdBoat.rearX)  === rx) && (Number(createdBoat.rearY) + i === ry)) ) {
              result = true;
              shipArea = result;
              break
        } 
      } 
      return(result = false)
    });  

    if (fx.length < 1 || fy.length < 1 || rx.length < 1 || rx.length < 1 ||newBoat.name.length < 1){ // required input
      alert("All the fileds must be completed !")
    } else if (fx > 9 || fx < 0 || fy > 9 || fy < 0 ||rx > 9 || rx < 0 ||ry > 9 || ry < 0){ //good length
      alert("Values must be between 0 and 9 !")
    } else if(shipArea === true){ 
      alert("There is already a ship at this place !") //free area ?
    } else if(rx > fx || ry > fy){
      alert("Front cant be under the rear !") //orientation
    } else if (fx !== rx && fy !== ry) {
      alert("Boat cant be in diagonal !") //orientation 2
    } else {    
      setBoatsList([...boatsList, newBoat]); // creat the boat
    }

  }
  
  
  const shoot = () => {
    let sX = newShoot.shootX;
    let sY = newShoot.shootY;

    if (newShoot.shootX.length < 1 || newShoot.shootY.length < 1){ // required input
      alert("All the fileds must be completed !")
    } else if (sX > 9 || sX < 0 || sY > 9 || sY < 0 ){ 
      alert("out of range of fire...")
    } else {
      if (shootsList.includes(newShoot)) { // check if already shoot
        alert('area already targeted') 
      } else {
        boatsList.map(boat => {
          if((sX === (boat.frontX && boat.rearX) && sY >= boat.rearY && sY <= boat.frontY)|| // check if there is a boat in area
            (sY === (boat.frontY && boat.rearY) && sX >= boat.rearX && sX <= boat.frontX)){
              return((
                setShootsList([...shootsList, newShoot]), 
                boat.pv = Number(boat.pv) - 1,
                Number(boat.pv) === 0 ? ((alert("Sunk !"), boat.state = 'Sunk')) : (alert("Hit!"), boat.state = 'Hit')        
              ))
          } else {
            return (
              setShootsList([...shootsList, newShoot])
            );          
          }
        })    
      }
    }
  }


  return(
    <div id="arena-body" >
      <div id="shipyard">
        <h2>Shipyard</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="standard-basic" 
            label="Ship name" 
            onChange={(e) => setNewBoat({ ...newBoat, name: e.target.value})}/>
          <div>
            <span>Front</span>
            <TextField 
              id="standard-basic" 
              type="number"
              label="Position x" 
              onChange={(e) => setNewBoat({ ...newBoat, frontX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              type="number"
              label="Position y" 
              onChange={(e) => setNewBoat({ ...newBoat, frontY: e.target.value})}/>
          </div>
          <div>
            <span>Rear</span>
            <TextField 
              id="standard-basic"
              type="number"
              label="Position x" 
              onChange={(e) => setNewBoat({ ...newBoat, rearX: e.target.value})}/>
            <TextField 
              id="standard-basic"
              type="number"
              label="Position y" 
              onChange={(e) => setNewBoat({ ...newBoat, rearY: e.target.value})}/>
          </div>
          <Button variant="contained" onClick={createBoat}>Build</Button>
        </form>
      </div>
      <div id="map">
        <Map/>
      </div>
      <div id="warzone">
        <h2>War Zone</h2>
        <form className={classes.root2} noValidate autoComplete="off">
            <TextField 
              id="standard-basic" 
              type="number"
              label="Position x" 
              onChange={(e) => setNewShoot({ ...newShoot, shootX: e.target.value})}/>
            <TextField 
              id="standard-basic" 
              type="number"
              label="Position y" 
              onChange={(e) => setNewShoot({ ...newShoot, shootY: e.target.value})}/>            
        </form>
        <Button variant="contained" onClick={shoot}>Shoot</Button>
      </div>

    </div>
  )
}

export default Arena;
