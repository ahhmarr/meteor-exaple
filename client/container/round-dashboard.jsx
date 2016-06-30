import React from 'react';
import {composeWithTracker} from 'react-komposer';
import RoundDashboard from '../components/round/dashboard.jsx';
import { RunningRound } from '../../imports/api/rounds/runningRound.js';
import { Rounds } from '../../imports/api/rounds/rounds.js';
import { CurrentRounds } from '../../imports/api/rounds/currentRound.js';

const compose=(params,onData)=>{
	const subs=Meteor.subscribe('rounds.running');
	const rSub=Meteor.subscribe('rounds');
	const cSub=Meteor.subscribe('rounds.current');
	if(subs.ready() && rSub.ready() && cSub.ready()){

		const runningRound=RunningRound.findOne();
		const round=Rounds.findOne({_id:runningRound.round_id});
		const currentRound=CurrentRounds.findOne({'round._id':runningRound.round_id});
		const userRoundDetails=RunningRound.findOne({
			'users.id' : Meteor.userId()
		});
		console.log(currentRound);
		console.log(runningRound);
		onData(null,{runningRound,round,currentRound,userRoundDetails});
	}
};
export default composeWithTracker(compose)(RoundDashboard);