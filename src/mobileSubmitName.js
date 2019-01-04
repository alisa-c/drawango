import React, { Component } from 'react';
import MobileDefault from './mobileDefault';
import SelfieCamera from './mobileSelfie';

class MobileSubmitName extends Component {
	constructor() {
    super()
		this.state = { errors: ""}
  }

	handleSubmit = (event) => {
		event.preventDefault();
		const nameInput = event.target.elements.name;
    const name = nameInput.value.replace(/^\s+|\s+$/gm,'').toLowerCase();;
		const playerNames = this.props.gameData.players.map(player => (
      player.name.replace(/^\s+|\s+$/gm,'').toLowerCase()
    ))
		if (!playerNames.includes(name)){
			this.props.addPlayerName(nameInput.value);
    } else {
      this.setState({ errors: "Opps... this name has already been taken" });
    }
	};

	render() {

		if (this.props.gameData.mainPlayer){
			if (this.props.gameData.avatar) {
			return (
				<div>
					<MobileDefault />
				</div>
			);
			} else {
				return(
					<div>
						<SelfieCamera />
					</div>
				)
			}
		}

		return (
			<div id="mobile-name-submit-container">
				<form className="form-container" onSubmit={this.handleSubmit}>
					<label className="mobile-submit-name">
						<p className="mobile-enter-name-title">Enter you name below!</p>
						<input className="mobile-form-name-text" type="text" name="name" />
					</label>
					<input className="mobile-form-name-submit" type="submit" value="Get me in this game!" />
				</form>
				<p>{this.state.errors}</p>
			</div>
		);
	}
}

export default MobileSubmitName;
