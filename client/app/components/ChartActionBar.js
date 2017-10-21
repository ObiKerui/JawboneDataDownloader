import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

//  -------------------------------------------------
//  
//  -------------------------------------------------
const styles = theme => ({
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
});

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
    const { classes, name, helperText, arrayFields } = this.props

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
      </form>
    )
  }
}

ChartPlotDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChartPlotDropDown);