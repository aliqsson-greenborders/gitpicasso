import React from 'react' 
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'

export default class RepositoryInput extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.sendRepo = debounce(this.sendRepo, 300);
    }

    sendRepo = (repo) => {
        this.props.changeState('repo', repo);
    }

    handleChange = (e) => {
        this.sendRepo(e.target.value)
    }



    render() {
        return (
            <TextField
                onChange={this.handleChange}
                id="standard-textarea"
                label="Repo Name"
            />
        )
    }
}