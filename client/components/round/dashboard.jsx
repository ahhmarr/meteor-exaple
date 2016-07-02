import React from 'react';
import DateTime from '../dateTime.jsx';
import Timer from '../timer.jsx';
import moment from 'moment';

const RoundDashboard=React.createClass({
	getDiff(f,t){

		let from=moment(),to=moment(t);
		// console.log(`${f} ,${t}`);
		let diff=to.diff(from,'seconds');
		// console.log(diff);
		return parseInt(diff);
	},
	getTurn(){
		if(this.props.userRoundDetails && this.props.userRoundDetails.users.length){
			return (this.props.userRoundDetails.users[0].turn);
		}
	},
	render(){
		return (
			<div>
				<div>
					Turns {this.getTurn()}
					<DateTime time={this.props.turnInterval.next_schedule} />
				</div>
				<div>round dashboard {this.props.round.name}</div>
				<div>started at <DateTime time={this.props.currentRound.round.created_at} /> </div>
				<div>closing at <DateTime time={this.props.currentRound.round.end_at} /></div>
				<div>time remaining  <Timer seconds={this.getDiff(this.props.currentRound.round.created_at,this.props.currentRound.round.end_at)} /></div>
			</div>
		);
	}
});
export default RoundDashboard;