import React from 'react';
import PropTypes from 'prop-types';
import roomPlaceholder from '../../assets/images/room-placeholder.png';

export default function Room({ data }) {
	const { image, name, description, type, cost } = data;
	return (
		<div className='card' data-testid='hotels'>
			<div className='embed-responsive embed-responsive-16by9'>
				<img
					className='card-img-top img-fluid embed-responsive-item'
					src={image || roomPlaceholder}
					alt='hotel'
				/>
			</div>
			<div className='card-body'>
				<h5 className='card-title mr-3'>{name}</h5>
				<p className='card-text text-secondary mb-1'>{type}</p>
				<p className='card-text mb-1'>{description}</p>
				<p className='card-text text-info mb-1'>{`$${cost}/night`}</p>
			</div>
		</div>
	);
}

Room.propTypes = {
	data: PropTypes.objectOf(PropTypes.any),
};

Room.defaultProps = {
	data: null,
};
