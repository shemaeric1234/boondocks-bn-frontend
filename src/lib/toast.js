import { toast } from 'react-toastify';
const Toast = (type, message) => {
	switch (type) {
		case 'success':
			return toast.success(message);
		case 'error':
			return toast.error(message);
		case 'info':
			return toast.info(message);
		default:
			return toast.error('Please pass a type on your toast');
	}
};

export default Toast;
