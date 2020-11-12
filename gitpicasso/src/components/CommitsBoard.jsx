import React from 'react'
import yearDays from 'year-days'
import SingleCommit from './SingleCommit'

function getWeek(days) {
    const insideAr = []
    for (let i=0; i<days; i++) {
        insideAr.push(<SingleCommit />)
    }

    return insideAr;
}

export default class CommitsBoard extends React.Component {

    constructor() {
        super()
        this.state = {
            ar: []
        }
    }


    componentDidMount() {
        const weeks = 52;
        const days = 7;
        const {ar} = this.state;
        for(let i=0; i<weeks; i++) {
            ar.push(<div className="cols">{getWeek(days)}</div>)
        }
        const daysOfTheYear = yearDays(2020);
        const remainingDays = daysOfTheYear - (weeks * 7);
        console.log(remainingDays, 'remaining days')
        ar.push(<div className="cols">{getWeek(remainingDays)}</div>)
        
        this.setState({ar})        
    }

    render() {
        return (
        <div className="commitsBoard">{this.state.ar}</div>
        )
    }
}