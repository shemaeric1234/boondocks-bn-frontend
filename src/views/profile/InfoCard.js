import React from 'react';
import PropTypes from 'prop-types';

const InfoCard = ({ number, icon, label }) => {
	return (
		<div className='card border-secondary info'>
			<div className='card-body'>
				<div className='info-card text-center align-middle'>
					<i className={`fa ${icon} fa-4x`} aria-hidden='true' />
					<div className='info-text'>
						<span className='h5'>{number}</span>
						<div>{label}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

InfoCard.propTypes = {
	number: PropTypes.number.isRequired,
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

export default InfoCard;
