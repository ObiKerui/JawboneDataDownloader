import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class JawboneTabs extends React.Component {
  state = {
    value: 0,
    tabPage: null
  };

  handleChange = (event, value) => {
    var { onTabChange } = this.props;
    this.setState({ value });
    const page = onTabChange({ value : value });
    this.setState({tabPage : page });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { tabChangeFtn } = this.props;
    const { headers } = this.props;

    const headerTitles = headers.map((header, i) => <Tab key={i} label={header} />);
    // const tabPages = headers.map((header, i) => <TabContainer>{this.state.tabPage}</TabContainer>);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >

            {headerTitles}

          </Tabs>
        </AppBar>
      </div>
    );
  }
}

JawboneTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JawboneTabs);