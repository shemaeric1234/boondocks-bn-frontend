import React, { useRef, useEffect, useState } from 'react';
import useChat from './UseChat';
import { formatToTime } from '../../lib/time';

function Chat() {
	const { messages, sendMessage, getPriorMessages } = useChat();
	const messagesEndRef = useRef(null);
	const [newMessage, setMessage] = useState('');
	const { userId } = JSON.parse(localStorage.bn_user_data);
	useEffect(() => {
		getPriorMessages();
		window.scrollTo(0, document.querySelector('#chat').scrollHeight);
	}, []);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};
	const handleChange = event => {
		const { value } = event.target;
		setMessage(value);
	};
	const submitMessage = event => {
		event.preventDefault();
		if (event.target.checkValidity()) {
			console.log(newMessage);
			sendMessage({ message: newMessage });
		}
	};
	useEffect(scrollToBottom, [messages]);
	return (
		<div className='mt-6 mb-5 container bg-white'>
			<main>
				<ul id='chat'>
					{messages &&
						messages.map(message => {
							if (message.userId === userId) {
								return (
									<li key={message.id} className='me'>
										<div className='box'>
											<span className='status blue' />
										</div>
										<div className='message'>
											<h2>me:</h2>
											<div>{message.message}</div>
											<small>{`sent ${formatToTime(message.timestamp)}`}</small>
										</div>
									</li>
								);
							}
							return (
								<li key={message.id} className='you'>
									<div className='box'>
										<span className='status green' />
									</div>
									<div className='message'>
										<h2>{`${message.username}:`}</h2>
										<div>{message.message}</div>
										<small>{`sent ${formatToTime(message.timestamp)}`}</small>
									</div>
								</li>
							);
						})}
					<div ref={messagesEndRef} />
				</ul>
				<div className='send-box'>
					<form onSubmit={event => submitMessage(event)} noValidate>
						<textarea
							onChange={event => handleChange(event)}
							placeholder='Type your message'
							required
						/>
						<button
							type='submit'
							data-toggle='tooltip'
							value={newMessage}
							data-placement='top'
							title='Press to send message'
							data-delay='0'
						>
							<i className='fa fa-paper-plane' aria-hidden='true' />
						</button>
					</form>
				</div>
			</main>

			{/* <button
				onClick={() => sendMessage({ message: 'hello from the client side' })}
				type='button'
			>
				send message
			</button> */}
		</div>
	);
}

export default Chat;
