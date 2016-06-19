import React  from 'react';
import moment from 'moment';
import Timer from '../../components/timer.jsx';

const TimerIndex=React.createClass({
	callback(){
		console.log('times up!!');
	},
	render(){
		return (
			<div>
				<Timer seconds={1000} callback={this.callback} />
			</div>
		);
	}
})

export default TimerIndex;