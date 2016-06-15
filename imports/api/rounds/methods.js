import { Rounds } from './rounds';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {Meteor} from 'meteor/meteor';

export const deleteRounds=new ValidatedMethod({
	name : 'rounds.delete',
	validate : new SimpleSchema({
		id : {type:String}
	}).validator(),
	run(round){
		Rounds.remove(round.id);
	}
});
export const insertRounds=new ValidatedMethod({
	name : 'rounds.store',
	validate : new SimpleSchema({
		name : {type:String},
		maxTurn : {type:Number},
		turnInterval : {type:Number}
	}).validator(),
	run(round){
		let save=Rounds.insert({
			name : round.name,
			max_turn : round.maxTurn,
			interval : round.turnInterval,
			created_at : new Date(),
			updated_at : new Date()
		});		
	}

});