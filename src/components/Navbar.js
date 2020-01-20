import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarNav from './NavbarNav';
import updateNavbar from '../store/actions/navbar/navbarActions';

class Navbar extends Component {
	componentDidMount() {
		const { props } = this;
		props.updateNavbar();
	}

	render() {
		const { notifications, isAuthenticated, navItems } = this.props;
		return (
			<div
				id='nav'
				className='navigation-wrap bg-light start-header start-style'
			>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<NavbarNav
								notifications={isAuthenticated ? notifications : []}
								isAuthenticated={isAuthenticated}
								navItems={navItems}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	navItems: state.navbarState.navItems,
	notifications: state.navbarState.notifications,
	isAuthenticated: state.authState.isAuthenticated,
});

export default connect(mapStateToProps, {
	updateNavbar,
})(Navbar);

Navbar.propTypes = {
	notifications: PropTypes.instanceOf(Array).isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	navItems: PropTypes.instanceOf(Array).isRequired,
	updateNavbar: PropTypes.func.isRequired,
};
