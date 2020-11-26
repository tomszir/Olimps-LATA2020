import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Map from './Map';
import Profile from './Profile';
import Location from './Location';
import Scoreboard from './Scoreboard';
import PageNotFound from './404';

const Screens: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/map' component={Map} />
      <Route path='/user/:id' component={Profile} />
      <Route path='/location/:id' component={Location} />
      <Route path='/scoreboard' component={Scoreboard} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Screens;
