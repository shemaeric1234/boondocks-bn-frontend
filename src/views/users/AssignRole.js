import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '../../components/templates/Button';
import SelectInput from '../../components/templates/SelectInput';

function AssignRole({
	handleCancel,
	handleChangeRole,
	user,
	handleSelectRole,
	loading,
}) {
	const roles = [
		{ id: 1, name: 'Super Administrator', value: 'super_administrator' },
		{ id: 2, name: 'Travel Administrator', value: 'travel_administrator' },
		{ id: 3, name: 'Travel Team Member', value: 'travel_team_member' },
		{ id: 4, name: 'Manager', value: 'manager' },
		{ id: 5, name: 'Requester', value: 'requester' },
		{ id: 6, name: 'Suppliers', value: 'suppliers' },
	];

	const role = user.role && user.role.split('_').join(' ');

	return (
		<div className='card assign-role' style={{ width: '30rem' }}>
			<div className='card-body'>
				<h3 className='card-title'>Change User Role</h3>
				<h5 className='card-subtitle mb-4 mt-4 text-dark'>
					Change role for
					<span className='text-capitalize'>
						{` ${user.firstName} ${user.lastName}`}
					</span>
				</h5>
				<p className='card-text h6 mb-4'>
					<span className='text-capitalize'>
						{`${user.firstName} ${user.lastName} `}
					</span>
					<span className='text-dark'>
						<span>is currently a</span>
						<span className='text-capitalize'>{` ${role}`}</span>
					</span>
				</p>
				<form
					method='POST'
					onSubmit={e => {
						e.preventDefault();
						handleChangeRole();
					}}
				>
					<SelectInput
						name='role'
						value={user.role}
						label='New Role'
						placeholder='Select User Role'
						option={roles}
						onChange={e => handleSelectRole(e.target.value)}
						classNames='form-control form-control-lg'
					/>
					<LoadingButton
						classNames='btn btn-success float-left w-50 p-2 btn-rounded-border mt-5'
						value='Assign New Role'
						buttonLoading={loading}
					/>

					<button
						type='button'
						className='btn btn-danger mt-5 float-right w-25 p-2 btn-rounded-border'
						onClick={() => handleCancel()}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
}

AssignRole.propTypes = {
	handleCancel: PropTypes.func.isRequired,
	handleChangeRole: PropTypes.func.isRequired,
	user: PropTypes.instanceOf(Object).isRequired,
	handleSelectRole: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};
export default AssignRole;
