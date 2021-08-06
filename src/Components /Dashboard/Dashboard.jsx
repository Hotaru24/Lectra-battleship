import {useContext} from 'react';
import CtxBoat from  '../CtxBoat';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Dashboard.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10 + 'px',
    width: 40 + 'vw'
  }
});

const Dashboard = () => {

  const classes = useStyles();
  const [boatsList]  = useContext(CtxBoat);

  return(
    <>
      <h1>Fleet </h1>
        {boatsList.map( boat => {
          return(      
            <Card className={classes.root}>
              <CardContent>
                {`${boat.name} : ${boat.state} (PV: ${boat.pv})`}        
              </CardContent>
            </Card>
          )
        })}
    </>
  )
}

export default Dashboard;