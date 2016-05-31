import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

const login =function(th)
{
	var user={
		username : th.refs.username.value,
		password : th.refs.password.value
	};
	const {location} =th.props;

	Meteor.loginWithPassword(user.username,user.password,(error)=>{
		if(error){
			Bert.alert(error.reason,'danger');
		}else{
			if(location.state && location.state.nextPathName){
				browserHistory.push(location.state.nextPathName);
			}else{
				browserHistory.push('/signup')
			}
			Bert.alert('Welcome','success');
		}
	});
};
const handleLogin=function(th)
{
	validate(th);
};
const validate=function(th)
{
	$(th.refs.loginForm).validate({
		rules : {
			username : {
				required : true
			},
			password : {
				required :true,
				minlength : 6
			}
		},
		messages : {
			username : {
				required : 'please enter username'
			},
			password : {
				required : 'please enter password',
				minlength : 'should be at least 6 characters'
			}
		},
		submitHandler : function()
		{
			login(th);
		}
	});
}
const Login =React.createClass({
	componentDidMount :function()
	{
		handleLogin(this);
	},
	loginForm : function(e)
	{
		e.preventDefault();
	},
	render : function()
	{
		return (
			<form className="form-horizontal" ref="loginForm">
				<h2 className="text-center">Login</h2>
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
						<div className="col-xs-offset-3 col-xs-4">
							<button type="submit" className="btn-block btn btn-primary">
								login
							</button>
						</div>
					</div>
			</form>
		)
	}
});


export default Login;