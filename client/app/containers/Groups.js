import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Grid from 'material-ui/Grid';
import AppBar from '../components/JawboneAppBar';
import UserPanel from '../components/UserPanel';
import GroupPanel from '../components/GroupPanel';

import defUserImage from '../../assets/users.png';

//----------------------------------
//  APP 
//----------------------------------
export default ({ match }) => (
  <Switch>
    <Route exact path='/groups' component={GroupPanel}/>
    <Route path='/groups/:groupId' component={UserPanel}/>
  </Switch>  
);
