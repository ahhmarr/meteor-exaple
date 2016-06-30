import React from 'react';
import moment from 'moment';

const DateTime=({time})=>(
	<span>
		{moment(time).format('DD-MM-Y h:m:s A')}
	</span>
)
export default DateTime;