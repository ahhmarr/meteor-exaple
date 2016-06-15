import React from 'react';
import {deleteRounds} from '../../../imports/api/rounds/methods.js';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';

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
export const RoundList = ({rounds}) => (
	rounds.length > 0 ?
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>name</th>
					<th>max turn</th>
					<th>interval</th>
					<th>created at</th>
					<th>action</th>
				</tr>
			</thead>
			<tbody>
			{rounds.map((round)=>(
				
				<tr>
					<td></td>
					<td key={round._id}>
						{round.name} 
					</td>
					<td>
						{round.max_turn}
					</td>
					<td>{round.interval}</td>
					<td>
						{moment(round.created_at).format('D-M-Y')}
					</td>
					<td>
						<button className="btn btn-danger" onClick={removeRound.bind(this,round._id)}>
							<i className="fa fa-trash"></i> delete 
						</button>
					</td>
				</tr>
			))}
			</tbody>
		</table> : 
		<div className="warning">No Rounds</div>
);