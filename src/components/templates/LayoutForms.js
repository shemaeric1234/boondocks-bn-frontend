import React from 'react';
import PropTypes from 'prop-types';
import FormInfo from './FormInfo';

const LayoutForms = ({ children, title, info, onSubmit, classNames }) => {
	return (
		<div
			data-test='form-layout'
			className='row mt-5 pt-5 justify-content-center'
		>
			<section className='col-sm-8 col-md-4 w-100' id='container'>
				<h3>{title}</h3>
				<div className='mt-5'>
					<FormInfo infoText={info} />
				</div>
				<form
					className={`form-container ${classNames}`}
					onSubmit={onSubmit}
					noValidate
				>
					{children}
				</form>
			</section>
		</div>
	);
};

LayoutForms.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	title: PropTypes.string.isRequired,
	info: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	classNames: PropTypes.string,
};

LayoutForms.defaultProps = {
	classNames: '',
	info: '',
};

export default LayoutForms;
