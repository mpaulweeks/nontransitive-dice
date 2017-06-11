import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autotab from 'react-input-auto-tab';

import Manager from './Manager';
import './Manager.css';

class DieSide extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = this.props;
  }
  handleChange(response) {
    this.Manager.setDieSide(this.state.id(), response);
  }
  render() {
    const {
      display
    } = this.state
    return (
      <Autotab
        type="text"
        name={display.id()}
        maxLength={1}
        hint={display.default()} //convert to str
        // style={{ height: 24, paddingLeft: 10 }}
        value={display.value}
        onChange={this.handleChange}
        autoFocus
      />
    )
  }
}

const Die = function(props){
  const {
    display,
  } = props
  return (
    <div className="row Card">
      {display.sides.map(function(dieSide, index) {
        return <DieSide key={index} display={dieSide} />
      })}
    </div>
  )
}

class MainView extends Component {
  constructor(){
    super();
    this.calculate = this.calculate.bind(this);
    const manager = Manager.new();
    this.state = {
      manager: manager,
      display: manager.getDisplay(),
    };
  }
  calculate(){
    this.setState({
      display: this.state.manager.getDisplay(),
    });
  }
  render() {
    const {
      display,
    } = this.state
    return (
      <div className="container Manager">
        <div className="Title">
          Dice Shit
        </div>
        {display.dice.map(function(die, index) {
          return <Die key={index} display={die} />
        })}
        <div onClick={this.calculate} className="btn btn-default Calculate">
          Calculate
        </div>
      </div>
    )
  }
}

const View = {};
View.initApp = function(){
  ReactDOM.render(
    <MainView />,
    document.getElementById('root')
  );
};

export default View;
