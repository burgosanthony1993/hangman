import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { v4 as uuidv4 } from "uuid";
import { ENGLISH_WORDS } from "./words.js"

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    // maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  /*This is a Public Class Fields Syntax it not the contstructor 
  (see line 26) and does not need to be rebinded all the time
  */
 /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess = (evt) => { 
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }
 
  //A function that randomly grabs a word from list and then implements it as the answer
  getRandomWord (list) {
    const randomWord = Math.floor(Math.random() * list.length)
    return list[randomWord]
  }

  constructor(props) {
    super(props);
    const RandomString = this.getRandomWord(ENGLISH_WORDS);
    const maxWrong = RandomString.length;
    console.log(maxWrong)
    console.log(RandomString)
    this.state = { nWrong: 0,
       guessed: new Set(), 
       answer: RandomString,
        maxWrong: maxWrong
      };
   // this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={uuidv4()} //this adds a unique key to an array of letters (so each letter)
        id={uuidv4()}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  //The render is in a ternary Operator
  //i.e. (condition? true : false)
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} out of ${this.state.maxWrong} Gueses`}/>
        {this.state.nWrong < this.state.maxWrong?
        <div>                
        <p >The number of wrong guesses are: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p></div> :
        <h2>You Lose. The correct answer was {this.state.answer}</h2>
      }
      </div>
    );
  }
}



export default Hangman;
