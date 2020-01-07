import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoginPage from './views/LoginPage';
import Signup from './views/Signup';
import NotFound from './views/NotFoundPage';
import HomePage from './views/HomePage';
import Footer from './components/templates/Footer';
import store from './store';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import ResetPasswordPage from './views/ResetPasswordPage';
import Loader from './components/templates/Loader';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<div data-testid='app'>
					<Loader />
					<Switch>
						<Route path='/' exact component={HomePage} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/login' exact component={LoginPage} />
						<Route
							path='/auth/forgot-password'
							component={ForgotPasswordPage}
						/>
						<Route path='/auth/reset-password' component={ResetPasswordPage} />
						<Route component={NotFound} />
					</Switch>
					<ToastContainer />
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}
