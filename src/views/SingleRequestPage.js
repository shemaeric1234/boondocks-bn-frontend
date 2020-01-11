import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import singleRequest from '../store/actions/requests/singleRequestActions';
import SingleRequest from '../components/request/SingleRequest';
import CommentRequest from '../components/request/CommentRequest';

function SingleRequestPage(props) {
	const { loading, status, data, match } = props;
	useEffect(() => {
		props.singleRequest(match.params.id);
	}, []);

	if (!loading && status === 'success') {
		const request = data.data;
		return (
			<div className='container request'>
				<div className='card'>
					<div className='row-flex'>
						<div className='column'>
							<SingleRequest request={request} />
						</div>
						<div className='column-1 p-5'>
							<CommentRequest comment={request.comments} />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return <h6>Please wait ...</h6>;
}

SingleRequestPage.propTypes = {
	data: PropTypes.objectOf(PropTypes.any),
	status: PropTypes.string,
	loading: PropTypes.bool,
	singleRequest: PropTypes.func.isRequired,
	match: PropTypes.objectOf(PropTypes.any).isRequired,
};

SingleRequestPage.defaultProps = {
	data: null,
	status: '',
	loading: null,
};

export const mapStateToProps = state => ({
	data: state.singleRequestState.data,
	loading: state.loadingState.loading,
	status: state.singleRequestState.status,
});

export default connect(mapStateToProps, {
	singleRequest,
})(SingleRequestPage);
