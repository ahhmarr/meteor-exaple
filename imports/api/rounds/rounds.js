import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Rounds=new Mongo.Collection('Rounds');

Rounds.schema=new SimpleSchema({
	name : {
		type : String,
		label : 'round name'
	},
	max_turn:{
		type : Number,
		label : 'maximum turns allowed'
	},
	interval : {
		type  : Number,
		label : 'interval at which turns will be allotted'
	},
	duration : {
		type : Number,
		label : 'duration in hours',
		optional : true
	},
	created_at : {
		type : Date
	},
	updated_at : {
		type : Date
	}
});
Rounds.attachSchema(Rounds.schema);
