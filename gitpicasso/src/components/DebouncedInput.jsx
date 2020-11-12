import React, {Component, PropTypes} from 'react';
import debounce from 'lodash/debounce';

class DebouncedInputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }
    
    componentDidMount() {
        this.sendTextChange = debounce(this.sendTextChange, 500);
        this.setState({text:this.props.text});
    }
    
    render() {
        return (
            <input onChange={this.handleTextChange} value={this.state.text} />
        );
    }
    
    handleTextChange = (e) => {
        this.setState({text: e.target.value});
        this.sendTextChange(e.target.value.trim())
    };
    
    sendTextChange = (text) => {
        this.props.updateText('text', text);
    };
}

export default DebouncedInputComponent;