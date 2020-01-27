import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { notification } from '../store/actions/notificationAction';
import { formatToTime } from '../lib/time';

export const evenNotificationClass = idx => (idx % 2 === 1 ? ' bg-gray' : '');

class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { props } = this;
		props.notification();
	}

	render() {
		const { props } = this;
		const { status, data } = props;

		if (status === 'success') {
			const notifications = data.data;
			console.log(notifications);

			return (
				<div>
					<ul className='dropdown-menu notification'>
						<li className='notification-header'>
							<div className='row'>
								<div className='text-light col-lg-12 col-sm-12 col-12'>
									<span>{}</span>
									<a href='/' className='float-right text-light'>
										Mark all as read
									</a>
								</div>
							</div>
						</li>
						{notifications.map(el => (
							<li
								data-testid='notification'
								className={`notification-box${evenNotificationClass(el.id)}`}
								key={el.id}
							>
								<div className='row'>
									<div className='col-lg-12 col-sm-12 col-12'>
										<div>
											<strong className='text-primary'>{el.type}</strong>
											<p>{el.messages}</p>
										</div>
										<small className='text-warning'>
											{formatToTime(el.createdAt)}
										</small>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			);
		}
		return <div />;
	}
}

Notifications.propTypes = {
	data: propTypes.objectOf(propTypes.any),
	status: propTypes.string,
	notification: propTypes.func.isRequired,
};

Notifications.defaultProps = {
	data: null,
	status: '',
};

export const mapStateToProps = state => ({
	status: state.notificationState.status,
	data: state.notificationState.data,
});

const mapDispatchToProps = {
	notification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
