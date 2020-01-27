import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';
import Toast from '../../lib/toast';

const useChat = () => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();
	const token =
		// eslint-disable-next-line max-len
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyYXZlbEBhZG1pbmlzdHJhdG9yLmNvbSIsIm5hbWUiOiJ0cmF2ZWwiLCJ1c2VySWQiOjQsInZlcmlmaWVkIjp0cnVlLCJyb2xlIjoidHJhdmVsX2FkbWluaXN0cmF0b3IiLCJsaW5lTWFuYWdlcklkIjpudWxsLCJpYXQiOjE1ODAwNTkxNzQsImV4cCI6MTU4MDE0NTU3NH0.q6Zs4t5pQSyMpeADjajjYV7vIy-B9t5A1AXAJOl0_gM';
	useEffect(() => {
		socketRef.current = socketClient('http://localhost:3000', {
			query: { token },
		});
		socketRef.current.on('getting', ({ messages }) => {
			const formatMessages = messages.map(message => ({
				id: message.id,
				userId: message.userId,
				message: message.message,
				timestamp: message.createdAt,
				username: `${message.user.firstName}`,
			}));
			console.log('>>>>>>>>>>>>>>messo', formatMessages);
			setMessages([...formatMessages]);
		});
		socketRef.current.on('new_message', message => {
			setMessages(prevMessages => [...prevMessages, message]);
		});

		socketRef.current.on('authentication_error', error => {
			Toast('error', error);
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);

	const sendMessage = data => {
		socketRef.current.emit('new_message', data);
	};

	const getPriorMessages = () => {
		socketRef.current.emit('get_messages');
	};

	const typing = () => {
		socketRef.current.emit('typing');
	};

	return { messages, sendMessage, getPriorMessages, typing };
};

export default useChat;
