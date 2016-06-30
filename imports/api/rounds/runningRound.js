import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const RunningRound=new Mongo.Collection('RunningRound');

RunningRound.schema=new SimpleSchema({
	round_id : {
		type : String,
		label : 'round id',
	},
	users : {
		type : [Object],
		label : 'users',
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
RunningRound.attachSchema(RunningRound.schema);
