import React from 'react';
import PropTypes from 'prop-types';

export default function LayoutForms({
	children,
	title,
	info,
	onSubmit,
	classNames,
	SocialLogin,
}) {
	return (
		<section data-test='form-layout' className='row justify-content-center'>
			<section className='col-sm-8 col-md-4 w-100' id='container'>
				<h3 className=''>{title}</h3>
				<div className='mt-5'>
					<p>{info}</p>
				</div>
				{SocialLogin}
				<form
					className={`form-container ${classNames}`}
					onSubmit={onSubmit}
					noValidate
				>
					{children}
				</form>
			</section>
		</section>
	);
}

LayoutForms.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	title: PropTypes.string.isRequired,
	info: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	classNames: PropTypes.string,
	SocialLogin: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

LayoutForms.defaultProps = {
	info: '',
	classNames: '',
	SocialLogin: null,
};
