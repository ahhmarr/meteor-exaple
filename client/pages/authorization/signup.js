import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import {Accounts} from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

import { Bert } from 'meteor/themeteorchef:bert';

const Signup=React.createClass({
	componentDidMount() {
	    handleSignup(this)
	},
	submit : function(e)
	{
		e.preventDefault();
	},
	render : function(){
		return (
	<form onSubmit={this.submit} ref="signup" className="form-horizontal">
		<h2 className="text-center">Sign Up</h2>
		<div className="form-group">
			<label for="username" className="col-xs-3 control-label">username</label>
			<div className="col-xs-4">
				<input type="text" name="username" ref="username" id="username" className="form-control"/>
			</div>
		</div>
		<div className="form-group">
			<label for="password" className="col-xs-3 control-label">password</label>
			<div className="col-xs-4">
				<input type="password" name="password" ref="password" id="password" className="form-control"/>
			</div>
		</div>
		<div className="form-group">
			<label for="cpassword" className="col-xs-3 control-label">confirm password</label>
			<div className="col-xs-4">
				<input type="password" name="cpassword" ref="cpassword" id="cpassword" className="form-control"/>
			</div>
		</div>
		<div className="form-group">
			<div className="col-xs-offset-3 col-xs-4">
				<button type="submit" className="btn-block btn btn-success">
					Sign UP
				</button>
			</div>
		</div>
	</form>
);
	}
});
const validate=function(component)
{
	$(component.refs.signup).validate({
		rules : {
			username : {
				required : true
			},
			password : {
				required : true,
				minlength : 6
			},
			cpassword : {
				equalTo : '#password'
			}
		},
		messages : {
			username : {
				required : 'enter a username'
			},
			password : {
				required : 'enter password',
				minlength : 'at least 6 characters'
			},
			cpassword : {
				equalTo : 'password does not match'
			}
		},
		submitHandler() { signUp(component); }
	});
};
const signUp=function(component)
{
	console.log('called signup after validation');	
	const user={
		username : component.refs.username.value,
		password : component.refs.password.value
	};
	Accounts.createUser(user,function(error)
	{
		if(error){
			Bert.alert(error.reason,'danger');
		}else{
			browserHistory.push('/');
			Bert.alert("Welcome "+user.username,'success');
		}
	})
};
handleSignup=function(option){
	validate(option);
}
export default Signup;