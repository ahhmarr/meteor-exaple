import { Meteor } from 'meteor/meteor';
import {Rounds} from '../rounds';
Meteor.publish('rounds',()=>Rounds.find());