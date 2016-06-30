import {Meteor} from 'meteor/meteor';
import Navigation from '../pages/navigation.js';
import  {composeWithTracker} from 'react-komposer';
import {Roles} from 'meteor/alanning:roles';
import {RunningRound} from '../../imports/api/rounds/runningRound.js';


const compose=(params,onData)=>{
	let subs=Meteor.subscribe('rounds.running');
	
	if(Meteor.user()){
		// console.log(Meteor.user());
		const loggedIn=true;
		const isAdmin=Roles.userIsInRole(Meteor.userId(),'admin');
		let isInRound=false;
		if(subs.ready()){
			const run=RunningRound.findOne({
				'users.id' : Meteor.userId()
			});
			if(run){
				isInRound=true;
			}
		}
		let data={loggedIn,isAdmin,isInRound}
		console.log(data);
		
		onData(null,data);
	}else{
		const loggedIn=false;
		onData(null,{loggedIn});
	}
}

export default composeWithTracker(compose,()=>(<div>....</div>))(Navigation);