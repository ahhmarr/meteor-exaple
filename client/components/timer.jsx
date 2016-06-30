import React  from 'react';
import Time from './time.jsx';

const Timer = React.createClass({
	propTypes: {
	    seconds : React.PropTypes.number,
	    callback : React.PropTypes.func
	},
	componentDidMount() {
	      setInterval(()=>{
	      	let s=this.state.seconds-1;
	      	if(this.state.seconds===0){

	      		s=this.state.initialSeconds;
	      		//call callback function if exists
	      		if(this.props.callback){
	      			this.props.callback();
	      		}
	      	}
			this.setState({
				seconds : s
			});
	      },1000);
	},
	getInitialState() {
	    return {
	        seconds : this.props.seconds ,
	        initialSeconds : this.props.seconds
	    };
	},
	render(){
		return (
			<div>
				{this.state.seconds>0 ? 
				<Time time={this.state.seconds} />
				 :
				 <span></span>
				}
			</div>
		);
	}
});
export default Timer;