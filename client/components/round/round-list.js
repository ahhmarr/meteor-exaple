import React from 'react';
import { deleteRounds,StartRound } from '../../../imports/api/rounds/methods.js';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';

const startRound=(_id)=>{
	StartRound.call({_id},(error)=>{
		if(error){
			Bert.alert(error.reason || error,'danger');
		}
		else{
			Bert.alert('Round Started','info');
		}
	});
}
const removeRound=(id)=>{
	console.log('called me'+id);
	deleteRounds.call({id},(error)=>{
		if(error){
			Bert.alert(error,'danger');
		}
		else{
			Bert.alert('Deleted Successfully','success');
		}
	})
}
export const RoundList=React.createClass({
	render(){
		let sn=0;
		return (
			this.props.rounds.length > 0 ?
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>name</th>
					<th>Duration(Hrs.)</th>
					<th>max turn</th>
					<th>interval</th>
					<th>created at</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
			{this.props.rounds.map((round)=>(
				
				<tr key={round._id}>
					<td>{++sn}</td>
					<td key={round._id}>
						{round.name} 
					</td>
					<td>{round.duration}</td>
					<td>
						{round.max_turn}
					</td>
					<td>{round.interval}</td>
					<td>
						{moment(round.created_at).format('D-MM-Y')}
					</td>
					<td>
						<button className="btn btn-danger" onClick={removeRound.bind(this,round._id)}>
							<i className="fa fa-trash"></i> delete 
						</button>
						<button className="btn btn-info" onClick={startRound.bind(this,round._id)}>
							<i className="fa fa-play"></i> start
						</button>
					</td>
				</tr>
			))}
			</tbody>
		</table> : 
		<div className="warning">No Rounds</div>
		);
	}
})
