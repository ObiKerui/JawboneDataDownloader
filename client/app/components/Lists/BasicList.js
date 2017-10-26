import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui-icons/Info'
import DefaultUserImage from '../../../assets/users.png'
import Grid from 'material-ui/Grid'

const BasicListStyle = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
})

const BasicList = (Component) =>
  class List extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      const { classes, listData } = this.props

      console.log('classes to basic list: ', classes)

      const cellHeight = 100

      return (
        <div className={classes.container}>
          <GridList cellHeight={cellHeight} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <Subheader> </Subheader>
            </GridListTile>
            {listData.map((listItem, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Component element={listItem} index={i} {...this.props} />
              </Grid>
            ))}
          </GridList>
        </div>
      )
    }
  }

//export default BasicList
export {
  BasicListStyle,
  BasicList
}
