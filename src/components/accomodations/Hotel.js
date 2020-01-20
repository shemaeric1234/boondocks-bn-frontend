import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import hotelPlaceholder from '../../assets/images/hotel-placeholder.jpeg';
import checkRole from '../../utils/checkRole';

export default function Hotel({ data }) {
	const [role, setRole] = useState(null);
	useEffect(() => {
		const Role = checkRole('suppliers') || checkRole('travel_administrator');
		setRole(Role);
	});
	const {
		image,
		id,
		name,
		// eslint-disable-next-line camelcase
		average_rating,
		description,
		likesCount,
		unLikesCount,
		location,
		street,
	} = data;
	return (
		<div className='card' data-testid='card-hotel'>
			<div className='embed-responsive embed-responsive-21by9'>
				<img
					className='card-img-top img-fluid embed-responsive-item'
					src={image || hotelPlaceholder}
					alt='hotel'
				/>
			</div>
			<div className='card-body'>
				<div className='d-flex'>
					<h5 className='card-title mr-3'>{name}</h5>
					<StarRatings
						rating={Number(average_rating)}
						starRatedColor='gold'
						numberOfStars={5}
						starDimension='1.2rem'
						starSpacing='.15rem'
						name='rating'
						className='float-right'
					/>
				</div>
				<p className='card-text mb-1'>{description}</p>
				<p className='card-text text-secondary mb-1'>
					{`  ${street} ${location.city}, ${location.country}`}
				</p>
				<div className='d-inline-block p-2 w-100'>
					<i className='fa fa-thumbs-o-up mr-2' aria-hidden='true'>
						<span className='m-2'>{likesCount}</span>
					</i>
					<i className='fa fa-thumbs-o-down' aria-hidden='true'>
						<span className='m-2'>{unLikesCount}</span>
					</i>
					{role ? (
						<Link
							to={`/hotel/${id}/room/create`}
							className='btn btn-primary btn-sm text-white float-right ml-2'
						>
							Add rooms
						</Link>
					) : (
						<div>
							<Link
								to={`/booking/${id}`}
								className='btn btn-primary book-now btn-sm text-white float-right ml-2'
							>
								Book Now
							</Link>
							<button
								type='button'
								className='btn btn-primary btn-sm text-white float-right'
							>
								Add Rating
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

Hotel.propTypes = {
	data: PropTypes.objectOf(PropTypes.any),
};

Hotel.defaultProps = {
	data: null,
};
