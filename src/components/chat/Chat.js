// import React, { Component } from 'react';
// import useChat from './UseChat';

// // eslint-disable-next-line react/prefer-stateless-function
// export class Chat extends Component {
// 	render() {
//     useChat();
// 		return (
// 			<div className='mt-7'>
// 				<h1>hi</h1>
// 			</div>
// 		);
// 	}
// }

import React, { useEffect } from 'react';
import useChat from './UseChat';

function Chat() {
	const { messages, sendMessage, getPriorMessages } = useChat();
	console.log(messages);
	useEffect(() => {
		getPriorMessages();
	}, []);
	return (
		<div className='mt-7'>
			{/* {messages &&
				messages.map(message => (
					<div key={message.id}>
						<span>
							message:
							{message.message}
						</span>
					</div>
        ))} */}
        
			{/* <button
				onClick={() => sendMessage({ message: 'hello from the client side' })}
				type='button'
			>
				send message
			</button> */}
			<h1>Hello</h1>
		</div>
	);
}

export default Chat;
