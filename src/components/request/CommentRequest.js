import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import commentRequest from '../../store/actions/commentActions';

class RequestComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
		};
	}

	handleFieldChange(event) {
		const { value } = event.target;
		this.setState({
			comment: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { comment } = this.state;
		const data = { comment };

		const { props } = this;
		props.commentRequest(data, props.requestId);
	}

	render() {
		const { comment } = this.state;
		return (
			<div>
				<h3>Comments</h3>
				<div className='text'>
					<div className='d-flex'>
						<span></span>
					</div>
					<div />
				</div>
				<div>
					<form>
						<textarea
							placeholder='Enter your comment here'
							value={comment}
							onChange={event => this.handleFieldChange(event)}
						/>
						<button
							onClick={event => this.handleSubmit(event)}
							type='submit'
							className='btn btn-primary float-right'
						>
							Add comment
						</button>
					</form>
				</div>
			</div>
		);
	}
}

RequestComment.propTypes = {
	commentRequest: propTypes.func.isRequired,
};

export const mapStateToProps = state => ({
	error: state.signupState.error,
	status: state.signupState.status,
});

const mapDispatchToProps = {
	commentRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestComment);
