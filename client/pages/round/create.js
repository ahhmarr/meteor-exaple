import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import {Meteor} from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import {insertRounds} from '../../../imports/api/rounds/methods.js';

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
						<label for="maxTurn" className="col-xs-4 control-label">max allowed turn</label>
						<div className="col-xs-6">
							<input type="text" ref="maxTurn" name="maxTurn" id="maxTurn" className="form-control"/>
						</div>
					</div>
					<div className="form-group">
						<label for="turnInterval" className="col-xs-4 control-label">interval</label>
						<div className="col-xs-6">
							<input type="text" ref="turnInterval" name="turnInterval" id="turnInterval" className="form-control"/>
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
			maxTurn : {
				required : true,
				number : true
			},
			turnInterval : {
				required : true,
				number : true
			}
		},
		messages : {
			roundName : {
				required : "round name is required"
			},
			maxTurn : {
				required : "max turn is required",
			},
			turnInterval : {
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
		turnInterval : Number(th.refs.turnInterval.value)
	};
	console.log('submitted with');
	console.log(data);
	insertRounds.call(data,(error)=>{
		if(error){
			Bert.alert(error.reason || error,'danger');
		}else{
			Bert.alert('Deleted Successfully','success');
		}
	})
}
export default RoundIndex;