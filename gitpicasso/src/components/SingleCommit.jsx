
import React from 'react'

export default class SingleCommit extends React.Component {

    constructor() {
        super()
        this.state = {
            clicked: false,
            commitsCount: 0,
        }
    }

    increaseCount = () => {
        this.setState({commitsCount: this.state.commitsCount+1})
    }

    decreaseCount = () => {
        const {commitsCount} = this.state;
        commitsCount > 0 && this.setState({commitsCount: this.state.commitsCount-1})
    }

    handleClick = () => {
        const {clicked} = this.state;
        this.setState({clicked: true}, this.increaseCount())
    }

    handleRightClick = (e) => {
        this.decreaseCount()
        e.preventDefault();
    }

    render() {
        const { clicked, commitsCount } = this.state
        return (
        <div className="commit" 
            style={{ 
            backgroundColor: (clicked && commitsCount>0) && '#40C462' }} 
            onClick={this.handleClick} 
            onContextMenu={this.handleRightClick}>
                {commitsCount>0 ? commitsCount : ' '}
        </div>
        )
    }
}