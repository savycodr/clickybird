import React, { Component } from "react";
import './App.css';
import GameImage from "./components/GameImage";
import "./styles/Header.css";

class App extends Component {

  state = {
    pictures: [
      {
        id: 1,
        url: "assets/img/adler-2386314_640.jpg",
        alt: "bird1",
        clicked: false
      },
      {
        id: 2,
        url: "assets/img/animal-1850868_640.jpg",
        alt: "bird2",
        clicked: false
      },
      {
        id: 3,
        url: "assets/img/bar-tailed-godwit-944883_640.jpg",
        alt: "bird3",
        clicked: false
      },
      {
        id: 4,
        url: "assets/img/blue-jay-3734030_640.jpg",
        alt: "bird4",
        clicked: false
      },
      {
        id: 5,
        url: "assets/img/duck-1884934_640.jpg",
        alt: "bird5",
        clicked: false
      },
      {
        id: 6,
        url: "assets/img/guacamaya-4132823_640.jpg",
        alt: "bird6",
        clicked: false
      },
      {
        id: 7,
        url: "assets/img/mallard-3524213_640.jpg",
        alt: "bird7",
        clicked: false
      },
      {
        id: 8,
        url: "assets/img/robin-4225979_640.jpg",
        alt: "bird8",
        clicked: false
      },
      {
        id: 9,
        url: "assets/img/spring-bird-2295434_640.jpg",
        alt: "bird9",
        clicked: false
      },
      {
        id: 10,
        url: "assets/img/swan-4208564_640.jpg",
        alt: "bird10",
        clicked: false
      },
      {
        id: 11,
        url: "assets/img/tit-4228129_640.jpg",
        alt: "bird11",
        clicked: false
      },
      {
        id: 12,
        url: "assets/img/tit-4230128_640.jpg",
        alt: "bird12",
        clicked: false
      }
    ],
    score: 0,
    highScore: 0
  };


  // handleClick changes the state of this image
  handleClick = id => {

    // HLS this doesn't work because we shuffle the location
    // How do we find the correct picture?
    // let pic = this.state.pictures[id - 1];

    let pic = this.state.pictures.find(o => o.id === id);

    pic.clicked ? this.resetGame() : this.goodPick(id);

    // shuffle location, Can we simply shuffle the array?
    // make a copy of the array
    let newPictures = this.state.pictures.slice();
    // shuffle the items in the array 
    let newPictures1 = this.shuffle(newPictures);
    console.log(newPictures1);

    // set state to the new pictures array with the modified value
    this.setState({ pictures: newPictures1 });
  };

  // This means we had a successful click
  goodPick = id => {

    // increase the score
    this.setState({ score: this.state.score + 1 });

    // make a copy of the array
    let newPictures = this.state.pictures.slice();
    let pic = newPictures.find(o => o.id === id);
    pic.clicked = true;

    // set state to the new pictures array with the modified value
    this.setState({ pictures: newPictures });

  }

  // Call this method when an image was clicked more than once
  resetGame() {
    console.log("You already clicked this image");

    // maybe set a new high score
    if (this.state.score > this.state.highScore)
    {
      this.setState({highScore: this.state.score});
    }
    
    // reset score to 0
    this.setState({ score: 0 });


    // reset all pictures.clicked to false
    // make a copy of the array
    let newPictures = this.state.pictures.slice();
    this.state.pictures.map(pic => (
      pic.clicked = false
    ));
    // modify the picture 
    // set state to the new pictures array with the modified value
    this.setState({ pictures: newPictures });

  };

  // Fisher-Yates (aka Knuth) Shuffle.
 shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element... Once element is picked the currentIndex is reduced and so is the range of randomIndex
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


  render() {
    return (
      <div className="App">

        <div className="fluid-container intro ">
          <div className="row">
            <div className="col-md-4 align-self-end">
              <h3>Click An Image To Begin</h3>
            </div>
            <div className="col-md-4 align-self-center">
              <h1>Clicky Bird</h1>
            </div>
            <div className="col-md-4 align-self-end">
              <h3>Score: {this.state.score} | Top Score: {this.state.highScore}</h3>
            </div>
          </div>
        </div>
        <div className="fluid-container directions">
          <h3>Click on an image to earn points, but don't click on any more than once!</h3>
        </div>

        <div className="fluid-container game">
          <GameImage images={this.state.pictures}
            handleClick={this.handleClick}
            shake={this.state.score}></GameImage>
        </div>

        <div className="fluid-container footer ">
        </div>

      </div>
    );
  }
}
export default App;
