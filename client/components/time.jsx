import React  from 'react';

const Time = React.createClass({
	convertSecondToHMS(second){
		let hms=new Date(second*1000)
					.toISOString()
					.substr(11,8);
		if(hms.substr(0,2)==='00'){
			hms=hms.substr(3);
		}
		return hms;
	},
	propTypes: {
	    time : React.PropTypes.number
	},
	render(){
		return (
			<div>
				{this.convertSecondToHMS(this.props.time)}
			</div>
		);
	}
});

export default Time;
