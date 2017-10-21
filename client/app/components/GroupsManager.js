import React from 'react';
import { connect } from 'react-redux'
import { fetchGroups } from '../actions/groupsActions'
import GroupPanel from './GroupPanel'


const withGroupsManager = (Component) =>
  // ...and returns another component...

  @connect((store) => {
    return {
      users: store.users.users,
      //groups: store.groups.groups.map((group) => ({...group, patients: group.patients.map((id) => store.users.users[id]) })),
      groupStore: store.groups,
      fetching: store.groups.fetching
    };
  })
  class WithGroupsManager extends React.Component {

    constructor(props) {
      super(props);

      console.log('props to groups manager: ', props);
    }

    componentWillMount() {
      this.props.dispatch(fetchGroups());
    }

    render() {

      const { classes, users, groupStore } = this.props;
      const { groups } = groupStore;
      const selectedGroup = groups[0];

      //console.log('selected group : ', selectedGroup);
      //console.log('selected group patients : ', selectedGroup.patients);      

      // const groupWithMembers = selectedGroup.patients.map((id) => (
      //   console.log('patient id: ', id)
      // ));

      //console.log('the groups to group panel : ', groupsWithMembers);

      return (    
        <Component group={groups} {...this.props}/>
      );    
    }
  }

export default withGroupsManager(GroupPanel);
