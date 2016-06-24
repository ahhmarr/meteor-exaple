import {Meteor} from 'meteor/meteor';
import Navigation from '../pages/navigation.js';
import  {composeWithTracker} from 'react-komposer';
import {Roles} from 'meteor/alanning:roles';

const compose=(params,onData)=>{
	if(Meteor.user()){
		console.log(Meteor.user());
		const loggedIn=true;
		const isAdmin=Roles.userIsInRole(Meteor.userId(),'admin');
		onData(null,{loggedIn,isAdmin});
	}else{
		const loggedIn=false;
		onData(null,{loggedIn});
	}
}

export default composeWithTracker(compose,()=>(<div>....</div>))(Navigation);