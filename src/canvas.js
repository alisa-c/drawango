import React, { Component } from 'react';
import { isBrowser } from 'react-device-detect';

class Canvas extends Component {
  constructor() {
    super();
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
  }

  isPainting = false;
  strokeStyle;
  line = [];
  prevPos = { pageX: 0, pageY: 0 };
  // currentPlayer = "";

  onTouchStart({ nativeEvent }) {
    nativeEvent.preventDefault();
    const touch = nativeEvent.changedTouches[0];
    const { pageX, pageY } = touch;
    this.isPainting = true;
    this.prevPos = { pageX, pageY };
  }

  onTouchMove({ nativeEvent }) {
    nativeEvent.preventDefault();
    //this is for color
    this.props.gameData.players.forEach(player => {
      if (player.name === this.props.gameData.currentPlayer) {
        this.strokeStyle = player.color;
      }
    });
    if (this.isPainting) {
      const touch = nativeEvent.changedTouches[0];
      const { pageX, pageY } = touch;
      const offSetData = { pageX, pageY };
      const positionData = {  start: { ...this.prevPos},
                              stop: { ...offSetData},
                            };
      this.line = this.line.concat(positionData);
      this.paint(this.prevPos, offSetData, this.strokeStyle);
      this.props.sendPaintData(this.line);
    }
  }

  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { pageX, pageY } = currPos;
    const { pageX: x, pageY: y } = prevPos;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(pageX, pageY);
    this.ctx.stroke();
    this.prevPos = { pageX, pageY };
  }

  componentDidMount() {
    // if (this.currentPlayer !== this.props.currentPlayer)
    //this is for color
    this.props.gameData.players.forEach(player => {
      if (player.name === this.props.gameData.currentPlayer) {
        this.strokeStyle = player.color;
      }
    });
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.addEventListener("touchmove", function(event) {
    event.preventDefault();});
    this.ctx = this.canvas.getContext('2d');
    if (isBrowser) {
      this.ctx.scale(2.1, 1.4);
    }
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    this.line = this.props.gameData.line;
    this.props.gameData.line.forEach((position) => {
      this.paint(position.start, position.stop, this.strokeStyle);
    });
  }

  componentDidUpdate() {
    // and again here so i tried to make a function but kept telling me gameData is undefined
    // find way to factor this
    this.props.gameData.players.forEach(player => {
      if (player.name === this.props.gameData.currentPlayer) {
        this.strokeStyle = player.color;
      }
    });
    if (isBrowser) {
      this.props.gameData.line.forEach((position) => {
        this.paint(position.start, position.stop, this.strokeStyle);
      });
    }
  }

  render() {
    return (
        <canvas
          ref={(ref) => (this.canvas = ref)}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.endPaintEvent}
          onTouchMove={this.onTouchMove}/>

    );
  }
}
export default Canvas;