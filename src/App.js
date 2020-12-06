import React from "react";
import { config } from "dotenv";
import YearSelector from "./components/YearSelector";
import UsernameInput from "./components/UsernameInput";
import RepositoryInput from "./components/RepositoryInput";
import "./App.css";
import CommitsBoard from "./components/CommitsBoard";
import GenerateScript from "./components/GenerateScript";
import Navigation from "./components/Navigation";
import Taskbar from "./components/Taskbar";
import ReactDOM, { findDomNode, unmountComponentAtNode } from "react-dom";

const maximizedStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  margin: "0",
};

const normalStyle = {
  position: "static",
  height: "auto",
  width: "80%",
  margin:"auto"
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStyle: normalStyle,
      toggle: false,
      allowDrawOnMouseOver: false,
      isWrongInput: false,
      github: "",
      year: "2020",
      repo: "",
      isValidGithub: false,
      isValidYear: false,
      isValidRepo: false,
      commits: {},
      minCommits: 0,
      maxCommits: 0,
      maxFreq: 0,

      colorValues: {
        commits0: "#EBEDF0",
        commits1: "#9BE9A8",
        commits2: "#40C462",
        commits3: "#30A14E",
        commits4: "#216E39",
      },
    };
  }

  componentDidMount() {}

  getColorGroup = (commitsCount) => {
    const { maxCommits, colorValues } = this.state;
    const percent = !commitsCount ? 0 : (commitsCount / maxCommits) * 100;
    let color;
    if (percent === 0) color = colorValues.commits0;
    else if (percent < 25) color = colorValues.commits1;
    else if (percent < 50) color = colorValues.commits2;
    else if (percent < 75) color = colorValues.commits3;
    else color = colorValues.commits4;
    return color;
  };

  handleClick = (e) => {
    const eventType = e.type;
    e.preventDefault();
    const { id } = e.target;
    const { commits } = this.state;
    let { maxCommits, maxFreq } = this.state;
    if (commits[id]) {
      if (commits[id].count === 10 && eventType !== "contextmenu") return;
      if (eventType === "contextmenu" && commits[id].count > 0) {
        commits[id].count--;
      } else commits[id].count++;
    } else {
      commits[id] = {};
      eventType === "contextmenu"
        ? (commits[id].count = 0)
        : (commits[id].count = 1);
    }
    commits[id].color = this.getColorGroup(commits[id].count);

    if (commits[id].count > maxCommits) {
      maxCommits = commits[id].count;
      this.setState({
        maxCommits,
      });
      this.rerenderColors();
    }
    this.setState({
      commits,
    });
  };

  rerenderColors = () => {
    const { commits } = this.state;
    for (let key in commits) {
      commits[key].color = this.getColorGroup(commits[key].count);
    }
    this.setState(commits);
  };

  changeState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  maximize = () => {
    const { toggle } = this.state;
    toggle
      ? this.setState({ currentStyle: normalStyle, toggle: !this.state.toggle })
      : this.setState({
          currentStyle: maximizedStyle,
          toggle: !this.state.toggle,
        });
  };

  close = () => {
    document.querySelector(".window").style.display = "none";
  };
  render() {
    const {
      github,
      year,
      repo,
      commits,
      maxCommits,
      inputCompleted,
      allowDrawOnMouseOver,
      currentStyle,
    } = this.state;
    return (
      <div className="App">
        <Navigation />
        <div className="window" style={currentStyle}>
          <div className="title-bar">
            <div className="title-bar-text">
              {" "}
              Turn your GitHub into an Artboard{" "}
            </div>{" "}
            <div class="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize" onClick={this.maximize}></button>
              <button aria-label="Close" onClick={this.close}></button>
            </div>
          </div>
          <div className="window-body">
            <div className="inputs" disabled>
              <UsernameInput github={github} changeState={this.changeState} />{" "}
              <YearSelector year={year} changeState={this.changeState} />{" "}
              <RepositoryInput repo={repo} changeState={this.changeState} />{" "}
            </div>{" "}
            <div className="commits-board">
              <CommitsBoard
                handleClick={this.handleClick}
                commits={commits}
                year={year}
                allowDrawOnMouseOver={allowDrawOnMouseOver}
              />{" "}
              <div>
                {/* <input
                  type="checkbox"
                  value="checkbox"
                  name="allowmouseover"
                  onChange={() => {
                    const { allowDrawOnMouseOver } = this.state;
                    this.setState({
                      allowDrawOnMouseOver: !allowDrawOnMouseOver,
                    });
                  }}
                />{" "} */}
                {/* <label for="allowmouseover"> Draw on MouseOver </label>{" "} */}
              </div>{" "}
              <div>
                <GenerateScript commits={commits} github={github} repo={repo} />{" "}
              </div>{" "}
              <footer className='pre'>
                  Microsoft&#10094;R&#10095; Windows DOS &#10094;C&#10095;
                  Copyright Microsoft Corp 1990-2001.
                  <br />
                  C:&#92;WINDOWS&#92;SYSTEM32> You can build a command line
                  easily with a window and pre tag
              </footer>
            </div>{" "}
          </div>

          <br />
        </div>
        <Taskbar />
      </div>
    );
  }
}

export default App;
