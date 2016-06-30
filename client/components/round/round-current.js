import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';
import { JoinRound } from '../../../imports/api/rounds/methods.js';
import DateTime from '../dateTime.jsx';
import {browserHistory} from 'react-router';

export const RoundCurrent=React.createClass({
	joinRound(currentRound){
		JoinRound.call({currentRound},(error)=>{
			if(error){
				Bert.alert(error.reason || error.message || error,'danger');
				return;
			}else{
				// redirect to round page
				browserHistory.push('/round/dashboard');
				Bert.alert('Round Started','success');
			}
		});
	},
	render(){
		let sn=0;
		return (
			this.props.current.length ?
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>name</th>
					<th>started at</th>
					<th>round closing at</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
			{this.props.current.map((round)=>(
				
				<tr key={round._id}>
					<td>{++sn}</td>
					<td>{round.round.name}</td>
					<td>
						<DateTime time={round.round.created_at} />
					</td>
					<td>
						<DateTime time={round.round.end_at} />
					</td>
					<td>
						<button onClick={this.joinRound.bind(this,round.round)} className="btn btn-info">
							<i className="fa fa-play"></i>
							Join Round
						</button>
					</td>
				</tr>
			))}
			</tbody>
		</table> : 
		<div className="warning">No Active Rounds</div>
		);
	}
})
