import React from 'react';

function Footer() {
	return (
		<footer data-testid='footer' className='d-flex justify-content-center'>
			<div className='row mt-2 ml-4'>
				<div className='float-sm-left'>
					<p className='text-dark'>
						Copyright &copy; Barefoot Nomad. All rights reserved.
					</p>
				</div>
				<div className='text-right text-success socials'>
					<i className='fa fa-facebook-square' />
					<i className='fa fa-instagram' />
					<i className='fa fa-twitter' />
				</div>
			</div>
		</footer>
	);
}

export default Footer;
