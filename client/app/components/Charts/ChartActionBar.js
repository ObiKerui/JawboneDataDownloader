import React from 'react'
import PropTypes from 'prop-types'

import { compose } from 'recompose'

import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'

import withPaper from '../Decorators/WithPaper'

//  -------------------------------------------------
//  
//  -------------------------------------------------
// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2,
//   },
// })

const styles = theme => ({
    root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 1,    
  }),
  // root: {
  //   width: '100%',
  //   marginTop: 10,
  // },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  card: {
    //maxWidth: 400,
    marginBottom: 4
  },
  media: {
    //height: 194,
  },
  // expand: {
  //   transform: 'rotate(0deg)',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)',
  // },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  flexGrow: {
    flex: '1 1 auto',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  }  
})


//  -------------------------------------------------
//  
//  -------------------------------------------------
class ChartPlotDropDown extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      metric: ''
    }
  }

  componentWillMount() {
    this.setState({
      metric: 10
    })
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
    const { onChange } = this.props
    onChange(name, event.target.value)
  }

  render() {
    const { classes, name, helperText, arrayFields, start, end } = this.props
    const startDate = 'starting date'
    const endDate = 'ending date'
    const defaultValue = '01/01/1970'

    const menuItems = arrayFields.map((field, i) => 
        <MenuItem key={i} value={field.value}>{field.text}</MenuItem>)

    return (
      <form className={classes.container} autoComplete="off">
        
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="char-plot-dropdown">{name}</InputLabel>
          <Select
            value={this.state.metric}
            onChange={this.handleChange('metric')}
            input={<Input id="char-plot-dropdown" />}
          >
            {menuItems}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="date"
            label={startDate}
            type="date"
            value={this.props.start}
            onChange={this.handleChange('start')}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <TextField
            id="date"
            label={endDate}
            type="date"
            value={this.props.end}
            onChange={this.handleChange('end')}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      
      </form>
    )
  }
}

ChartPlotDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
}

//export default withStyles(styles)(ChartPlotDropDown)

export default compose(
  withStyles(styles),
  withPaper  
)(ChartPlotDropDown)

