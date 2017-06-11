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
    this.state.manager.setDieSide(this.state.display.id(), response);
  }
  render() {
    const {
      display
    } = this.state
    return (
      <Autotab
        type="text"
        autoFocus
        hint={display.default().toString()} //convert to str
        maxLength={1}
        name={display.id()}
        onChange={this.handleChange}
        style={{ height: 24, width: 16, marginLeft: 10, marginRight: 10 }}
        value={(display.getValue() || '').toString()}
      />
    )
  }
}

const Die = function(props){
  const {
    display,
    manager,
  } = props
  return (
    <div className="row Card">
      {display.getSides().map(function(dieSide) {
        return <DieSide key={dieSide.id()} manager={manager} display={dieSide} />
      })}
    </div>
  )
}

class MainView extends Component {
  constructor(){
    super();
    this.calculate = this.calculate.bind(this);
    const manager = Manager();
    window.Manager = manager;
    this.state = {
      manager: manager,
      display: manager.getDisplay(),
    };
  }
  calculate(){
    this.state.manager.calculate();
    this.setState({
      display: this.state.manager.getDisplay(),
    });
  }
  render() {
    const {
      display,
      manager,
    } = this.state
    return (
      <div className="container Manager">
        <div className="Title">
          Dice Shit
        </div>
        {display.dice.map(function(die) {
          return <Die key={die.id()} manager={manager} display={die} />
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
