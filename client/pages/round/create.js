import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import {Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import {insertRounds} from '../../../imports/api/rounds/methods.js';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export const RoundIndex =React.createClass({
	componentDidMount() {
	    create(this);
	},
	submit : function(e)
	{
		e.preventDefault();
	},
	render : function()
	{
		return (
			<div>
				<h2 className="text-center">Create Round</h2>
				<form ref="create" onSubmit={this.submit} className="form-horizontal">
					<div className="form-group">
						<label for="roundName" className="col-xs-4 control-label">Round Name</label>
						<div className="col-xs-6">
							<input type="text" ref="roundName" name="roundName" id="roundName" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label for="duration" className="col-xs-4 control-label">Duration (in Hrs.)</label>
						<div className="col-xs-6">
							<input type="text" ref="duration" name="duration" id="maxTurn" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label for="maxTurn" className="col-xs-4 control-label">max allowed turn</label>
						<div className="col-xs-6">
							<input type="text" ref="maxTurn" name="maxTurn" id="maxTurn" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label for="interval" className="col-xs-4 control-label">interval</label>
						<div className="col-xs-6">
							<input type="text" ref="interval" name="interval" id="interval" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label for="turnInterval" className="col-xs-4 control-label">turn awarded in interval</label>
						<div className="col-xs-6">
							<input type="text" ref="turnInterval" name="turnInterval" id="maxTurn" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<div className="col-xs-offset-4 col-xs-6">
							<button type="submit" className="btn btn-block btn-info">
								create
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
});

var create=(option)=>{
	validate(option);
};
var validate=(component)=>{
	$(component.refs.create).validate({
		rules : {
			roundName : {
				required : true
			},
			duration : {
				required : true,
				number : true
			},
			maxTurn : {
				required : true,
				number : true
			},
			turnInterval : {
				required : true,
				number : true
			},
			interval : {
				required : true,
				number : true
			}
		},
		messages : {
			roundName : {
				required : "round name is required"
			},
			duration : {
				required : "duration is required"
			},
			maxTurn : {
				required : "max turn is required",
			},
			turnInterval : {
				required : "interval is required",
			},
			interval : {
				required : "interval is required",
			}
		},
		submitHandler () { createRound(component) }

	})
}
const createRound =(th)=>{
	let data = {
		name : th.refs.roundName.value,
		maxTurn : Number(th.refs.maxTurn.value),
		duration : Number(th.refs.duration.value),
		turnInterval : Number(th.refs.turnInterval.value),
		interval : Number(th.refs.interval.value)
	};
	console.log('submitted with');
	console.log(data);
	insertRounds.call(data,(error)=>{
		if(error){
			Bert.alert(error.reason || error,'danger');
		}else{
			browserHistory.pushState(null,'/round/index');
			Bert.alert('Created Successfully','success');

		}
	})
}
export default RoundIndex;