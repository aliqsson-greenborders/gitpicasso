import React from 'react'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'
import { makeStyles } from '@material-ui/core/styles';


export default class UserNameInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            github: props.github,
        }
    }

    componentDidMount() {
        this.sendGithub = debounce(this.sendGithub, 300);
    }

    sendGithub = (github) => {
        this.props.changeState('github', github);
    }

    handleChange = (e) => {
        this.sendGithub(e.target.value);
    }

    render() {
        const { text } = this.state;
        return (
            <div className="field-row-stacked">
                <label for="text22">GitHub username</label>
                <input
                    id="text22"
                    className="standard-input"
                    onChange={this.handleChange}
                    value={text}
                    placeholder="Github"
                    label='Github'
                    autoFocus="true"
                // color="primary"
                // shrink="true"
                />
            </div>

        )
    }
}