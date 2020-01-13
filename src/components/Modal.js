import React from 'react';

function Modal(props) {
	const { visible, children } = props;
	return (
		<div className='popup-view-container'>
			<div className={`popup view ${visible && 'visible'}`}>
				<div className='popup-content'>{children}</div>
			</div>
		</div>
	);
}

export default Modal;
