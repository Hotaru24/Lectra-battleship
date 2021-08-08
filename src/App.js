import React, {useState} from 'react';
import './App.css';
import Arena from './Components /Arena/Arena.jsx';
import Dashboard from './Components /Dashboard/Dashboard.jsx';
import CtxBoat from './Components /CtxBoat.jsx';
import CtxShoot from './Components /CtxShoot.jsx';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: { 
    backgroundImage : 'url(https://images.wallpaperscraft.com/image/wood_board_texture_159786_1920x1080.jpg)',
    display: 'flex',
    alignItems: 'center'
    },
}));

const App = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [boatsList, setBoatsList] = useState([]);
  const [shootsList, setShootsList] = useState([]);

  return (
    <div className="App">
      <CtxBoat.Provider value={[boatsList, setBoatsList]}>
      <CtxShoot.Provider value={[shootsList, setShootsList]}>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tab}>
              <Tab label="Arena" {...a11yProps(0)} />
              <Tab label="Fleet" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Arena/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Dashboard/>
          </TabPanel>
        </div>
      </CtxShoot.Provider>
      </CtxBoat.Provider>
    </div>
  );
}

export default App;
