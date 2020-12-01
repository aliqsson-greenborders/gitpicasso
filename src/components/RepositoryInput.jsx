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
            <div className="field-row-stacked">
                <label for="text23">Repository Name</label>
                <input
                    id="text23"
                    className="standard-input"
                    onChange={this.handleChange}
                    label="Repo Name"
                    placeholder="Repo Name"
                />
            </div>

        )
    }
}