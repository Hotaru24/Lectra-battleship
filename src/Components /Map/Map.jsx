import React, {useEffect, useState, useContext} from 'react';
import CtxBoat from  '../CtxBoat';
import CtxShoot from '../CtxShoot';
import './Map.css';

const Map = () => {

  const [gridMap, setGridMap] = useState([]);
  const [boatsList]  = useContext(CtxBoat);
  const [shootsList]  = useContext(CtxShoot);

  useEffect(() => {
    let gridData = [];
    for (let row = 0; row< 10; row++) { // grenerate grid data x/y
      for (let col = 0; col< 10; col++) {
        let newGridData = {'x': row, 'y': col , 'color': 'cornflowerblue'}
        if (!gridMap.includes(newGridData))
          gridData.push(newGridData)
        }
    }   
    
    boatsList.map(boat => { // add ships from boatList to the map
      gridData.map(cel => {
        for (let i = 0; i < boat.size; i++) {
          if(((Number(boat.frontY) === cel.y) && (Number(boat.rearX) + i === cel.x) && (Number(boat.rearY) === cel.y)) ||
             ((Number(boat.frontX) === cel.x) && (Number(boat.rearX)  === cel.x) && (Number(boat.rearY) + i === cel.y))) {
            return (cel.color = 'saddlebrown')
          }
        }

      })
    })

    shootsList.map(shoot => { // add shoots from shootsList to the map
      gridData.map(cel => {
          if(((Number(shoot.shootY) === cel.y) && (Number(shoot.shootX) === cel.x))) {
            return (cel.color = 'red')
          }
      })
    })

    setGridMap(gridData);
    gridData = []; //clean gridData 
  }, [boatsList, shootsList]);


  return (
    <div id="map-body">
      <div id="grid-map">
        {gridMap.map((cel) => {
          return(
            <div className="grid-item" style={{backgroundColor: cel.color }}></div>
          )
        })}
      </div>
    </div>

  )
}

export default Map;
