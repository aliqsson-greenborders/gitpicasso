import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import debounce from 'lodash/debounce'

class YearSelector extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.sendYear = debounce(this.sendYear, 300);
    }

    sendYear = (year) => {
        this.props.changeState('year', year)
    }

    handleChange = (e) => {
        this.sendYear(e.target.value);
    }

    render() {
        return (
            <div className="yearSelector">
                <TextField
                    onChange={this.handleChange}
                    id="standard-textarea"
                    label="Enter Year"
                    helperText="Enter the year you want to populate"
                    type="number"
                />
            </div>
        )
    }
}

export default YearSelector;
