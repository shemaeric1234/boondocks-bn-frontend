import React, { Component } from 'react';
import cx from 'classnames';
import Collapse from '@kunukn/react-collapse';

class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
		};
	}

	toggle() {
		const collapse = 'isOpen';

		this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
	}

	render() {
		const { children } = this.props;
		const { isOpen } = this.state;
		return (
			<div className='accordion mt-7'>
				<button
					type='button'
					className={cx('accordion__toggle', {
						'accordion__toggle--active': isOpen,
					})}
					onClick={() => this.toggle()}
				>
					<span className='accordion__toggle-text'>Personal Information</span>
					<div className='rotate90'>
						<svg
							className={cx('icon', { 'icon--expanded': isOpen })}
							viewBox='6 0 12 24'
						>
							<polygon points='8 0 6 1.8 14.4 12 6 22.2 8 24 18 12' />
						</svg>
					</div>
				</button>
				<Collapse
					isOpen={isOpen}
					transition='height 800ms cubic-bezier(0.4, 0, 0.2, 1)'
					className={`accordion__collapse accordion__collapse--gradient ${
						isOpen ? 'accordion__collapse--active' : ''
					}`}
				>
					<div className='accordion__content'>
						{children}
						{/* <button
							type='button'
							onClick={() => this.toggle(1)}
							className='accordion__button'
						>
							close
						</button> */}
					</div>
				</Collapse>
			</div>
		);
	}
}

export default Accordion;
