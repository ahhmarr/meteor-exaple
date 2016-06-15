import { composeWithTracker } from 'react-komposer';
import { Rounds } from '../../imports/api/rounds/rounds';
import { RoundList } from '../components/round/round-list';
import { loading } from '../components/loading';

import { Meteor } from 'meteor/meteor';

const composer = (params,onData)=>{
	const subs=Meteor.subscribe('rounds');
	if(subs.ready()){
		const rounds=Rounds.find().fetch();
		onData(null,{rounds});
	}
};

export default composeWithTracker(composer)(RoundList);