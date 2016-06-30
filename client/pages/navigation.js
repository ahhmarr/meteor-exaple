import React from 'react';
import {Meteor} from 'meteor/meteor';

export const Navigation = React.createClass({
	adminRoutes(){
		return (
			<span>Admin Routes
			<li>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a href="/round/index">round</a>
				<ul>
					<li>
						<a href="/round/create">
							create</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="/logout">Logout</a>
			</li>
			</span>
			)
	},
	userRoutes(){
		return (
			<span>User Routes
			<li>
				<a href="/dashboard">Dashboard</a>
			</li>
			{	
				!this.props.isInRound?
					<span>
						<li>
							<a href="/round/current">current round</a>
						</li>
					</span>
					:
					<span>
						<li>
							<a href="/round/dashboard">Round Dashbaord</a>
						</li>
						<li>
							<a href="/defence">defence</a>
						</li>
						<li>
							<a href="/hospital">hospital</a>
						</li>
					</span>
				
			}
			<li>
				<a href="/logout">Logout</a>
			</li>
			</span>
			)
	},
	loggedIn : function()
	{
		if(this.props.isAdmin){
			return this.adminRoutes();
		}else{
			return this.userRoutes();
		}
		
	},
	notLoggedIn : function()
	{
		return (
			<span>
			<li>
				<a href="/login">Login</a>
			</li>
			<li>
				<a href="/signup">Sign Up</a>
			</li>
			
			</span>	
		);
	},
	render : function()
	{
		return (
		<nav className="navigation">
			<ul>
				{this.props.loggedIn ===true? this.loggedIn() : this.notLoggedIn()}
			</ul>
		</nav>
		);
	}
}) 
export default Navigation;