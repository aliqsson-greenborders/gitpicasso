import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import debounce from 'lodash/debounce'

class YearSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
             currentYear: new Date().getFullYear()
        }
    }

    componentDidMount() {
        // this.sendYear = debounce(this.sendYear, 300);
    }

    sendYear = (year) => {
        this.props.changeState('year', year)
    }

    handleChange = (e) => {
        let year = parseInt(e.target.value);
        year = year < 0 ? 0 : year
        year = (year > this.state.currentYear) ? this.state.currentYear : year;
        this.sendYear(year);
    }

    render() {
        return (
            <div className="yearSelector">
                <TextField
                    value = {this.props.year}
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
