import {Roles} from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {Meteor} from 'meteor/meteor';

export const AddRole=new ValidatedMethod({
	name : 'roles.add',
	validate : new SimpleSchema({
		userId : {type:String},
		role : {type : String}
	}).validator(),
	run(data){
		Roles.addUsersToRoles(data.userId,[data.role]);
		
	}
})
