import { Meteor } from 'meteor/meteor';
import {Rounds} from '../rounds';
import {CurrentRounds} from '../currentRound.js';
import {RunningRound} from '../runningRound.js';
import {UserTurnSchedule} from '../userTurnSchedule.js';
Meteor.publish('rounds',()=>Rounds.find());
Meteor.publish('rounds.current',()=>CurrentRounds.find());
Meteor.publish('rounds.running',()=>RunningRound.find());
Meteor.publish('rounds.usx',function(){
	return UserTurnSchedule.find({
		user_id : this.userId
	});
});