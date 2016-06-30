import { composeWithTracker } from 'react-komposer';
import { CurrentRounds } from '../../imports/api/rounds/currentRound';
import { RoundCurrent } from '../components/round/round-current';
import { loading } from '../components/loading';
import React from 'react';

import { Meteor } from 'meteor/meteor';

const composer = (params,onData)=>{
	const subs=Meteor.subscribe('rounds.current');
	if(subs.ready()){
		const current=CurrentRounds.find().fetch();
		onData(null,{current});
	}
};

export default composeWithTracker(composer)(RoundCurrent);