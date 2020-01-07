import React from 'react';

function Footer() {
	return (
		<footer className='fixed-bottom' data-testid='footer'>
			<div className='row mt-2 ml-4'>
				<div className='float-sm-left'>
					<p className='text-dark'>
						Copyright &copy; Barefoot Nomad. All right reserved
					</p>
				</div>
				<div className='text-right text-success socials'>
					<i className='fab fa-facebook-square' />
					<i className='fab fa-instagram' />
					<i className='fab fa-twitter' />
				</div>
			</div>
		</footer>
	);
}

export default Footer;
