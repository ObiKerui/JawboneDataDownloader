import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import Grid from 'material-ui/Grid';

import AppBar from '../components/JawboneAppBar';
import ProfilePanel from '../components/ProfilePanel';
import GroupsManager from '../components/GroupsManager'

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
//import App from './App';
import Users from './Users';
import Groups from './Groups';
import Profile from '../components/ProfilePanel';

//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------
const withWideScreenContainer = (Component) =>
  class WithWideScreenContainer extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {

      return (
        <Grid container spacing={24}>
          <Grid item md={1} lg={2}>
          </Grid>
          <Grid item xs={12} md={10} lg={8}>
            <Component {...this.props} />
          </Grid>
          <Grid item md={1} lg={2}>
          </Grid>
        </Grid>
      );
    }
  }
//----------------------------------------------------
// WILL REMOVE THIS TO OWN FILE 
//----------------------------------------------------

//----------------------------------
//  APP 
//----------------------------------
// class MainApp extends Component {
  
//   render() {

//     return (
//       <DocumentTitle title='Jawbone App'>
//         <Grid container spacing={24}>
//           <Grid item xs={12}>
//             <AppBar title="Title" />
//           </Grid>
//           <Grid item xs={12} sm={5} md={4}>
//             <Profile />
//           </Grid>
//           <Grid item xs={12} sm={7} md={8}>
//             <Router>
//               <div>
//                 <Redirect from='/' to='/groups' />
//                 <Route name='groups' exact path='/groups' component={GroupsManager} />
//                 <Route name='users' path='/users' component={Users} />              
//               </div>
//             </Router>
//           </Grid>
//         </Grid>                
//       </DocumentTitle>
//     );
//   }
// }

class MainApp extends Component {
  
  render() {

    return (
      <DocumentTitle title='Jawbone App'>     </DocumentTitle>
    );
  }
}

export default withWideScreenContainer(MainApp);