import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const CurrentRounds=new Mongo.Collection('CurrentRounds');

CurrentRounds.schema=new SimpleSchema({
	round : {
		type : Object,
		label : 'round',
		blackbox : true
	},
	created_at : {
		type : Date,
		optional : true
	},
	updated_at : {
		type : Date,
		optional : true
	}
});
CurrentRounds.attachSchema(CurrentRounds.schema);
