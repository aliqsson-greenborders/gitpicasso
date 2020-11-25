import React from 'react'
import { config } from 'dotenv'
import YearSelector from './components/YearSelector'
import UsernameInput from './components/UsernameInput'
import RepositoryInput from './components/RepositoryInput'
import './App.css';
import CommitsBoard from './components/CommitsBoard'
import GenerateScript from './components/GenerateScript'
import Navigation from './components/Navigation'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allowDrawOnMouseOver: false,
      isWrongInput: false,
      github: '',
      year: '2020',
      repo: '',
      isValidGithub: false,
      isValidYear: false,
      isValidRepo: false,
      commits: {},
      minCommits: 0,
      maxCommits: 0,
      maxFreq: 0,

      colorValues: {
        commits0: '#EBEDF0',
        commits1: '#9BE9A8',
        commits2: '#40C462',
        commits3: '#30A14E',
        commits4: '#216E39'
      },
    }
  }

  componentDidMount() {

  }

  getColorGroup = (commitsCount) => {
    const { maxCommits, colorValues } = this.state;
    const percent = (!commitsCount) ? 0 : (commitsCount / maxCommits) * 100;
    let color;
    if (percent === 0) color = colorValues.commits0
    else if (percent < 25) color = colorValues.commits1
    else if (percent < 50) color = colorValues.commits2
    else if (percent < 75) color = colorValues.commits3
    else color = colorValues.commits4;
    return color
  }


  handleClick = (e) => {
    const eventType = e.type;
    e.preventDefault();
    const { id } = e.target;
    const { commits } = this.state;
    let { maxCommits, maxFreq } = this.state
    if (commits[id]) {
      if (commits[id].count === 10 && eventType !== 'contextmenu') return
      if (eventType === 'contextmenu' && commits[id].count > 0) {
        commits[id].count--;
      }
      else commits[id].count++
    } else {
      commits[id] = {}
      eventType === 'contextmenu' ? commits[id].count = 0 : commits[id].count = 1
    }
    commits[id].color = this.getColorGroup(commits[id].count)

    if (commits[id].count > maxCommits) {
      maxCommits = commits[id].count;
      this.setState({ maxCommits })
      this.rerenderColors()
    }
    this.setState({ commits })
  }

  rerenderColors = () => {
    const { commits } = this.state
    for (let key in commits) {
      commits[key].color = this.getColorGroup(commits[key].count)
    }
    this.setState(commits)
  }

  changeState = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { github, year, repo,
      commits, maxCommits, inputCompleted, allowDrawOnMouseOver } = this.state;
    return (
      <div className="App">
        <Navigation />

        <h1>Turn your GitHub into an Artboard</h1>

        <div className="inputs" disabled>
          <UsernameInput github={github} changeState={this.changeState} />
          <YearSelector year={year} changeState={this.changeState} />
          <RepositoryInput repo={repo} changeState={this.changeState} />
        </div>
        <div className="commits-board">
          <CommitsBoard
            handleClick={this.handleClick}
            commits={commits}
            year={year}
            allowDrawOnMouseOver={allowDrawOnMouseOver}
          />
        </div>
        <div>
          <input type="checkbox" value="checkbox" name="allowmouseover"
            onChange={() => {
              const { allowDrawOnMouseOver } = this.state;
              this.setState({ allowDrawOnMouseOver: !allowDrawOnMouseOver })
            }} />
          <label for="allowmouseover">Draw on MouseOver</label>
        </div>
        <br />
        <div>
          <GenerateScript commits={commits} github={github} repo={repo} />
        </div>
        <footer>
            <h3>Current maxCommits: {maxCommits}</h3>
            <h3>Max commits allowed: 10</h3>
        </footer>

      </div>
    );
  }
}

export default App;