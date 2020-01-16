import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { props } = this;
		return (
			<div className='row d-flex text-secondary mt-2 ml-1'>
				<span className='col-xs-6 col-sm-6 col-md-6 p-2 text-dark'>{`${props.label}:`}</span>
				<span className='col-xs-6 col-sm-6 col-md-6 p-2 values'>
					{props.value}
				</span>
			</div>
		);
	}
}

Info.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
};

Info.defaultProps = {
	value: null,
};

export default Info;
