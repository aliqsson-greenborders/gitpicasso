
import React from 'react'

export default class SingleCommit extends React.Component {

    handleRightClick = (e) => {
        e.preventDefault();
    }

    render() {
        const {commits, handleClick, id, allowDrawOnMouseOver} = this.props
        const color = (commits[id]) ? commits[id].color : '#EBEDF0'
        const count = (commits[id]) ? commits[id].count : 0
        return (
        <div className="commit" 
            id={id}
            style={{ 
            backgroundColor: color }} 
            onClick={handleClick}
            onDragEnter={handleClick}
            // onMouseEnter={allowDrawOnMouseOver && handleClick}
            onContextMenu={handleClick}>{count}</div>
        )
    }
}

    // increaseCount = () => {
    //     this.setState({commitsCount: this.state.commitsCount+1})
    // }

    // decreaseCount = () => {
    //     const {commitsCount} = this.state;
    //     commitsCount > 0 && this.setState({commitsCount: this.state.commitsCount-1})
    // }

    // handleClick = (e) => {
    //     const {commitsData} = this.props
    //     e.preventDefault();
    //     const {id} = e.target
    //     this.props.updateCommits(id)
    //     const color = commitsData[id].color
    //     const {commitsCount} = this.state
    //     this.setState({clicked:true, color, commitsCount})
    // }

    // setColor = (id) => {
    //     const max = this.props.getMaxCommits()
    //     console.log('max in commit', max)
    //     const commitsCount = this.props.commitsData[id];
    //     console.log('commitscount in commit', commitsCount)
    //     const {colorValues} = this.props;
    //     const percent = (max==0) ? 0 : commitsCount/max * 100;
    //     let color = '';

    //     console.log('percent', percent);

    //     if(percent === 0) color = colorValues.commits0
    //     else if(percent <25) color = colorValues.commits1
    //     else if(percent <50) color = colorValues.commits2
    //     else if(percent <75) color = colorValues.commits3
    //     else color = colorValues.commits4;
    //     this.setState({color, commitsCount})
    // }