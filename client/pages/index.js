import React from 'react';
import {Meteor} from 'meteor/meteor';

const Index = () => (
	<div>
		{Meteor.userId()}
		Hello world
	</div>
);

export default Index;