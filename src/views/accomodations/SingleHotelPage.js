import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hotel from '../../components/accomodations/Hotel';
// eslint-disable-next-line max-len
import { getHotel } from '../../store/actions/accomodations/getAccomodationActions';
import Room from '../../components/accomodations/Room';

// eslint-disable-next-line no-shadow
export const SingleHotelPage = ({ getHotel, match, data, loading, status }) => {
	useEffect(() => {
		getHotel(match.params.id);
	}, []);
	if (!loading && status === 'success') {
		return (
			<div className='mt-7 container' data-testid='single-hotel'>
				<div className='mb-5'>
					<Hotel data={data} />
				</div>
				<h2 className='text-dark'>Rooms</h2>
				<div className='ml-2 card-deck'>
					{data.rooms.map(room => {
							return <Room key={room.id} data={room} />;
					})}
				</div>
			</div>
		);
	}
	return <></>;
};

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	status: state.singleHotelState.status,
	data: state.singleHotelState.data,
});

SingleHotelPage.propTypes = {
	getHotel: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	status: PropTypes.string,
	data: PropTypes.objectOf(PropTypes.any),
	match: PropTypes.objectOf(PropTypes.any).isRequired,
};

SingleHotelPage.defaultProps = {
	loading: null,
	status: null,
	data: null,
};

export default connect(mapStateToProps, { getHotel })(SingleHotelPage);
