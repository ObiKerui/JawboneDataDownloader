import React from 'react';
import PropTypes from 'prop-types';
import red from 'material-ui/colors/red';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';

const withCard = (Component) =>
  class WithCard extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
    const { classes, title, subTitle, avatar } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="GroupImage" className={classNames(classes.avatar, classes.bigAvatar)} src={avatar}/>
            }
            title={title}
            subheader={subTitle}
          />
          <CardContent>
            <Component {...this.props} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withCard