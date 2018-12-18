import React, {Component} from 'react';
import Votes from './mobileVotes';

class MobileVotesScreen extends Component {

  render() {

    const players = [];
    this.props.gameData.players.forEach(player => { 
      if (this.props.gameData.playerGuess[player.name]) {
        players.push(player);
      }
    });
    const guesses = players.map(player => (
      <Votes key={player.name} guess={this.props.gameData.playerGuess[player.name]}/>
      ));
    
    return (
      <div>
        {guesses}
      </div>
    );
  }
}
export default MobileVotesScreen;