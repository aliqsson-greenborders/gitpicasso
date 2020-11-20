import React from 'react' 
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'

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
        const {text} = this.state;
        return (
            <TextField
                onChange={this.handleChange}
                id="standard-textarea"
                // value={text}
                label='Github'
                helperText="Enter your GitHub username"
            />
        )
    }
}