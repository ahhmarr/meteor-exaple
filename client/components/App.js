import React from 'react';
import {Navigation} from './../pages/navigation.js';

var App=React.createClass({
/*	propTypes : {
		children : React.PropTypes.element.isRequired
	},*/
	render : function()
	{
		return (
 			<div>
 				<Navigation/>
 				{this.props.children}
 			</div>
		);
	}	

});
export default App;