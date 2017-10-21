import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Grid from 'material-ui/Grid';
import AppBar from '../components/JawboneAppBar';
import UserPanel from '../components/UserPanel';

import defUserImage from '../../assets/users.png';

//----------------------------------
//  APP 
//----------------------------------
export default ({ match }) => (
    <Switch>
      <Route exact path='/users' component={UserPanel}/>
      <Route path='/users/:userId' component={UserPanel}/>
    </Switch>  
);

