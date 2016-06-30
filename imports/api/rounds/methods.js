import { Rounds } from './rounds';
import { CurrentRounds } from './currentRound';
import { RunningRound } from './runningRound';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import moment from 'moment';
import later from 'meteor-later';
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
		turnInterval : {type:Number},
		interval : {type:Number}
	}).validator(),
	run(round){
		let save=Rounds.insert({
			name : round.name,
			duration : round.duration,
			max_turn : round.maxTurn,
			interval_turn : round.turnInterval,
			interval : round.interval,
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
	round.created_at=new Date();
	round.updated_at=new Date();
	CurrentRounds.insert({round});
}
function stopActualRound(){
	setTimeout(()=>{
		console.log('Round has been closed');
	},5000);
}
const getRoundEndTime=(round)=>{
	let {created_at,duration}=round;
	return moment()
			.add(round.duration,'hours')
			.toISOString();
}

export const JoinRound=new ValidatedMethod({
	name : 'round.join',
	validate : (args)=>{
		check(args,Object);
		check(args.currentRound,Object);
		let exists=RunningRound.find({
			'users.id':Meteor.userId()
		}).fetch();

		if(exists.length){
			throw new Meteor.Error('Already Joined the Round');
		}
	},
	run(round){
		if(Meteor.isClient)
			return;
		console.log(round);
		let userObj=addingUserToRunningRound(round);
		registerUsersInterval(userObj,round.currentRound);
	}
});
function updateTurn(_id){
	let userID=Meteor.userId();
	RunningRound.update({
		round_id : _id,
		'users.user' : 'c'
	},{
		$set : {
			'users.$.user':'meteor'
		}
	});
	console.log('called update turn');
}
function addingUserToRunningRound(round)
{
	console.log('initiate joining the round');
	let {_id,interval,max_turn}=round.currentRound;
	let turn=max_turn;
	let userObj={
		id : Meteor.userId(),
		turn
	};
	let exists=RunningRound.findOne({
		round_id : _id
	});
	if(exists){
		console.log(`pushing user into existing document with round ${_id}`);

		RunningRound.update({
			round_id :_id
		},{
			$push : {
				'users' : userObj
			}
		});
	}
	else{
		console.log('inserting fresh entry ');
		RunningRound.insert({
			round_id : _id,
			users :[userObj]
		 });
	}
	return userObj;
}
function registerUsersInterval(user,round)
{
	console.log(round);
	let schedule=later.parse.text(`every ${round.interval} minutes`);
	let timer=later.setInterval(Meteor.bindEnvironment(function()
	{
		addTurn(user,round);
	}),schedule);
}

function addTurn(user,round)
{
	console.log('called callback ');
	let r=Rounds.findOne({
		_id : round._id
	});
	let max_turn=r.max_turn;
	console.log(`maximum turns allowed for this round ${max_turn}`);
	console.log(`round id ${r._id} user id ${user.id} `);
	RunningRound.update({
		round_id : r._id,
		'users.id':user.id,
		'users.turn' : {$lt:max_turn}
	},{
		$inc : {
			'users.$.turn' : r.interval_turn
		}
	});
}