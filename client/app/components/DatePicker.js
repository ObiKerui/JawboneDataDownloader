import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

function DatePickers(props) {
  const { classes, label, defaultValue } = props

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  )
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DatePickers)