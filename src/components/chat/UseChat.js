import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';
import Toast from '../../lib/toast';

const useChat = () => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();
	const token =
		// eslint-disable-next-line max-len
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlcXVlc3RlckB1c2VyLmNvbSIsIm5hbWUiOiJSZXF1ZXN0ZXIiLCJ1c2VySWQiOjIsInZlcmlmaWVkIjp0cnVlLCJyb2xlIjoicmVxdWVzdGVyIiwibGluZU1hbmFnZXJJZCI6MywiaWF0IjoxNTc5OTIxOTMwLCJleHAiOjE1ODAwMDgzMzB9.UqSxivTdTmibrE2wJ0NFGFaJ3ya-XUxGsIlLuFQplvo';
	useEffect(() => {
		socketRef.current = socketClient('http://localhost:3000', {
			query: { token },
		});
		socketRef.current.on('getting', ({ messages }) => {
			const formatMessages = messages.map(message => ({
				id: message.id,
				message: message.message,
				timestamp: message.createdAt,
				username: `${message.user.firstName} ${message.user.lastName}`,
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
