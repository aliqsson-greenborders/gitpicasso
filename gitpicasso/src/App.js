import React from 'react'
import { config } from 'dotenv'
import YearSelector from './components/YearSelector'
import UsernameInput from './components/UsernameInput'
import RepositoryInput from './components/RepositoryInput'
import './App.css';
import CommitsBoard from './components/CommitsBoard'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isWrongInput: false,
      github: '',
      year: '',
      repo: '',
      isValidGithub: false,
      isValidYear: false,
      isValidRepo: false,
    }
  }

  changeState = (key, value) => {
    this.setState({[key]: value})
  }

  componentDidMount() {
    config(); //configuring .env

  }

  handleChange = (event) => {
    this.setState({age:event.target.value})
  };

  render() {
    const {github, year, repo} = this.state;
    return (
      <div className="App">

        <div className="inputs">
          <UsernameInput github={github} changeState={this.changeState}/>
          <YearSelector year={year} changeState={this.changeState}/>
          <RepositoryInput repo={repo} changeState={this.changeState}/>
        </div>

        <div>
          <h1>GitHub: {github}</h1>
          <h1>Year: {year}</h1>
          <h1>Repo: {repo}</h1>
          <CommitsBoard year={year}/>
        </div>
      </div>
    );
  }
}

export default App;

/*
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.age}
          onChange={this.handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        */
