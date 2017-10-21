import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import PanelCard from './PanelCard';
import DefaultGroupImage from '../../assets/group.png';
import DefaultUserImage from '../../assets/users.png';
import JawboneTabs from './JawboneTabs';

import List from './InfScrollList';

import Chart from './GoogleChart';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

class UserPanel extends React.Component {

  constructor(props) {
    super(props);

    this.list = [
      { objectID : 0, title: 'hello', subTitle: 'sub', defaultImage: DefaultUserImage },
      { objectID : 1, title: 'there', subTitle: 'sub', defaultImage: DefaultUserImage },
      { objectID : 2, title: 'you', subTitle: 'sub', defaultImage: DefaultUserImage },
      { objectID : 3, title: 'hello', subTitle: 'sub', defaultImage: DefaultUserImage }
    ];

    this.state = {
      page: null,
      isLoading: false,
    };

  }

  applyResult = (result) => {
    
  }

  fetchUrl = (page) => {
    this.setState({ isLoading : true });
    const pageSize = 4;
    const start = (pageSize * page);
    var result = this.list.slice(start, start + pageSize);
    this.applyResult(result);
    this.setState({ isLoading: false });    
  }

  onInitialLoad = () => {
    this.fetchUrl(0);
  }

  onPaginatedLoad = () => {
    const pageNo = 1;
    this.fetchUrl(pageNo);
  }

  onTabChange = (tabInfo) => {

  }

  render() {

    const classes = this.props.classes;
    const user = this.props.user;

    const userPanelDetail = {
      title : 'some user',
      subHeader : 'some subtitle',
      defaultImage : DefaultUserImage
    };

    const testListElem = {
      title : 'some patient',
      subTitle : 'some subtitle',
      defaultImage : DefaultGroupImage
    };

    const headers = [
      'sleeps',
      'steps'
    ];

    return (    
      <div>
        <PanelCard obj={userPanelDetail} />
        <JawboneTabs 
          headers={headers}
          onTabChange={ this.onTabChange } />
        <Chart />
        <List 
          list={this.list} 
          isLoading={this.state.isLoading}
          onPaginatedLoad={ this.onPaginatedLoad } />
      </div>
    );    

  }
}

UserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPanel);
