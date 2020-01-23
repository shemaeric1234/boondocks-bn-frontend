import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import LoadingButton from '../../components/templates/Button';

const StatusConfirmModal = ({
	request,
	visibility,
	title,
	prompt,
	confirmAction,
	cancelAction,
	btnLoadingState,
}) => {
	return (
		<Modal visible={visibility}>
			<div className='card assign-role b'>
				<div className='card-body'>
					<h3 className='card-title mb-4 text-center'>{title}</h3>
					<p className='card-text h6 mt-4'>{prompt}</p>
					<LoadingButton
						classNames='btn btn-success float-left w-50 btn-rounded-border mt-5'
						value='Confirm'
						onClick={() => confirmAction(request)}
						buttonLoading={btnLoadingState}
					/>

					<button
						type='button'
						className='btn btn-danger mt-5 float-right btn-rounded-border'
						onClick={() => cancelAction()}
					>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

StatusConfirmModal.propTypes = {
	request: PropTypes.object,
	visibility: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	prompt: PropTypes.string.isRequired,
	confirmAction: PropTypes.func.isRequired,
	cancelAction: PropTypes.func.isRequired,
	btnLoadingState: PropTypes.bool.isRequired,
};

StatusConfirmModal.defaultProps = {
	request: {},
};

export default StatusConfirmModal;
