/// <reference path="./types.d.ts" />

import React from "react";
import {TransitionSpring,Spring,utils as RMutils} from "react-motion";

const {reorderKeys} = RMutils;

const update = React.addons;

let Demo = React.createClass({
  getInitialState() {
    return {
      // Apparently Object.keys return keys in insertion order (except for 1,2,3).
      letters: {
        "#A": true,
        "#N": true,
        "#T": true,
      },
    };
  },

  componentDidMount() {
    window.addEventListener("keyup",this.handleKeyup)

  },

  handleKeyup(e) {
    const {keyCode} = e;
    if(!isAlphaNumeric(keyCode)) {
      return;
    }

    const letter = `#${String.fromCharCode(e.keyCode)}`;
    const {letters} = this.state;


    const hasLetter = letters[letter];

    console.log(letter);

    let newLetters = {...letters};

    if(hasLetter) {
      delete newLetters[letter]
    } else {
      newLetters[letter] = true;
    }

    newLetters = reorderKeys(newLetters,keys => keys.sort());

    this.setState({letters: newLetters});
  },

  toggle(letter) {
    const selected = this.state.letters[letter];

    this.setState({
      letters: {
        ...this.state.letters,
        [letter]: !selected,
      },
    });
  },

  // TransitionSpring Methods

  getEndValue() {
    let values = {};

    Object.keys(this.state.letters).forEach(key => {
      values[key] = {
        width: {val: 50},
        scale: {val: 1},
        margin: {val: 5},
      }
    });

    console.log(values);

    return values;
  },

  willEnter(key) {
    return {
      width: {val: 0},
      margin: {val: 0},
      scale: {val: 0},
    }
  },

  willLeave(key) {
    return {
      width: {val: 0},
      margin: {val: 0},
      scale: {val: 0},
    }
  },

  render() {
    const {letters} = this.state;

    return (
      <TransitionSpring
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {values =>
          <div className="letters">
            {Object.keys(values).map(letter => {
              const {scale,width,margin} = values[letter];
              const widthValue = Math.ceil(width.val-0.5);
              const marginValue = Math.ceil(margin.val-0.5);

              let styles = {
                transform: `scale(${scale.val})`,
                height: widthValue,
                width: widthValue,
                margin: marginValue,
                borderRadius: widthValue,
              };

              return (
                <span
                  key={letter}
                  className="letter"
                  style={styles}
                  onClick={this.toggle.bind(this,letter)}>
                  {letter.substring(1)}
                </span>
              )
            })}
          </div>
        }
      </TransitionSpring>
    );
  }
});

function isAlphaNumeric(keyCode) {
  return (48 <= keyCode && keyCode <= 57) || (65 <= keyCode && keyCode <= 90);
}

const app = (
  <div className="container">
    <Demo/>
    <h3 className="help">press any key</h3>
  </div>
);

React.render(app, document.querySelector('#content'));