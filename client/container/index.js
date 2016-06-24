import React from 'react';
import {Meteor} from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Index from '../pages/index.js';
import {Roles} from 'meteor/alanning:roles';

const composer = (params,onData)=>{
	if(Meteor.user()){
		onData(null,{
			user : Meteor.user()
		});
	}
	else{
		onData(null,{
			user : false
		});	
	}

};

export default composeWithTracker(composer)(Index);
