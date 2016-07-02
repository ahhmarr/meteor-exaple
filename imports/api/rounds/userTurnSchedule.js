import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserTurnSchedule=new Mongo.Collection('UserTurnSchedule');

UserTurnSchedule.schema=new SimpleSchema({
	round_id : {
		type : String,
		label : 'id of the round'
	},
	user_id:{
		type : String,
		label : 'user id'
	},
	next_schedule : {
		type  : Date,
		label : 'at what time the turn will be allotted next'
	},
	created_at : {
		type : Date,
		optional :true
	},
	updated_at : {
		type : Date,
		optional :true
	}
});
UserTurnSchedule.attachSchema(UserTurnSchedule.schema);
