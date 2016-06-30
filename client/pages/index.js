import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
const role=()=>{
	return Meteor.userId();
}
const Index = React.createClass({

	render(){
		return (
			<div>
				
				some normal text
			</div>		
		);
	}
})


export default Index;