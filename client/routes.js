import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import App from './components/App.js';
import NotFound from './pages/notfound.js';
import Index from './pages/index.js';
import Login from './pages/authorization/login.js';
import Signup from './pages/authorization/signup.js';
import Dashboard from './pages/user/dashboard.js';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const checkAuth=function(nextState,replace)
{
	if(!Meteor.loggingIn() && !Meteor.userId()){
		replace({
			pathname : '/login',
			state : {nextPathName: nextState.location.pathname}
		});
	}
};
const skipIfLoggedIn=function(nextState,replace)
{
	if(Meteor.userId()){
		replace({
			pathname : '/dashboard'
		});
	}
}
const logout=function(nextState,replace)
{
	Meteor.logout();
	replace({
		pathname : '/login'
	});
}
Meteor.startup(function()
{
	return render(
		<Router history={browserHistory}>
			<Route path="/" component={App}>
        		<IndexRoute name="index" component={ Index } />
	        	<Route path="/login" name="auth.login" onClick={skipIfLoggedIn} component={Login} />
	        	<Route path="/logout" name="auth.logout" onEnter={logout} />
	        	<Route path="/signup" name="auth.signup" onEnter={skipIfLoggedIn} component={Signup} />
	        	<Route path="/dashboard" onEnter={checkAuth} name="dashboard" component={Dashboard} />
	        	<Route path="*" component={ NotFound } />
			</Route>
		</Router>,
		document.getElementById('app-root')
	);
});