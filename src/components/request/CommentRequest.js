import React from 'react';

export default function CommentRequest() {
	return (
		<div className='column-1 p-5'>
			<h3>Comments</h3>
			<div className='text'>
				<div className='d-flex'>
					<span />
					<div className='d-flex flex-column'>
						<span>Savanna Miles</span>
						<span className='text-muted'>Oct 4, 2014 09:14pm</span>
					</div>
				</div>
				<div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
						commodo odio aenean sed adipiscing diam donec.
					</p>
				</div>
			</div>
			<div>
				<span />
				<form>
					<textarea placeholder='Enter your comment here' />
					<button type='submit' className='btn btn-primary float-right'>
						Add comment
					</button>
				</form>
			</div>
		</div>
	);
}
