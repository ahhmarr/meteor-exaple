import { Rounds } from './rounds';
import { CurrentRounds } from './currentRound';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import moment from 'moment';

export const deleteRounds=new ValidatedMethod({
	name : 'rounds.delete',
	validate : new SimpleSchema({
		id : {type:String}
	}).validator(),
	run(round){
		Rounds.remove(round.id);
	}
});
export const insertRounds=new ValidatedMethod({
	name : 'rounds.store',
	validate : new SimpleSchema({
		name : {type:String},
		duration : {type:Number},
		maxTurn : {type:Number},
		turnInterval : {type:Number}
	}).validator(),
	run(round){
		let save=Rounds.insert({
			name : round.name,
			duration : round.duration,
			max_turn : round.maxTurn,
			interval : round.turnInterval,
			created_at : new Date(),
			updated_at : new Date()
		});		
	}

});
export const StartRound=new ValidatedMethod({
	name : 'round.start',
	validate (args){
		check(args,{
			_id : String
		});
		if(!Roles.userIsInRole(Meteor.userId(),'admin')){
			throw new Meteor.Error(500,'Access Denied');
		}
	},
	run(round){
		
		//start a round
		startActualRound(Rounds.findOne({_id:round._id}));
		stopActualRound();
		
	}
});
function startActualRound(round){
	round.end_at=new Date(getRoundEndTime(round));
	CurrentRounds.insert({round});
}
function stopActualRound(){
	setTimeout(()=>{
		console.log('Round has been closed');
	},5000);
}
const getRoundEndTime=(round)=>{
	let {created_at,duration}=round;
	return moment(round.created_at)
			.add(round.duration,'hours')
			.toISOString();
}

