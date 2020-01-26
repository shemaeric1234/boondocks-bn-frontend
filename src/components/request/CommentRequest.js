import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingButton from '../templates/Button';
import {
	commentRequest,
	deleteCommentAction,
} from '../../store/actions/commentActions';
import { formatToTime } from '../../lib/time';
import StatusConfirmModal from '../../views/requests/StatusConfirmModal';

class RequestComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			deleteStatusVisibility: false,
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
		this.setState({
			comment: '',
		});
	}

	handlecancel() {
		this.setState({
			deleteStatusVisibility: false,
		});
	}

	handleDeletePopUp(commentId) {
		this.setState({
			deleteStatusVisibility: true,
			commentId,
		});
	}

	handleDelete() {
		const { props } = this;
		const { commentId } = this.state;
		props.deleteCommentAction(commentId, props.requestId);
		this.setState({
			deleteStatusVisibility: false,
		});
	}

	render() {
		const { comment, deleteStatusVisibility } = this.state;
		const { props } = this;
		const { loading } = props;
		return (
			<div className='commentContainer'>
				<h3>Comments</h3>
				<div className='text'>
					<div className='d-flex' />
					<div />
				</div>
				<div>
					<div>
						<span>
							{props.data.data.comments.map(el => {
								if (!el.isVisible) {
									return;
								}
								const isCurrentUser =
									el.userId === JSON.parse(localStorage.bn_user_data).userId;
								return (
									<div key={el.id}>
										<div
											className={`comment${isCurrentUser ? 'fromCurrent' : ''}`}
										>
											<div className='d-flex'>
												<div className='icon-comment'>
													{`${el.author.firstName.split('')[0]}${
														el.author.lastName.split('')[0]
													}`}
												</div>
												<div className='text'>
													<div className='d-flex flex-column name'>
														<small className='name'>
															{`${el.author.firstName} ${el.author.lastName}`}
														</small>
														<small className='text-secondary'>
															{formatToTime(el.updatedAt)}
														</small>
													</div>
													<div>
														<button
															type='button'
															className='close'
															aria-label='Close'
															data-testid='close'
															onClick={() => this.handleDeletePopUp(el.id)}
														>
															<span aria-hidden='true'>&times;</span>
														</button>
													</div>
													<p className='comment'>{el.comment}</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</span>
					</div>
				</div>
				<div>
					<form>
						<textarea
							placeholder='Enter your comment here'
							value={comment}
							onChange={event => this.handleFieldChange(event)}
						/>
						<div>
							<LoadingButton
								onClick={event => this.handleSubmit(event)}
								type='submit'
								value='Add comment'
								buttonLoading={loading}
								classNames='btn btn-primary float-center'
							/>
						</div>
					</form>
				</div>
				<StatusConfirmModal
					visibility={deleteStatusVisibility}
					title='Alert'
					prompt='Are you sure you want to delete this comment'
					confirmAction={() => this.handleDelete()}
					cancelAction={event => this.handlecancel(event)}
					btnLoadingState={loading}
				/>
			</div>
		);
	}
}

RequestComment.propTypes = {
	data: propTypes.objectOf(propTypes.any),
	commentRequest: propTypes.func.isRequired,
	deleteCommentAction: propTypes.func.isRequired,
	loading: propTypes.bool.isRequired,
};
RequestComment.defaultProps = {
	data: null,
};

export const mapStateToProps = state => ({
	error: state.commentState.error,
	status: state.singleRequestState.status,
	data: state.singleRequestState.data,
	loading: state.loadingState.loading,
});

const mapDispatchToProps = {
	commentRequest,
	deleteCommentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestComment);
