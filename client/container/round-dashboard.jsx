import React from 'react';
import {composeWithTracker} from 'react-komposer';
import RoundDashboard from '../components/round/dashboard.jsx';
import { RunningRound } from '../../imports/api/rounds/runningRound.js';
import { Rounds } from '../../imports/api/rounds/rounds.js';
import { CurrentRounds } from '../../imports/api/rounds/currentRound.js';
import { UserTurnSchedule } from '../../imports/api/rounds/userTurnSchedule.js';
import {browserHistory} from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

const compose=(params,onData)=>{
	const subs=Meteor.subscribe('rounds.running');
	const rSub=Meteor.subscribe('rounds');
	const cSub=Meteor.subscribe('rounds.current');
	const uSub=Meteor.subscribe('rounds.usx');
	if(subs.ready() && rSub.ready() && cSub.ready() && uSub.ready()){
		
		const runningRound=RunningRound.findOne();
		if(!runningRound){
			browserHistory.push('/dashboard');
			Bert.alert('round finished','info');
		}
		const round=Rounds.findOne({_id:runningRound.round_id});
		const currentRound=CurrentRounds.findOne({'round._id':runningRound.round_id});
		const userRoundDetails=RunningRound.findOne({
			'users.id' : Meteor.userId()
		});
		const turnInterval=(UserTurnSchedule.findOne());
		onData(null,{runningRound,round,currentRound,userRoundDetails,turnInterval});
	}
};
export default composeWithTracker(compose)(RoundDashboard);