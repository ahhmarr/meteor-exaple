import React from 'react';
import {Meteor} from 'meteor/meteor';

export const Navigation = React.createClass({
	menuItems : function()
	{
		let items;
		if(Meteor.userId()){
			items= (
				<span>
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
		} else{
			items =(
				<span>
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/signup">Sign Up</a>
				</li>
				
				</span>	
			)
		}
		return items;
		
	},
	render : function()
	{
		return (
		<nav className="navigation">
			<ul>
				{this.menuItems()}
			</ul>
		</nav>
		);
	}
}) 